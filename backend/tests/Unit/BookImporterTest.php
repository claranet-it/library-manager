<?php

namespace App\Tests\Unit;

use App\Book\Application\DTO\BookDTO;
use App\Book\Application\FindBook;
use App\Book\Application\StoreBook;
use App\Book\Domain\Entity\Book;
use App\Book\Infrastructure\BookImporter;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;
use Symfony\Component\Validator\ConstraintViolationInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class BookImporterTest extends TestCase
{
    private $storeBookMock;
    private $findBookMock;
    private $validatorMock;
    private $loggerMock;

    protected function setUp(): void
    {
        $this->storeBookMock = $this->createMock(StoreBook::class);
        $this->findBookMock = $this->createMock(FindBook::class);
        $this->validatorMock = $this->createMock(ValidatorInterface::class);
        $this->loggerMock = $this->createMock(LoggerInterface::class);
    }

    public function testImportWithValidBooks(): void
    {
        $book1 = new BookDTO(
            'Book 1',
            'Author 1',
            9.99,
            'Description 1'
        );


        $book2 = new BookDTO(
            'Book 2',
            'Author 2',
            19.99,
            'Description 2'
        );

        $books = [$book1, $book2];

        $this->storeBookMock
            ->expects($this->exactly(2))
            ->method('storeBookObject')
            ->withConsecutive([$book1->toBook()], [$book2->toBook()]);

        $this->findBookMock
            ->method('findByTitleAndAuthor')
            ->willReturn(null);

        $this->validatorMock
            ->method('validate')
            ->willReturn(new \Symfony\Component\Validator\ConstraintViolationList([]));

        $this->loggerMock
            ->expects($this->once())
            ->method('info')
            ->with($this->equalTo("\033[32mCsv file has been imported without errors. \033[0m"));

        $bookImporter = new BookImporter($this->storeBookMock, $this->findBookMock, $this->loggerMock, $this->validatorMock);
        $bookImporter->import($books);
    }

    public function testImportInvalidBook(): void
    {
        $invalidBook = new Book(
            '',
            'Author 3',
            29.99,
            'Description 3'
        );
        $books = [$invalidBook];

        $violations = $this->createMock(ConstraintViolationInterface::class);
        $this->validatorMock
        ->method('validate')
        ->willReturn(new \Symfony\Component\Validator\ConstraintViolationList([$violations]));

        $this->loggerMock
        ->expects($this->once())
        ->method('error');

        $bookImporter = new BookImporter($this->storeBookMock, $this->findBookMock, $this->loggerMock, $this->validatorMock);
        $bookImporter->import($books);
    }

    public function testImportMixedBooks(): void
    {
        $validBook1 = new BookDTO(
            'Valid Book 1',
            'Author 1',
            9.99,
            'Description 1'
        );

        $validBook2 = new BookDTO(
            'Valid Book 2',
            'Author 2',
            19.99,
            'Description 2'
        );

        $validBooks = [$validBook1, $validBook2];

        $invalidBook1 = new BookDTO(
            '',
            'Author 3',
            29.99,
            'Description 3'
        );

        $invalidBook2 = new BookDTO(
            'Invalid Book 2',
            '',
            39.99,
            'Description 4'
        );

        $invalidBook3 = new BookDTO(
            'Invalid Book 3',
            '',
            49.99,
            ''
        );

        $invalidBooks = [$invalidBook1, $invalidBook2, $invalidBook3];

        $violation = $this->createMock(ConstraintViolationInterface::class);
        $violation->expects($this->any())
            ->method('getPropertyPath')
            ->willReturn('title');

        $this->validatorMock->expects($this->exactly(count($validBooks) + count($invalidBooks)))
            ->method('validate')
            ->willReturnOnConsecutiveCalls(
            new \Symfony\Component\Validator\ConstraintViolationList([]),
            new \Symfony\Component\Validator\ConstraintViolationList([]),
            new \Symfony\Component\Validator\ConstraintViolationList([$violation]),
            new \Symfony\Component\Validator\ConstraintViolationList([$violation]),
            new \Symfony\Component\Validator\ConstraintViolationList([$violation])
        );

        $this->findBookMock->expects($this->exactly(count($validBooks)))
            ->method('findByTitleAndAuthor')
            ->willReturn(null);

        $this->storeBookMock->expects($this->exactly(count($validBooks)))
            ->method('storeBookObject')
            ->withConsecutive([$validBook1->toBook()], [$validBook2->toBook()]);

        $this->loggerMock->expects($this->exactly(3))->method('error');

        $bookImporter = new BookImporter($this->storeBookMock, $this->findBookMock, $this->loggerMock, $this->validatorMock);
        $bookImporter->import(array_merge($validBooks, $invalidBooks));
    }
}
