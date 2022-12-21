<?php

namespace App\Controller\Books;

use App\Entity\Book\Book;
use App\Repository\Book\BookRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class StoreBookController extends AbstractController
{
    public function __construct(private readonly BookRepository $bookRepository)
    {
    }

    #[Route('/api/books', name: 'storeBook', methods: ['POST'])]
    public function storeBook(Request $request): JsonResponse
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

        $this->bookRepository->save($book);

        return new JsonResponse([
           'book stored'
        ]);
    }
}