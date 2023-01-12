<?php

namespace App\Book\Infrastructure\Controller;

use App\Book\Infrastructure\Repository\BookRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class DeleteBookController extends AbstractController
{
    public function __construct(private readonly BookRepository $bookRepository)
    {
    }

    public function __invoke(Request $request): JsonResponse
    {
        $id = $request->get('id');

        $entity = $this->bookRepository->find($id);

        if(!$entity)
            throw new HttpException(404, 'Book not found');


        $this->bookRepository->remove($entity, true);

        return new JsonResponse(status: 204);
    }
}