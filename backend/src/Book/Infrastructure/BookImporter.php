<?php

namespace App\Book\Infrastructure;

use App\Book\Application\FindBook;
use App\Book\Application\StoreBook;
use Psr\Log\LoggerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class BookImporter
{
    private $batchSize = 10;

    public function __construct(
        private readonly StoreBook $storeBook,
        private readonly FindBook $findBook,
        private readonly LoggerInterface $logger,
        private ValidatorInterface $validator,
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
            $this->logger->info("\033[32mCsv file has been imported without errors. \033[0m");
            echo "\033[32mCsv file has been imported without errors. \033[0m \n";
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
                    "\033[33mThe '%s' field is not valid: %s \033[0m",
                    $validationError->getPropertyPath(),
                    $validationError->getMessage()
                );
            }
            $this->logger->error(sprintf(
                "\033[31mThe book '%s' by '%s' has %d validation error(s):\n %s \033[0m",
                $book->getTitle(),
                $book->getAuthor(),
                count($validationErrors),
                implode(PHP_EOL, $errorMessages)
            ));
        }
    }
}
