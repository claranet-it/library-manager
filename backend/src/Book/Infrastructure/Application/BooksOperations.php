<?php

namespace App\Book\Infrastructure\Application;

use App\Book\Domain\Entity\Book;
use App\Book\Infrastructure\Repository\BookRepository;

class BooksOperations
{

    public static function saveBook(BookRepository $bookRepository, float $price, string $author, string $title, string $description, Book $book = null): Book
    {
        if ($book === null) {
            $book = new Book();
        }
        $book->setPrice($price)
            ->setAuthor($author)
            ->setTitle($title)
            ->setDescription($description);
        $bookRepository->save($book, true);

        return $book;
    }

}