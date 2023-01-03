<?php

namespace App\Book\Infrastructure\Controller;

use App\Book\Domain\Entity\Book;
use App\Book\Infrastructure\JsonSchemaValidator;
use App\Book\Infrastructure\Repository\BookRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class StoreBookController extends AbstractController
{
    public function __construct(
        private readonly BookRepository $bookRepository,
        private readonly JsonSchemaValidator $jsonSchemaValidator
    )
    {
    }

    public function __invoke(Request $request): JsonResponse
    {
        if($request->getContentTypeFormat()!=='json')
            throw new BadRequestException('Invalid request format', 400);

        $isValid = $this->jsonSchemaValidator->validate($request->getContent(), $this->requestJsonSchema());
        if(!$isValid)
            throw new BadRequestException('Invalid body format', 400);

        $body =  json_decode($request->getContent(), true);
        $book = new Book();
        $book->setPrice($body['price'])
             ->setAuthor($body['author'])
             ->setTitle($body['title'])
             ->setDescription($body['description']);

        $this->bookRepository->save($book, true);

        return new JsonResponse([
           'book stored'
        ]);
    }

    protected function requestJsonSchema(): array
    {
        return [
            'type' => 'object',
            'required' => ['title', 'author', 'price'],
            'properties' => [
                'title' => [
                    'type' => 'string',
                ],
                'author' => [
                    'type' => 'string',
                ],
                'price' => [
                    'type' => 'number',
                ],
                'description' => [
                    'type' => 'string'
                ]
            ],
        ];
    }
}