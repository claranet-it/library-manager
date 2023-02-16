<?php

namespace App\Book\Infrastructure;

use App\Book\Application\FindBook;
use App\Book\Application\StoreBook;
use Psr\Log\LoggerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class BookImporter
{
    private $validator;
    private $batchSize = 10;

    public function __construct(
        private readonly StoreBook $storeBook,
        private readonly FindBook $findBook,
        private readonly LoggerInterface $logger,
        ValidatorInterface $validator,
    ) {
        $this->validator = $validator;
    }

    public function import(array $books): void
    {
        $validBooks = [];
        $errors = [];

        foreach ($books as $book) {
            $validationErrors = $this->validator->validate($book);

            if (0 === count($validationErrors)) {
                $validBooks[] = $book;

                if (count($validBooks) === $this->batchSize) {
                    foreach ($validBooks as $validBook) {
                        $existingBook = $this->findBook->findByTitleAndAuthor($validBook->getTitle(), $validBook->getAuthor());
                        if (!$existingBook) {
                            $this->storeBook->storeBookObject($validBook);
                        }
                    }
                    $validBooks = [];
                }
            } else {
                $errors[] = [
                    'book' => $book,
                    'errors' => $validationErrors,
                ];
            }
        }

        if (count($validBooks) > 0) {
            foreach ($validBooks as $validBook) {
                $existingBook = $this->findBook->findByTitleAndAuthor($validBook->getTitle(), $validBook->getAuthor());
                if (!$existingBook) {
                    $this->storeBook->storeBookObject($validBook);
                }
            }
        }

        if (count($errors) > 0) {
            $this->logValidationErrors($errors);
        } else {
            $this->logger->info("\033[32m File csv caricato correttamente \033[0m");
            print_r("\033[32m File csv caricato correttamente \033[0m \n");
        }
    }

    private function logValidationErrors(array $errors): void
    {
        foreach ($errors as $error) {
            $book = $error['book'];
            $validationErrors = $error['errors'];

            $errorMessages = [];

            foreach ($validationErrors as $validationError) {
                $errorMessages[] = sprintf(
                    "\033[31m Il campo '%s' del libro '%s' non è valido: %s \033[0m",
                    $validationError->getPropertyPath(),
                    $book->getTitle(),
                    $validationError->getMessage()
                );
            }

            $this->logger->error(implode("\n", $errorMessages));
        }
    }
}
