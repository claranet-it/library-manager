<?php

namespace App\Book\Infrastructure;

use Symfony\Component\Serializer\Encoder\CsvEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class CsvFileHandler
{
    private $serializer;
    private $delimiter = ';';

    public function __construct()
        {
            $this->serializer = new Serializer([new ObjectNormalizer()], [new CsvEncoder()]);
        }

    /**
     * @param string $filePath
     * @param string $delimiter
     * @return mixed[]
     */
    public function csvToArray(string $filePath, string $delimiter = ';'): array
    {
        $this->delimiter = $delimiter;
        $data = $this->serializer->decode(file_get_contents($filePath), 'csv', [CsvEncoder::DELIMITER_KEY => $delimiter]);
        $headers = array_keys($data[0]);
        $dataLen = count($data);
        return [$headers, $data, $dataLen];
    }

    /**
     * @param mixed $row
     * @param string $filePath
     * @return void
     */
    public function addNotStoredRowInCsvFile(mixed $row, string $filePath): void
    {   
        $tempFile = fopen(($filePath) . ".not_stored_rows", 'a+');
        fputcsv($tempFile, $row, $this->delimiter);
        fclose($tempFile);

    }

        /**
     * @param mixed $actualHeaders
     * @param mixed $expectedHeaders
     * @return bool
     */
    public function verifyHeaders(mixed $actualHeaders, mixed $expectedHeaders): bool
    {
        // TODO: implement functionality to verify headers
    }

}