<?php

namespace App\Tests\Unit\BookCollection;


use App\Book\Domain\Entity\Book;
use App\Book\Infrastructure\Repository\iBookRepository;
use App\BookCollection\Application\DTO\BookCollectionDTO;
use App\BookCollection\Application\FindBookCollection;
use App\BookCollection\Application\Handler\CreateBookCollectionHandler;
use App\BookCollection\Application\SaveBookCollection;
use App\BookCollection\Domain\Entity\BookCollection;
use App\BookCollection\Infrastructure\Repository\iBookCollectionRepository;
use App\Tests\Mock\Repository\InMemoryBookCollectionRepository;
use App\Tests\Mock\Repository\InMemoryBookRepository;
use Doctrine\Common\Collections\Collection;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Uid\Uuid;



class CreateBookCollectionHandlerTest extends TestCase
{

    private iBookCollectionRepository $bookCollectionRepository;
    private iBookRepository $bookRepository;
    private CreateBookCollectionHandler $handler;
    private Book $book1, $book2;
    private BookCollection $bookCollection;

    protected function setUp(): void
    {
        $this->bookCollectionRepository = new InMemoryBookCollectionRepository();
        $this->bookRepository = new InMemoryBookRepository();
        $this->handler = new CreateBookCollectionHandler(
            $this->bookRepository,
            new FindBookCollection($this->bookCollectionRepository),
            new SaveBookCollection($this->bookCollectionRepository)
        );

        $this->book1 = new Book(
            Uuid::fromString("beb7c73c-b371-4760-8b62-bd8d393aa398"),
            "test",
            "test",
            12,
            null
        );
        $this->bookRepository->save($this->book1);

        $this->book2 = new Book(
            Uuid::fromString("ab1d7b0c-cc10-4d6e-9793-34d45f5de4df"),
            "test",
            "test",
            12,
            null
        );
        $this->bookRepository->save($this->book2);

        $this->bookCollection = new BookCollection(
          Uuid::v4(),
          'test',
          'test',
            [$this->book1, $this->book2]
        );
        $this->bookCollectionRepository->save($this->bookCollection);
    }


    public function testItHandlesDTOSuccesfully(): void
    {
        $collectionDTO = new BookCollectionDTO(
            "pippo",
            "asdasdas",
             ["beb7c73c-b371-4760-8b62-bd8d393aa398",
                 "ab1d7b0c-cc10-4d6e-9793-34d45f5de4df"]
        );


        //self::expectException(\Throwable::class);
        $result = $this->handler->handle($collectionDTO);
        //var_dump($result);
        self::assertEquals('pippo', $result->getName());
        self::assertEquals('asdasdas', $result->getDescription());
        self::assertEquals([$this->book1, $this->book2], $result->getBooks()->getValues());
    }

    public function testItThrowsException(): void
    {
        $collectionDTO = new BookCollectionDTO(
            "test",
            "asdasdas",
            ["beb7c73c-b371-4760-8b62-bd8d393aa398",
                "ab1d7b0c-cc10-4d6e-9793-34d45f5de4df"]
        );


        self::expectException(HttpException::class);
        $result = $this->handler->handle($collectionDTO);
    }

}