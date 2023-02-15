<?php

namespace App\Book\Infrastructure;

use App\Book\Application\StoreBook;
use Psr\Log\LoggerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class BookImporter
{
    private $serializer;
    private $validator;

    public function __construct(
        private readonly StoreBook $storeBook,
        private readonly LoggerInterface $logger,
        ValidatorInterface $validator,
    ) {
        $this->validator = $validator;
    }

    public function import(array $books): void
    {
        foreach ($books as $book) {
            $errors = $this->validator->validate($books);
        }

        if (count($errors) > 0) {
            $this->logger->error("\033[31m Errore trovato sul file csv! \033[0m");
            print_r("\033[31m Errore trovato sul file csv! \033[0m \n");
        } else {
            $this->logger->info("\033[32m File csv caricato correttamente \033[0m");
            print_r("\033[32m File csv caricato correttamente \033[0m \n");
        }
    }
}
