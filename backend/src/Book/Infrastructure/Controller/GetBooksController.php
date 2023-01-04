<?php

namespace App\Book\Infrastructure\Controller;

use App\Book\Domain\Entity\Book;
use App\Book\Infrastructure\PaginationCapabilities;
use App\Book\Infrastructure\Repository\BookRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request as Request;

class GetBooksController extends AbstractController
{

    use PaginationCapabilities;

    public function __construct(private readonly BookRepository $bookRepository)
    {
    }

    public function __invoke(Request $request): JsonResponse
    {
        [$offset, $limit] = $this->getPageParamsFrom($request);

        $result = $this->bookRepository->findBy(array(), array(), $limit, $offset);
        $result = array_map(fn (Book $book): array => $book->toJSON(), $result);
        $count = $this->bookRepository->count(array());

        return new JsonResponse([
            'data' => $result,
            'offset' => $offset,
            'limit' => $limit,
            'total' => $count
        ], 200);
    }

}