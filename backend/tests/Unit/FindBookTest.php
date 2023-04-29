<?php

namespace App\Tests\Unit;

use App\Book\Application\FindBook;
use App\Book\Domain\Entity\Book;
use App\Book\Infrastructure\Repository\BookRepository;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Uid\Uuid;

class FindBookTest extends TestCase
{
    private BookRepository $bookRepository;
    private FindBook $findBook;

    protected function setUp(): void
    {
        $this->bookRepository = $this->createMock(BookRepository::class);
        $this->findBook = new FindBook($this->bookRepository);
    }

    public function testFindByTitleAndAuthorReturnsBook(): void
    {
        $book = new Book(
            Uuid::v4(),
            'prova',
            'auth',
            39.99,
            'Description 4'
        );
        $this->bookRepository->expects($this->once())
            ->method('findOneBy')
            ->with(['title' => 'Titolo di test', 'author' => 'Autore di test'])
            ->willReturn($book);

        $result = $this->findBook->findByTitleAndAuthor('Titolo di test', 'Autore di test');

        $this->assertSame($book, $result);
    }

    public function testFindByTitleAndAuthorReturnsNullIfBookNotFound(): void
    {
        $this->bookRepository->expects($this->once())
            ->method('findOneBy')
            ->with(['title' => 'Nonexistent Book', 'author' => 'Nonexistent Author'])
            ->willReturn(null);

        $result = $this->findBook->findByTitleAndAuthor('Nonexistent Book', 'Nonexistent Author');

        $this->assertNull($result);
    }
}
