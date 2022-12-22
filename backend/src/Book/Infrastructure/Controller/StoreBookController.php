<?php

namespace App\Book\Infrastructure\Controller;

use App\Book\Domain\Entity\Book;
use App\Book\Infrastructure\Repository\BookRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class StoreBookController extends AbstractController
{
    public function __construct(private readonly BookRepository $bookRepository)
    {
    }

    public function __invoke(Request $request): JsonResponse
    {
        if($request->getContentTypeFormat()!=='json')
            return new JsonResponse([
                'Request format invalid'
            ], 500);

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
}