<?php

namespace App\BookCollection\Application\Handler;

use App\Book\Domain\Entity\Book;
use App\Book\Infrastructure\Repository\iBookRepository;
use App\BookCollection\Application\DTO\BookCollectionDTO;
use App\BookCollection\Application\FindBookCollection;
use App\BookCollection\Application\SaveBookCollection;
use App\BookCollection\Domain\Entity\BookCollection;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Uid\Uuid;

class CreateBookCollectionHandler
{

    public function __construct(
        private iBookRepository    $bookRepository,
        private FindBookCollection $findBookCollection,
        private SaveBookCollection $saveBookCollection,
    )
    {
    }

    public function handle(BookCollectionDTO $collectionDTO): BookCollection
    {
        $collectionDTO->setBooks($this->getExistingBooks($collectionDTO->getBooks()));

        $bookCollection = BookCollection::newBookCollectionFrom($collectionDTO);

        $collectionName = $bookCollection->getName();
        $collectionExists = $this->findBookCollection->findCollection($collectionName);

        if ($collectionExists) {
            throw new HttpException(400, "A collection with name: $collectionName already exists");
        }

        return $this->saveBookCollection->saveCollection($bookCollection);
    }


    /** @param string[] $bookIds*/
    /** @return Book[] */
    private function getExistingBooks(array $bookIds): array
    {
        $foundBooks = [];
        foreach ($bookIds as $bookId) {
            $foundBook = $this->bookRepository->find(Uuid::fromString($bookId));
            if (!$foundBook) {
                throw new HttpException(400, "Book with id: $bookId not found");
            }

            $foundBooks[] = $foundBook;
        }

        return $foundBooks;
    }
}
