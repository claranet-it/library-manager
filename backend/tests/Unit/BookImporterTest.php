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
use Symfony\Component\Validator\ConstraintViolationList;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class BookImporterTest extends TestCase
{
    private StoreBook $storeBookMock;
    private FindBook $findBookMock;
    private ValidatorInterface $validatorMock;
    private LoggerInterface $loggerMock;

    protected function setUp(): void
    {
        $this->storeBookMock = $this->createMock(StoreBook::class);
        $this->findBookMock = $this->createMock(FindBook::class);
        $this->validatorMock = $this->createMock(ValidatorInterface::class);
        $this->loggerMock = $this->createMock(LoggerInterface::class);
    }

    public function testImportWithValidBooks(): void
    {
        $book1 = (new BookDTO())
            ->setTitle('Valid Book 1')
            ->setAuthor('Author 1')
            ->setPrice(9.99)
            ->setDescription('Description 1');

        $book2 = (new BookDTO())
            ->setTitle('Valid Book 1')
            ->setAuthor('Author 1')
            ->setPrice(9.99)
            ->setDescription('Description 1');

        $books = [$book1, $book2];

        $this->storeBookMock
            ->expects($this->exactly(2))
            ->method('storeBook')
            ->withConsecutive([Book::newBookFrom($book1)], [Book::newBookFrom($book2)]);

        $this->findBookMock
            ->method('findByTitleAndAuthor')
            ->willReturn(null);

        $this->validatorMock
            ->method('validate')
            ->willReturn(new ConstraintViolationList([]));

        $this->loggerMock
            ->expects($this->once())
            ->method('info')
            ->with($this->equalTo("\033[32mCsv file has been imported without errors. \033[0m"));

        $bookImporter = new BookImporter($this->storeBookMock, $this->findBookMock, $this->loggerMock, $this->validatorMock);
        $bookImporter->import($books);
    }

    public function testImportInvalidBook(): void
    {
        $invalidBook = (new BookDTO())
            ->setTitle('')
            ->setAuthor('Author 1')
            ->setPrice(9)
            ->setDescription('Description');
        $books = [$invalidBook];

        $violations = $this->createMock(ConstraintViolationInterface::class);
        $this->validatorMock
        ->method('validate')
        ->willReturn(new ConstraintViolationList([$violations]));

        $this->loggerMock
        ->expects($this->once())
        ->method('error');

        $bookImporter = new BookImporter($this->storeBookMock, $this->findBookMock, $this->loggerMock, $this->validatorMock);
        $bookImporter->import($books);
    }

    public function testImportMixedBooks(): void
    {
        $validBook1 = (new BookDTO())
            ->setTitle('Valid Book 1')
            ->setAuthor('Author 1')
            ->setPrice(9.99)
            ->setDescription('Description 1');

        $validBook2 = (new BookDTO())
            ->setTitle('Valid Book 2')
            ->setAuthor('Author 2')
            ->setPrice(19.99)
            ->setDescription('Description 2');

        $validBooks = [$validBook1, $validBook2];

        $invalidBook1 = (new BookDTO())
            ->setTitle('')
            ->setAuthor('Author 3')
            ->setPrice(29.99)
            ->setDescription('Description 3');

        $invalidBook2 = (new BookDTO())
            ->setTitle('Invalid Book 2')
            ->setAuthor('')
            ->setPrice(39.99)
            ->setDescription('Description 4');

        $invalidBook3 = (new BookDTO())
            ->setTitle('Invalid Book 3')
            ->setAuthor('')
            ->setPrice(49.99)
            ->setDescription('');

        $invalidBooks = [$invalidBook1, $invalidBook2, $invalidBook3];

        $violation = $this->createMock(ConstraintViolationInterface::class);
        $violation->expects($this->any())
            ->method('getPropertyPath')
            ->willReturn('title');

        $this->validatorMock->expects($this->exactly(count($validBooks) + count($invalidBooks)))
            ->method('validate')
            ->willReturnOnConsecutiveCalls(
                new ConstraintViolationList([]),
                new ConstraintViolationList([]),
                new ConstraintViolationList([$violation]),
                new ConstraintViolationList([$violation]),
                new ConstraintViolationList([$violation])
            );

        $this->findBookMock->expects($this->exactly(count($validBooks)))
            ->method('findByTitleAndAuthor')
            ->willReturn(null);

        $this->storeBookMock->expects($this->exactly(count($validBooks)))
            ->method('storeBook')
            ->withConsecutive([Book::newBookFrom($validBook1)], [Book::newBookFrom($validBook2)]);

        $this->loggerMock->expects($this->exactly(3))->method('error');

        $bookImporter = new BookImporter($this->storeBookMock, $this->findBookMock, $this->loggerMock, $this->validatorMock);
        $bookImporter->import(array_merge($validBooks, $invalidBooks));
    }
}
