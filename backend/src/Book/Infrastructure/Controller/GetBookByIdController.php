<?php

namespace App\Book\Infrastructure\Controller;

use App\Book\Infrastructure\Repository\BookRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;

class GetBookByIdController extends AbstractController
{

    public function __construct(private readonly BookRepository $bookRepository)
    {
    }

    public function __invoke(int $id): JsonResponse
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