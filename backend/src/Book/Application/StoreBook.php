<?php

namespace App\Book\Application;

use App\Book\Domain\Entity\Book;
use App\Book\Infrastructure\Repository\BookRepository;

class StoreBook
{
    public function __construct(private readonly BookRepository $bookRepository)
    {
    }

    public function storeBookObject(Book $book): Book
    {
        $this->bookRepository->save($book, true);

        return $book;
    }

}
