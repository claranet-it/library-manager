<?php

namespace App\BookCollection\Application;

use App\BookCollection\Domain\Entity\BookCollection;
use App\BookCollection\Infrastructure\Repository\BookCollectionRepository;

class SaveBookCollection
{
    public function __construct(private readonly BookCollectionRepository $bookCollectionRepository)
    {
    }

    public function saveBookCollection(BookCollection $bookCollection): BookCollection
    {
        $this->bookCollectionRepository->save($bookCollection);

        return $bookCollection;
    }
}
