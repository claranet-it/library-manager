<?php

namespace App\Book\Infrastructure\Controller;

use App\Book\Infrastructure\Repository\BookRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class GetBookByIdController extends AbstractController
{

    public function __construct(private readonly BookRepository $bookRepository)
    {
    }

    public function __invoke(int $id): JsonResponse
    {
        $result = $this->bookRepository->find($id);

        if(!$result)
            throw new HttpException(404, 'Book not found');


        return new JsonResponse($result, 200);
    }

}