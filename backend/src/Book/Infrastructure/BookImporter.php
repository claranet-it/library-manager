<?php

namespace App\Book\Infrastructure;

use App\Book\Application\DTO\BookDTO;
use App\Book\Application\DTO\BookValidationError;
use App\Book\Application\FindBook;
use App\Book\Application\StoreBook;
use App\Book\Domain\Entity\Book;
use Psr\Log\LoggerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class BookImporter
{
    private int $batchSize = 10;

    public function __construct(
        private readonly StoreBook $storeBook,
        private readonly FindBook $findBook,
        private readonly LoggerInterface $logger,
        private readonly ValidatorInterface $validator,
    ) {
    }

    /**
     * @param BookDTO[] $booksDTO
     */
    public function import(array $booksDTO): void
    {
        $validBooks = [];
        $errors = [];

        foreach ($booksDTO as $bookDTO) {
            $validationErrors = $this->validator->validate($bookDTO);

            if (0 === count($validationErrors)) {
                $validBooks[] = Book::newBookFrom($bookDTO);

                if (count($validBooks) === $this->batchSize) {
                    $this->saveBooksIfNotExist($validBooks);
                    $validBooks = [];
                }
            } else {
                foreach ($validationErrors as $validationError) {
                    $errors[] = new BookValidationError(
                        $bookDTO,
                        $validationError->getPropertyPath(),
                        $validationError->getMessage()
                    );
                }
            }
        }

        if (count($validBooks) > 0) {
            $this->saveBooksIfNotExist($validBooks);
        }

        if (count($errors) > 0) {
            $this->logValidationErrors($errors);
        } else {
            $this->logger->info("\033[32mCsv file has been imported without errors. \033[0m");
            echo "\033[32mCsv file has been imported without errors. \033[0m \n";
        }
    }

    /**
     * @param array<int, BookValidationError> $errors
     */
    private function logValidationErrors(array $errors): void
    {
        foreach ($errors as $error) {
            $this->logger->error($error->getValidationErrorMessage());
        }
    }

    /**
     * @param Book[] $validBooks
     */
    public function saveBooksIfNotExist(array $validBooks): void
    {
        foreach ($validBooks as $validBook) {
            $existingBook = $this->findBook->findByTitleAndAuthor($validBook->getTitle(), $validBook->getAuthor());
            if (!$existingBook) {
                $this->storeBook->storeBook($validBook);
            }
        }
    }
}
