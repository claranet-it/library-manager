<?php

namespace App\Tests\Unit;

use App\Book\Application\StoreBook;
use App\Book\Domain\Entity\Book;
use App\Book\Infrastructure\Repository\BookRepository;
use PHPUnit\Framework\TestCase;

class StoreBookTest extends TestCase
{
    private $bookRepositoryMock;
    private $storeBook;

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
        $book = $this->storeBook->storeBook($price, $author, $title, $description);

        $this->assertInstanceOf(Book::class, $book);
        $this->assertEquals($price, $book->getPrice());
        $this->assertEquals($author, $book->getAuthor());
        $this->assertEquals($title, $book->getTitle());
        $this->assertEquals($description, $book->getDescription());
//        $this->bookRepositoryMock->expects($this->once())
//            ->method('save')
//            ->with($book, true);
    }

    public function testStoreBookWithExistingBook()
    {
        $book = new Book();
        $price = 14.99;
        $author = 'Jane Doe';
        $title = 'Another Test Book';
        $description = 'This is another test book.';
        $updatedBook = $this->storeBook->storeBook($price, $author, $title, $description, $book);

        $this->assertSame($book, $updatedBook);
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
        $book = new Book();
        $this->bookRepositoryMock->expects($this->once())
            ->method('save')
            ->with($book, true);
        $result = $this->storeBook->storeBookObject($book);
        $this->assertSame($book, $result);
    }
}
