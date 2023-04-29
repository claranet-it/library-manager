<?php

namespace App\Book\Infrastructure\Controller;

use App\Book\Infrastructure\PaginationCapabilities;
use App\Book\Infrastructure\Repository\iBookRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class GetBooksController extends AbstractController
{
    use PaginationCapabilities;

    public function __construct(private readonly iBookRepository $bookRepository)
    {
    }

    public function __invoke(Request $request): JsonResponse
    {
        [$offset, $limit] = $this->getPageParamsFrom($request);

        $result = $this->bookRepository->findBy([], ['id' => 'DESC'], $limit, $offset);
        $count = $this->bookRepository->count([]);

        return new JsonResponse([
            'data' => $result,
            'offset' => $offset,
            'limit' => $limit,
            'total' => $count,
        ], 200);
    }
}
