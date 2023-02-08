<?php

namespace App\Book\Infrastructure;

use App\Book\Application\StoreBook;
use Symfony\Component\Serializer\Exception\InvalidArgumentException;

class BookImporter
{
    public function __construct(
        private readonly JsonSchemaValidator $jsonSchemaValidator,
        private readonly StoreBook $storeBook,
        private readonly FileHandler $fileHandler
    ) {
    }

    public function import(string $fileName): void
    {
        $filePath = realpath($fileName);
        $file = fopen($filePath, 'r');
        
        // create a copy of the original file
        if (!file_exists($filePath . ".copy")) {
            copy($filePath, $filePath . ".copy");
        }
        
        [$headers, $data, $dataLen] = $this->fileHandler->csvToArray($file, $filePath);
        
        fclose($file);
    
        for ($i = 0; $i < $dataLen; $i++) {
            if ($this->validateRowData($data[$i])) {
                $this->storeRowData($data[$i]);
            }
            else {
                echo "\033[31m Errore trovato sul file csv\n";
                echo "\033[31m Le prime {$i} righe del file csv sono state caricate correttamente\n";
                echo "\033[31m Correggere la prima riga del file csv e rilanciare lo script\n \033[0m";
                
                $this->fileHandler->removeStoredRowsAndUpdateCsvFile($i, $headers, $data, $filePath);

                throw new InvalidArgumentException();
            }
        }
        $this->fileHandler->cleanFiles($filePath);
        echo "\033[32m File csv caricato completamente\n \033[0m";
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

    private function validateRowData(mixed $data): bool
    {
        if (!is_numeric($data['price'])) {
            return false;
        }
        $data['price'] = floatval($data['price']);
        return $this->jsonSchemaValidator->validate(json_encode($data), $this->jsonSchemaValidator->requestBookJsonSchema());
    }

}
