<?php

namespace App\Book\Application;

use App\Book\Domain\Entity\Book;
use App\Book\Infrastructure\Repository\iBookRepository;

class StoreBook
{
    public function __construct(private readonly iBookRepository $bookRepository)
    {
    }

    public function storeBook(Book $book): Book
    {
        $this->bookRepository->save($book, true);

        return $book;
    }
}
