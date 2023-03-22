<?php

namespace App\Book\Infrastructure\Controller;

use App\Book\Infrastructure\Repository\BookRepository;
use App\Book\Infrastructure\Repository\iBookRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Uid\Uuid;

class GetBookByIdController extends AbstractController
{
    public function __construct(private readonly iBookRepository $bookRepository)
    {
    }

    public function __invoke(string $id): JsonResponse
    {
        $result = $this->bookRepository->find(Uuid::fromString($id));

        if (!$result) {
            throw new HttpException(404, 'Book not found');
        }

        return new JsonResponse($result, 200);
    }
}
