<?php

namespace App\Tests\Unit;

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
        $book1 = new Book();
        $book1->setTitle('Book 1')
            ->setAuthor('Author 1')
            ->setDescription('Description 1')
            ->setPrice(9.99);

        $book2 = new Book();
        $book2->setTitle('Book 2')
            ->setAuthor('Author 2')
            ->setDescription('Description 2')
            ->setPrice(19.99);

        $books = [$book1, $book2];

        $this->storeBookMock
            ->expects($this->exactly(2))
            ->method('storeBookObject')
            ->withConsecutive([$book1], [$book2]);

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
        $invalidBook = new Book();
        $invalidBook->setTitle('')
            ->setAuthor('Author 3')
            ->setDescription('Description 3')
            ->setPrice(29.99);
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
        $validBook1 = new Book();
        $validBook1->setTitle('Valid Book 1')
            ->setAuthor('Author 1')
            ->setDescription('Description 1')
            ->setPrice(9.99);

        $validBook2 = new Book();
        $validBook2->setTitle('Valid Book 2')
            ->setAuthor('Author 2')
            ->setDescription('Description 2')
            ->setPrice(19.99);

        $validBooks = [$validBook1, $validBook2];

        $invalidBook1 = new Book();
        $invalidBook1->setTitle('')
            ->setAuthor('Author 3')
            ->setDescription('Description 3')
            ->setPrice(29.99);

        $invalidBook2 = new Book();
        $invalidBook2->setTitle('Invalid Book 2')
            ->setAuthor('')
            ->setDescription('Description 4')
            ->setPrice(39.99);

        $invalidBook3 = new Book();
        $invalidBook3->setTitle('Invalid Book 3')
            ->setAuthor('')
            ->setDescription('')
            ->setPrice(49.99);

        $invalidBooks = [$invalidBook1, $invalidBook2, $invalidBook3];

        $violation = $this->createMock(ConstraintViolationInterface::class);
        $violation->expects($this->any())
            ->method('getPropertyPath')
            ->willReturn('title');

        $this->validatorMock->expects($this->exactly(count($validBooks) + count($invalidBooks)))
            ->method('validate')
            ->willReturnOnConsecutiveCalls
        (
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
            ->withConsecutive([$validBook1], [$validBook2]);

        $this->loggerMock->expects($this->exactly(3))->method('error');


        $bookImporter = new BookImporter($this->storeBookMock, $this->findBookMock, $this->loggerMock, $this->validatorMock);
        $bookImporter->import(array_merge($validBooks, $invalidBooks));
    }
}