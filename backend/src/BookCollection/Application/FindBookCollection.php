<?php

namespace App\BookCollection\Application;

use App\BookCollection\Domain\Entity\BookCollection;
use App\BookCollection\Infrastructure\Repository\BookCollectionRepository;

class FindBookCollection
{
    public function __construct(private readonly BookCollectionRepository $bookCollectionRepository)
    {
    }

    public function findCollection(string $collectionName): ?BookCollection
    {
        return $this->bookCollectionRepository->findOneBy(['name' => $collectionName]);
    }
}
