<?php

namespace App\Controller\Books;

use App\Repository\Book\BookRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
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

        if(!$result)
            return new JsonResponse([
                'Error: Id not found',
            ], 404);

        $result = $result->toJSON();

        return new JsonResponse([
            $result,
        ], 200);
    }

}