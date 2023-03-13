<?php

namespace App\Book\Application;

use App\Book\Domain\Entity\Book;
use App\Book\Infrastructure\Repository\BookRepository;

class FindBook
{
    public function __construct(private readonly BookRepository $bookRepository)
    {
    }

    public function findByTitleAndAuthor(string $title, string $author): ?Book
    {
        return $this->bookRepository->findOneBy(
            ['title' => $title, 'author' => $author]
        );
    }
}
