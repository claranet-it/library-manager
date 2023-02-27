<?php

namespace App\Book\Infrastructure;

use App\Book\Application\DTO\BookDTO;
use Prophecy\PhpUnit\ProphecyTrait;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Symfony\Component\Serializer\Encoder\CsvEncoder;
use Symfony\Component\Serializer\SerializerInterface;

class CsvFileHandlerTest extends KernelTestCase
{
    use ProphecyTrait;
    private SerializerInterface $serializerInterface;
    private $mockSerializer;

    public function setUp(): void
    {
        $this->serializerInterface = self::getContainer()->get(SerializerInterface::class);
        $this->mockSerializer = $this->prophesize(SerializerInterface::class);
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

        $this->assertInstanceOf(BookDTO::class, $books[1]);
        $this->assertEquals('Extreme Contracts', $books[1]->getTitle());
        $this->assertEquals('Jacopo Romei', $books[1]->getAuthor());
        $this->assertEquals(19.90, $books[1]->getPrice());
        $this->assertEquals('Il knowledge work dalla negoziazione alla collaborazione', $books[1]->getDescription());
    }

    public function testCsvToBookListMock(): void
    {
        $filePath = __DIR__.'/../fixtures/books-valid-test.csv';

        $data = file_get_contents($filePath);
        $this->mockSerializer->deserialize($data, BookDTO::class.'[]', 'csv', [CsvEncoder::DELIMITER_KEY => ';'])->willReturn(
            [
                [
                    'title' => 'Clean Code',
                    'author' => ' Robert Cecil Martin',
                    'price' => '10.00',
                    'description' => ' Books description\'s',
                ],
                [
                    'title' => 'Extreme Contracts',
                    'author' => 'Jacopo Romei',
                    'price' => '19.90',
                    'description' => 'Il knowledge work dalla negoziazione alla collaborazione',
                ],
            ]
        );

        $handler = new CsvFileHandler($this->mockSerializer->reveal());
        $books = $handler->csvToBookList($filePath);

        $this->assertCount(2, $books);

        $this->assertInstanceOf(BookDTO::class, $books[0]);
        $this->assertEquals('Clean Code', $books[0]->getTitle());
        $this->assertEquals('Robert Cecil Martin', $books[0]->getAuthor());
        $this->assertEquals(10.00, $books[0]->getPrice());
        $this->assertEquals("Books description's", $books[0]->getDescription());

        $this->assertInstanceOf(BookDTO::class, $books[1]);
        $this->assertEquals('Extreme Contracts', $books[1]->getTitle());
        $this->assertEquals('Jacopo Romei', $books[1]->getAuthor());
        $this->assertEquals(19.90, $books[1]->getPrice());
        $this->assertEquals('Il knowledge work dalla negoziazione alla collaborazione', $books[1]->getDescription());
    }
}
