<?php

namespace App\Tests\Unit;

use App\Book\Application\StoreBook;
use App\Book\Domain\Entity\Book;
use App\Book\Infrastructure\Repository\BookRepository;
use PHPUnit\Framework\TestCase;
use Prophecy\Argument;
use Prophecy\PhpUnit\ProphecyTrait;

class StoreBookTest extends TestCase
{

    use ProphecyTrait;

    public function testItShouldStoreNewBook(): void
    {
        $price = 10.99;
        $author = 'Author';
        $title = 'Title';
        $description = 'This book talks about a description';

        $book = new Book($price,$author,$title,$description);

        $bookRepository = $this->prophesize(BookRepository::class);

        $bookRepository->save(Argument::type(Book::class),true)->shouldBeCalledOnce();

        $storeBook = new StoreBook($bookRepository->reveal());
        $storeBook->storeBook($price,$author,$title,$description);
    }

    public function testItShouldStoreUpdatedBook(): void
    {
        $price = 10.99;
        $author = 'Author';
        $title = 'Title';
        $description = 'This book talks about a description';

        $book = new Book();
        $book->setDescription('Test inserimento')
            ->setTitle('Titolo di test')
            ->setAuthor('Autore di test')
            ->setPrice(20.99);

        $bookRepository = $this->prophesize(BookRepository::class);

        $bookRepository->save(Argument::type(Book::class),true)->shouldBeCalledOnce();

        $storeBook = new StoreBook($bookRepository->reveal());
        $newBook = $storeBook->storeBook($price,$author,$title,$description, $book);

        self::assertEquals($title,$newBook->getTitle());
        self::assertEquals($author,$newBook->getAuthor());
        self::assertEquals($price,$newBook->getPrice());
        self::assertEquals($description,$newBook->getDescription());
    }

}