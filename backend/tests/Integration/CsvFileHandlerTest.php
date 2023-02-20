<?php

namespace App\Book\Infrastructure;

use App\Book\Application\DTO\BookDTO;
use App\Book\Domain\Entity\Book;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Prophecy\PhpUnit\ProphecyTrait;

class CsvFileHandlerTest extends KernelTestCase
{
    use ProphecyTrait;
    private SerializerInterface $serializerInterface;
    private $mockSerializer;

    public function setUp(): void
    {
        $this->serializerInterface = self::getContainer()->get(SerializerInterface::class);
        $this->mockSerializer = $this->prophesize(SerializerInterface::class)->reveal();
    }

    public function testCsvToBookList(): void
    {
        $filePath = __DIR__.'/../fixtures/books-valid-test.csv';

        $handler = new CsvFileHandler($this->serializerInterface);
        $books = $handler->csvToBookList($filePath);

        $this->assertCount(2, $books);

        $this->assertInstanceOf(BookDTO::class, $books[0]);
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

    public function testCsvToBookListMock(): void
    {

    }
}
