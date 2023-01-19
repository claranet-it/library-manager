<?php

namespace App\Book\Infrastructure\Controller;

use App\Book\Application\StoreBook;
use App\Book\Infrastructure\JsonSchemaValidator;
use App\Book\Infrastructure\Repository\BookRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;

class UpdateBookController extends AbstractController
{
    public function __construct(
        private readonly BookRepository $bookRepository,
        private readonly JsonSchemaValidator $jsonSchemaValidator,
        private readonly StoreBook $storeBook
    ) {
    }

    public function __invoke(Request $request): JsonResponse
    {
        if ('json' !== $request->getContentTypeFormat()) {
            throw new HttpException(400, 'Invalid request format');
        }

        $isValid = $this->jsonSchemaValidator->validate($request->getContent(), $this->jsonSchemaValidator->requestBookJsonSchema());

        if (!$isValid) {
            throw new HttpException(400, 'Invalid body format');
        }

        $body = json_decode($request->getContent(), true);

        $id = $request->get('id');

        $book = $this->bookRepository->find($id);

        if (!$book) {
            throw new HttpException(404, 'Book not found');
        }

        $book = $this->storeBook->storeBook($body['price'], $body['author'], $body['title'], $body['description'], $book);

        return new JsonResponse($book, 200);
    }
}
