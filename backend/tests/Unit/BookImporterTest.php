<?php

namespace App\Tests\Unit;

use App\Book\Application\StoreBook;
use App\Book\Infrastructure\BookImporter;
use App\Book\Infrastructure\FileHandler;
use App\Book\Infrastructure\JsonSchemaValidator;
use App\PassiveInvoicing\Infrastructure\Parsing\Decoder\Decoder;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Symfony\Component\Serializer\Exception\InvalidArgumentException;

class BookImporterTest extends KernelTestCase
{

    protected function setUp(): void
    {
        self::bootKernel();
    }

    public function testShouldNotValidateFirstRow()
    {
        $jsonSchemaValidator = self::getContainer()->get(JsonSchemaValidator::class);
        $storeBook = self::getContainer()->get(StoreBook::class);
        $fileHandler = self::getContainer()->get(FileHandler::class);

        $this->expectException(InvalidArgumentException::class);
        echo(\dirname(__DIR__)."/../fixtures/books-valid-test.csv");


        $bookImporter = new BookImporter($jsonSchemaValidator,$storeBook,$fileHandler);
        $bookImporter->import(\dirname(__DIR__)."/fixtures/books-not-valid-test.csv");
    }

    public function testShouldImportAllBooks()
    {
        $jsonSchemaValidator = self::getContainer()->get(JsonSchemaValidator::class);
        $storeBook = self::getContainer()->get(StoreBook::class);
        $fileHandler = self::getContainer()->get(FileHandler::class);

        $this->expectOutputString('File csv caricato completamente\n');
        echo(\dirname(__DIR__)."/../fixtures/books-valid-test.csv");


        $bookImporter = new BookImporter($jsonSchemaValidator,$storeBook,$fileHandler);
        $bookImporter->import(\dirname(__DIR__)."/fixtures/books-valid-test.csv");
    }

}