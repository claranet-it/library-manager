<?php

namespace App\BookCollection\Infrastructure\Controller;

use App\Book\Domain\Entity\Book;
use App\Book\Infrastructure\Repository\BookRepository;
use App\BookCollection\Application\DTO\BookCollectionDTO;
use App\BookCollection\Application\DTO\BookCollectionValidationError;
use App\BookCollection\Application\FindBookCollection;
use App\BookCollection\Application\SaveBookCollection;
use App\BookCollection\Domain\Entity\BookCollection;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class CreateBookCollectionController extends AbstractController
{
    public function __construct(
        private readonly FindBookCollection $findBookCollection,
        private readonly SaveBookCollection $saveBookCollection,
        private readonly BookRepository $bookRepository,
        private readonly SerializerInterface $serializerInterface,
        private readonly ValidatorInterface $validatorInterface
    ) {
    }

    public function __invoke(Request $request): JsonResponse
    {
        $collectionDTO = $this->serializerInterface->deserialize($request->getContent(), BookCollectionDTO::class, 'json');
        $bookCollectionValidationErrorsContent = $this->getBookCollectionValidationErrorsContent($collectionDTO);

        if (count($bookCollectionValidationErrorsContent) > 0) {
            $errorJson = json_encode($bookCollectionValidationErrorsContent);
            throw new HttpException(400, false !== $errorJson ? $errorJson : 'Invalid body format.');
        }

        $collectionDTO->setBooks($this->getExistingBooks($collectionDTO->getBooks()));

        try {
            $bookCollection = BookCollection::newBookCollectionFrom($collectionDTO);
        } catch (\Throwable $e) {
            return new JsonResponse(['error' => $e->getMessage()], $e->getCode());
        }
        $collectionName = $bookCollection->getName();
        $collectionExists = $this->findBookCollection->findCollection($collectionName);

        if ($collectionExists) {
            throw new HttpException(400, "A collection with name: $collectionName already exists");
        }
        $bookCollection = $this->saveBookCollection->saveCollection($bookCollection);

        return new JsonResponse($bookCollection, status: 201);
    }

    /** @return string[] */
    public function getBookCollectionValidationErrorsContent(BookCollectionDTO $collectionDTO): array
    {
        $validationErrors = $this->validatorInterface->validate($collectionDTO);
        $validationErrorsContent = [];

        foreach ($validationErrors as $error) {
            $bookCollectionValidationError = new BookCollectionValidationError(
                $collectionDTO,
                $error->getPropertyPath(),
                $error->getMessage()
            );
            $validationErrorsContent[] = $bookCollectionValidationError->getValidationErrorMessage();
        }

        return $validationErrorsContent;
    }

    /** @param string[] $bookIds*/
    /** @return Book[] */
    private function getExistingBooks(array $bookIds): array
    {
        $foundBooks = [];
        foreach ($bookIds as $bookId) {
            $foundBook = $this->bookRepository->find(Uuid::fromString($bookId));
            if (!$foundBook) {
                throw new HttpException(400, "Book with id: $bookId not found");
            }

            $foundBooks[] = $foundBook;
        }

        return $foundBooks;
    }
}
