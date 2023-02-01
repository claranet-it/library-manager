<?php

namespace App\Book\Infrastructure;

use App\Book\Application\StoreBook;
use Symfony\Component\Serializer\Exception\InvalidArgumentException;
use Symfony\Component\Console\Output\OutputInterface;

class BookImporter
{
    public function __construct(
        private readonly JsonSchemaValidator $jsonSchemaValidator,
        private readonly StoreBook $storeBook,
        private readonly FileHandler $fileHandler
    ) {
    }

    public function import(OutputInterface $output, string $fileName): void
    {
        $file = fopen(\dirname(__DIR__)."/../../public/{$fileName}", 'r');

        [$headers, $data, $dataLen] = $this->fileHandler->csvToArray($file, $fileName);

        $tempFile = fopen(\dirname(__DIR__)."/../../public/temp_{$fileName}", 'w');
        try {
            for ($i = 0; $i < $dataLen; $i++) {
                $data = $this->storeRowData($data, $i);
            }
            fclose($tempFile);
            $this->fileHandler->cleanFiles($fileName);
            echo "\033[32m File csv caricato completamente\n \033[0m";
        } catch (InvalidArgumentException $e) {
            $this->fileHandler->dumpRestOfTheFile($i, $tempFile, $headers, $data, $fileName);
        }
    }

    /**
     * @return array|mixed
     */
    private function storeRowData(mixed $data, int $i): mixed
    {
        if (is_numeric($data[$i]['price'])) {
            $data[$i]['price'] = floatval($data[$i]['price']);
        }

        $isValid = $this->jsonSchemaValidator->validate(json_encode($data[$i]), $this->jsonSchemaValidator->requestBookJsonSchema());
        if ($isValid) {
            $this->storeBook->storeBook(
                $data[$i]['price'],
                $data[$i]['author'],
                $data[$i]['title'],
                $data[$i]['description']
            );
        } else {
            throw new InvalidArgumentException();
        }

        return $data;
    }
}
