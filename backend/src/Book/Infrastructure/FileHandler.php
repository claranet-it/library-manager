<?php

namespace App\Book\Infrastructure;

use Symfony\Component\Serializer\Encoder\CsvEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class FileHandler
{
    protected $serializer;
    private $delimiter = ';';

    public function __construct() 
        {
            $this->serializer = new Serializer([new ObjectNormalizer()], [new CsvEncoder()]); 
        }

    /**
     * @param mixed $file
     * @param string $filePath
     * @param string $delimiter
     * @return mixed[]
     */
    public function csvToArray(mixed $file, string $filePath, string $delimiter = ';'): array
    {   
        $this->delimiter = $delimiter;
        $data = $this->serializer->decode(file_get_contents($filePath), 'csv', [CsvEncoder::DELIMITER_KEY => $delimiter]);
        $headers = array_keys($data[0]);
        $dataLen = count($data);
        return [$headers, $data, $dataLen];
    }

    /**
     * @param int $i
     * @param string[] $headers
     * @param mixed $data
     * @param string $filePath
     * @return void
     */
    public function removeStoredRowsAndUpdateCsvFile(int $i, array $headers, mixed $data, string $filePath): void
    {   
        $tempFile = fopen(($filePath) . ".temp", 'w');
        fputcsv($tempFile, $headers, $this->delimiter);

        $notStoredRows = array_slice($data, $i);

        foreach ($notStoredRows as $row) {
            fputcsv($tempFile, $row, $this->delimiter);
        }

        fclose($tempFile);
        unlink($filePath);
        rename($filePath . ".temp", $filePath);
    }

    /**
     * @param string $filePath
     * @return void
     */
    public function cleanFiles(string $filePath): void
    {
        unlink($filePath);
        $destination = dirname($filePath) . "/files/imported/";
        if (!is_dir($destination)) {
            mkdir($destination, 0777, true);
        }
        rename($filePath . ".copy", $destination . basename($filePath));        
    }
}