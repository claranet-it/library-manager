<?php

namespace App\Controller\Books;

use App\Entity\Book\Book;
use App\Repository\Book\BookRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class GetBooksController extends AbstractController
{

    public function __construct(private readonly BookRepository $bookRepository)
    {
    }

    #[Route('/books', name: 'getBooks', methods: ['GET'])]
    public function getBooks(): JsonResponse
    {
        $result = $this->bookRepository->findAll();
        $result = array_map(fn (Book $book): array => $book->toJSON(), $result);
        return new JsonResponse($result, 200);
    }

}