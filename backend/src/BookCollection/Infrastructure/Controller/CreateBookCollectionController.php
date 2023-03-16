<?php

namespace App\BookCollection\Infrastructure\Controller;

use App\Book\Infrastructure\JsonSchemaValidator;
use App\Book\Infrastructure\Repository\BookRepository;
use App\BookCollection\Application\DTO\BookCollectionDTO;
use App\BookCollection\Application\SaveBookCollection;
use App\BookCollection\Domain\Entity\BookCollection;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Uid\Uuid;

class CreateBookCollectionController extends AbstractController
{
    public function __construct(
        private readonly JsonSchemaValidator $jsonSchemaValidator,
        private readonly SaveBookCollection $createBookCollection,
        private readonly BookCollection $bookCollection,
        private readonly BookRepository $bookRepository
    ) {
    }

    public function __invoke(Request $request): JsonResponse
    {
        if ('json' !== $request->getContentTypeFormat()) {
            throw new HttpException(400, 'Invalid request format');
        }

        $isValid = $this->jsonSchemaValidator->validate($request->getContent(), $this->jsonSchemaValidator->requestBookCollectionJsonSchema());
        if (!$isValid) {
            throw new HttpException(Response::HTTP_BAD_REQUEST, 'Invalid body format');
        }

        $body = json_decode($request->getContent(), true);

        $collectionName = $body['name'];
        $collectionDescription = $body['description'];
        $booksId = $body['books'];

        $collectionBooks = array_map(function ($bookId) {
            $uuid = Uuid::fromString($bookId);
            $foundBook = $this->bookRepository->find($uuid);
            if (!$foundBook) {
                throw new HttpException(400, sprintf('Book with id "%s" not found', $bookId));
            }

            return $foundBook;
        }, $booksId);

        if (count($collectionBooks) < 2) {
            throw new HttpException(400, 'Collection must have two or more existing books');
        }

        $bookCollectionDTO = new BookCollectionDTO($collectionName, $collectionDescription, $collectionBooks);

        try {
            $bookCollection = $this->bookCollection->newBookCollectionFrom($bookCollectionDTO);
        } catch (\InvalidArgumentException $e) {
            return new JsonResponse(['error' => $e->getMessage()], $e->getCode());
        }

        $bookCollection = $this->createBookCollection->saveBookCollection($bookCollection);

        return new JsonResponse($bookCollection, status: 201);
    }
}
