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
        $filePath = realpath(\dirname(__DIR__)."/../../public/{$fileName}");
        $file = fopen($filePath, 'r');
    
        [$headers, $data, $dataLen] = $this->fileHandler->csvToArray($file, $filePath);
    
        $tempFile = fopen(\dirname(__DIR__)."/../../public/{$fileName}.temp", 'w');
        for ($i = 0; $i < $dataLen; $i++) {
            if ($this->validateRowData($data, $i)) {
                $this->storeRowData($data, $i);
            }
            else {
                $this->fileHandler->dumpRestOfTheFile($i, $tempFile, $headers, $data, $filePath);
                throw new InvalidArgumentException();
            }
        }
        fclose($tempFile);
        $this->fileHandler->cleanFiles($filePath);
        echo "\033[32m File csv caricato completamente\n \033[0m";
    }
    

    private function storeRowData(mixed $data, int $i): void
    {
        $this->storeBook->storeBook(
            $data[$i]['price'],
            $data[$i]['author'],
            $data[$i]['title'],
            $data[$i]['description']
        );
    }

    private function validateRowData(mixed $data, int $i): bool
    {
        if (!is_numeric($data[$i]['price'])) {
            return false;
        }
        $data[$i]['price'] = floatval($data[$i]['price']);
        return $this->jsonSchemaValidator->validate(json_encode($data[$i]), $this->jsonSchemaValidator->requestBookJsonSchema());
    }

}
