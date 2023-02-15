<?php

namespace App\Book\Infrastructure;

use App\Book\Domain\Entity\Book;
use PHPUnit\Framework\TestCase;

class CsvFileHandlerTest extends TestCase
{
    public function testCsvToBookList(): void
    {
        $filePath = __DIR__.'/../fixtures/books-valid-test.csv';

        $handler = new CsvFileHandler();
        $books = $handler->csvToBookList($filePath);

        $this->assertCount(2, $books);

        $this->assertInstanceOf(Book::class, $books[0]);
        $this->assertEquals('Clean Code', $books[0]->getTitle());
        $this->assertEquals('Robert Cecil Martin', $books[0]->getAuthor());
        $this->assertEquals(10.00, $books[0]->getPrice());
        $this->assertEquals("Books description's", $books[0]->getDescription());

        $this->assertInstanceOf(Book::class, $books[1]);
        $this->assertEquals('Extreme Contracts', $books[1]->getTitle());
        $this->assertEquals('Jacopo Romei', $books[1]->getAuthor());
        $this->assertEquals(19.90, $books[1]->getPrice());
        $this->assertEquals('Il knowledge work dalla negoziazione alla collaborazione', $books[1]->getDescription());
    }
}
