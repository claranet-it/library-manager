<?php

namespace App\BookCollection\Application;

use App\BookCollection\Domain\Entity\BookCollection;
use App\BookCollection\Infrastructure\Repository\iBookCollectionRepository;

class SaveBookCollection
{
    public function __construct(private readonly iBookCollectionRepository $bookCollectionRepository)
    {
    }

    public function saveCollection(BookCollection $bookCollection): BookCollection
    {
        $this->bookCollectionRepository->save($bookCollection);

        return $bookCollection;
    }
}
