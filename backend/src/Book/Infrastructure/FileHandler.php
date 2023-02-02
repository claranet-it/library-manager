<?php

namespace App\Book\Infrastructure;

use Symfony\Component\Serializer\Encoder\CsvEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class FileHandler
{
    protected $serializer;
    private $delimiter;

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
        if (!file_exists($filePath . ".copy")) {
            copy($filePath, $filePath . ".copy");
        }

        $headers = fgetcsv($file, 0, ';');
        fclose($file);
        $data = $this->serializer->decode(file_get_contents($filePath), 'csv', [CsvEncoder::DELIMITER_KEY => $delimiter]);
        $dataLen = count($data);

        return [$headers, $data, $dataLen];
    }

    /**
     * @param int $i
     * @param mixed $tempFile
     * @param string[] $headers
     * @param mixed $data
     * @param string $filePath
     * @return void
     */
    public function dumpRestOfTheFile(int $i, mixed $tempFile, array $headers, mixed $data, string $filePath): void
    {
        echo "\033[31m Errore trovato sul file csv\n";
        echo "\033[31m Le prime {$i} righe del file csv sono state caricate correttamente\n";
        echo "\033[31m Correggere la prima riga del file csv e rilanciare lo script\n \033[0m";

        fputcsv($tempFile, $headers, ';');

        $remainingRows = array_slice($data, $i);
        foreach ($remainingRows as $row) {
            fputcsv($tempFile, $row, ';');
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
        rename($filePath . ".temp", $filePath);
        unlink($filePath);
        $destination = dirname($filePath) . "/files/imported/";
        if (!is_dir($destination)) {
            mkdir($destination, 0777, true);
        }
        rename($filePath . ".copy", $destination . basename($filePath));        
    }
}