<?php

namespace App\Book\Infrastructure;

use App\Book\Application\StoreBook;
use Symfony\Component\Serializer\Exception\InvalidArgumentException;
use Psr\Log\LoggerInterface;


class BookImporter
{
    public function __construct(
        private readonly StoreBook $storeBook,
        private readonly CsvFileHandler $csvFileHandler,
        private readonly LoggerInterface $logger
    ) {
    }

    public function import(string $fileName): void
    {
        $filePath = realpath($fileName);
        
        [$headers, $data, $dataLen] = $this->csvFileHandler->csvToArray($filePath);
       
    
        for ($i = 0; $i < $dataLen; $i++) {
            if ($this->validateRow($data[$i])) {
                $this->storeRowData($data[$i]);
            }
            else {
                $this->logger->error("\033[31m Errore trovato sulla riga {$i} del file csv \033[0m");
                $this->csvFileHandler->addNotStoredRowInCsvFile($data[$i], $filePath);
            }
        }

        $this->logger->info("\033[32m File csv caricato correttamente \033[0m");
        echo "\033[32m File csv caricato correttamente\n \033[0m";
    }
    

    private function storeRowData(mixed $data): void
    {
        $this->storeBook->storeBook(
            $data['price'],
            $data['author'],
            $data['title'],
            $data['description']
        );
    }

    private function validateRow(array $book): bool
    {
        if (!array_key_exists('title', $book) || empty($book['title'])) {
            return false;
        }
        if (!array_key_exists('author', $book) || empty($book['author'])) {
            return false;
        }
        if (!array_key_exists('price', $book) || empty($book['price'])) {
            return false;
        }

        return true;
    }
}
