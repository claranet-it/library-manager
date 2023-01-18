<?php

namespace App\Book\Infrastructure\Application;

use App\Book\Domain\Entity\Book;
use App\Book\Infrastructure\Repository\BookRepository;

class BooksOperations
{
    public function __construct(private readonly BookRepository $bookRepository)
    {
    }

    public function saveBook(float $price, string $author, string $title, string $description, Book $book = null): Book
    {
        if (null === $book) {
            $book = new Book();
        }
        $book->setPrice($price)
            ->setAuthor($author)
            ->setTitle($title)
            ->setDescription($description);
        $this->bookRepository->save($book, true);

        return $book;
    }
}
