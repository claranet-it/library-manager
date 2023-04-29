<?php

namespace App\Book\Infrastructure\Controller;

use App\Book\Infrastructure\Repository\iBookRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Uid\Uuid;

class DeleteBookController extends AbstractController
{
    public function __construct(private readonly iBookRepository $bookRepository)
    {
    }

    public function __invoke(Request $request): JsonResponse
    {
        $id = $request->get('id');

        $entity = $this->bookRepository->find(Uuid::fromString($id));

        if (!$entity) {
            throw $this->createNotFoundException('Book not found');
        }

        $this->bookRepository->remove($entity, true);

        return new JsonResponse(status: 204);
    }
}
