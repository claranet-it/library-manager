<?php

namespace App\Book\Infrastructure\Controller;

use App\Book\Application\DTO\BookDTO;
use App\Book\Application\StoreBook;
use App\Book\Domain\Entity\Book;
use App\Book\Infrastructure\JsonSchemaValidator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;

class StoreBookController extends AbstractController
{
    public function __construct(
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
            throw new HttpException(Response::HTTP_BAD_REQUEST, 'Invalid body format');
        }

        $body = json_decode($request->getContent(), true);

        $bookDto = (new BookDTO())->setTitle($body['title'])->setAuthor($body['author'])->setPrice($body['price'])->setDescription($body['description']);

        $book = $this->storeBook->storeBook(
            Book::newBookFrom($bookDto)
        );

        return new JsonResponse($book, status: 201);
    }
}
