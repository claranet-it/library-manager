<?php

namespace App\Tests\Unit;

use App\Book\Application\StoreBook;
use App\Book\Domain\Entity\Book;
use App\Book\Infrastructure\Repository\BookRepository;
use PHPUnit\Framework\TestCase;

class StoreBookTest extends TestCase
{
    private $bookRepositoryMock;
    private StoreBook $storeBook;

    public function setUp(): void
    {
        $this->bookRepositoryMock = $this->createMock(BookRepository::class);
        $this->storeBook = new StoreBook($this->bookRepositoryMock);
    }

    public function testStoreBookWithNewBook()
    {
        $price = 19.99;
        $author = 'John Doe';
        $title = 'Test Book';
        $description = 'This is a test book.';
        $book = $this->storeBook->storeBook(
            new Book(
                $title,
                $author,
                $price,
                $description
            )
        );

        $this->assertInstanceOf(Book::class, $book);
        $this->assertEquals($price, $book->getPrice());
        $this->assertEquals($author, $book->getAuthor());
        $this->assertEquals($title, $book->getTitle());
        $this->assertEquals($description, $book->getDescription());
//        $this->bookRepositoryMock->expects($this->once())
//            ->method('save')
//            ->with($book, true);
    }

    public function testStoreBookObject()
    {
        $book = new Book(
            'TestBook',
            'TestAuth',
            39.99,
            'Description 4'
        );
        $this->bookRepositoryMock->expects($this->once())
            ->method('save')
            ->with($book, true);
        $result = $this->storeBook->storeBook($book);
        $this->assertSame($book, $result);
    }
}
