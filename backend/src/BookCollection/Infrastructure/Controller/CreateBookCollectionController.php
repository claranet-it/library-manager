<?php

namespace App\BookCollection\Infrastructure\Controller;

use App\Book\Infrastructure\Repository\BookRepository;
use App\BookCollection\Application\DTO\BookCollectionDTO;
use App\BookCollection\Application\FindBookCollection;
use App\BookCollection\Application\SaveBookCollection;
use App\BookCollection\Domain\Entity\BookCollection;
use App\BookCollection\Infrastructure\Validator\CollectionRequestValidator;
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
        private readonly CollectionRequestValidator $collectionRequestValidator,
        private readonly FindBookCollection $findBookCollection,
        private readonly SaveBookCollection $saveBookCollection,
        private readonly BookRepository $bookRepository,
        private readonly SerializerInterface $serializerInterface,
        private readonly ValidatorInterface $validatorInterface
    ) {
    }

    public function __invoke(Request $request): JsonResponse
    {
        $this->collectionRequestValidator->validate($request);

        $collectionDTO = $this->serializerInterface->deserialize($request->getContent(), BookCollectionDTO::class, 'json');
        $validationErrors = $this->validatorInterface->validate($collectionDTO);

        if (count($validationErrors) > 0) {
            throw new HttpException(400, 'Invalid body format');
        }

        $collectionBooks = array_map(function ($bookId) {
            $uuid = Uuid::fromString($bookId);
            $foundBook = $this->bookRepository->find($uuid);
            if (!$foundBook) {
                throw new HttpException(400, sprintf('Book with id "%s" not found', $bookId));
            }

            return $foundBook;
        }, $collectionDTO->getBooks());

        if (count($collectionBooks) < 2) {
            throw new HttpException(400, 'Collection must have two or more existing books');
        }

        $collectionDTO->setBooks($collectionBooks);

        try {
            $bookCollection = BookCollection::newBookCollectionFrom($collectionDTO);
        } catch (\Throwable $e) {
            return new JsonResponse(['error' => $e->getMessage()], $e->getCode());
        }
        $collectionExists = $this->findBookCollection->findCollection($bookCollection->getName());

        if ($collectionExists) {
            throw new HttpException(400, sprintf('A collection with name: "%s" already exists', $collectionExists->getName()));
        }
        $bookCollection = $this->saveBookCollection->saveCollection($bookCollection);

        return new JsonResponse($bookCollection, status: 201);
    }
}
