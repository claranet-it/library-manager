<?php

namespace App\Book\Infrastructure;

use Symfony\Component\HttpFoundation\Request as Request;

trait PaginationCapabilities {

    public function getPageParamsFrom(Request $request): array
    {
        $defaults = ['offset' => 0, 'limit' => 25];
        ['offset' => $offset, 'limit' => $limit] = $request->query->all() + $defaults;
        return [(int) $offset, (int) $limit];
    }

}