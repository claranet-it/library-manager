<?php

namespace App\BookCollection\Application\Handler;

use App\Book\Domain\Entity\Book;
use App\Book\Infrastructure\Repository\iBookRepository;
use App\BookCollection\Application\DTO\BookCollectionDTO;
use App\BookCollection\Application\FindBookCollection;
use App\BookCollection\Application\SaveBookCollection;
use App\BookCollection\Domain\Entity\BookCollection;
use App\Common\Exceptions\BookDoesNotExistsException;
use App\Common\Exceptions\CollectionAlreadyExistsException;
use Symfony\Component\Uid\Uuid;

class CreateBookCollectionHandler
{
    public function __construct(
        private iBookRepository $bookRepository,
        private FindBookCollection $findBookCollection,
        private SaveBookCollection $saveBookCollection,
    ) {
    }

    /**
     * @throws CollectionAlreadyExistsException
     */
    public function handle(BookCollectionDTO $collectionDTO): BookCollection
    {
        $bookList = $this->getExistingBooks($collectionDTO->getBooks());

        $bookCollection = BookCollection::newBookCollectionFromDTO($collectionDTO, $bookList);

        $collectionName = $bookCollection->getName();
        $collectionExists = $this->findBookCollection->findCollection($collectionName);

        if ($collectionExists) {
            throw new CollectionAlreadyExistsException("A collection with name: $collectionName already exists");
        }

        return $this->saveBookCollection->saveCollection($bookCollection);
    }

    /** @param string[] $bookIds*/
    /** @return Book[]
     * @throws BookDoesNotExistsException
     */
    private function getExistingBooks(array $bookIds): array
    {
        $foundBooks = [];
        foreach ($bookIds as $bookId) {
            $foundBook = $this->bookRepository->find(Uuid::fromString($bookId));
            if (!$foundBook) {
                throw new BookDoesNotExistsException("Book with id: $bookId not found");
            }

            $foundBooks[] = $foundBook;
        }

        return $foundBooks;
    }
}
