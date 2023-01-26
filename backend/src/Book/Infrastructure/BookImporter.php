<?php

namespace App\Book\Infrastructure;

use App\Book\Application\StoreBook;
use http\Exception\InvalidArgumentException;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Serializer\Encoder\CsvEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class BookImporter
{
    public function __construct(
        private readonly JsonSchemaValidator $jsonSchemaValidator,
        private readonly StoreBook $storeBook
    ) {
    }

    public function import(OutputInterface $output, string $fileName): void
    {
        $serializer = new Serializer([new ObjectNormalizer()], [new CsvEncoder()]);
        $file = fopen(\dirname(__DIR__)."/../../public/{$fileName}", 'r');

        [$headers, $data, $dataLen] = $this->csvReader($file, $fileName, $serializer);

        $tempFile = fopen(\dirname(__DIR__)."/../../public/temp_{$fileName}", 'w');
        try {
            for ($i = 0; $i < $dataLen; $i++) {
                $data = $this->storeRowData($data, $i);
            }
            fclose($tempFile);
            $this->filesCleaner($fileName);
            echo "\033[32m File csv caricato completamente\n \033[0m";
        } catch (InvalidArgumentException $e) {
            $this->dumpRestOfTheFile($i, $tempFile, $headers, $data, $fileName);
        }
    }

    /**
     * @param mixed $file
     * @param string $fileName
     * @param Serializer $serializer
     * @return mixed[]
     */
    private function csvReader(mixed $file, string $fileName, Serializer $serializer): array
    {
        if (!file_exists(\dirname(__DIR__)."/../../public/{$fileName}.copy")) {
            copy(\dirname(__DIR__)."/../../public/{$fileName}", \dirname(__DIR__)."/../../public/{$fileName}.copy");
        }

        $headers = fgetcsv($file, 0, ';');
        fclose($file);
        $data = $serializer->decode(file_get_contents(\dirname(__DIR__)."/../../public/{$fileName}"), 'csv', [CsvEncoder::DELIMITER_KEY => ';']);
        $dataLen = count($data);

        return [$headers, $data, $dataLen];
    }

    /**
     * @param int $i
     * @param mixed $tempFile
     * @param string[] $headers
     * @param mixed $data
     * @param string $fileName
     * @return void
     */
    private function dumpRestOfTheFile(int $i, mixed $tempFile, array $headers, mixed $data, string $fileName): void
    {
        $lineOfError = $i + 1;
        echo "\033[32m Errore trovato sulla riga {$lineOfError} del csv\n";
        echo "Le prime {$i} righe del file csv sono state caricate correttamente\n";
        echo "Correggere la prima riga del file csv e rilanciare lo script\n \033[0m";

        fputcsv($tempFile, $headers, ';');

        $remainingRows = array_slice($data, $i);
        foreach ($remainingRows as $row) {
            fputcsv($tempFile, $row, ';');
        }
        fclose($tempFile);
        unlink(\dirname(__DIR__)."/../../public/{$fileName}");
        rename(\dirname(__DIR__)."/../../public/temp_{$fileName}", \dirname(__DIR__)."/../../public/{$fileName}");
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

    public function filesCleaner(string $fileName): void
    {
        unlink(\dirname(__DIR__)."/../../public/{$fileName}");
        rename(\dirname(__DIR__)."/../../public/temp_{$fileName}", \dirname(__DIR__)."/../../public/{$fileName}");
        unlink(\dirname(__DIR__)."/../../public/{$fileName}");
        rename(\dirname(__DIR__)."/../../public/{$fileName}.copy", \dirname(__DIR__)."/../../public/files/imported/{$fileName}");
    }
}
