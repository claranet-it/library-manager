<?php

namespace App\Controller\Books;

use App\Entity\Book\Book;
use App\Repository\Book\BookRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request as Request;
use Symfony\Component\Routing\Annotation\Route;

class GetBookByIdController extends AbstractController
{

    public function __construct(private readonly BookRepository $bookRepository)
    {
    }

    #[Route('/api/books/{id}', name: 'getBook', methods: ['GET'])]
    public function getBook(int $id): JsonResponse
    {
        $result = $this->bookRepository->find($id);
        $result = $result->toJSON();

        return new JsonResponse([
            $result,
        ], 200);
    }

}