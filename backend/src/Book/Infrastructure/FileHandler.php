<?php

namespace App\Book\Infrastructure;

use Symfony\Component\Serializer\Encoder\CsvEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class FileHandler
{
    protected $serializer;

    public function __construct() 
        {
            $this->serializer = new Serializer([new ObjectNormalizer()], [new CsvEncoder()]); 
        }


    /**
     * @param mixed $file
     * @param string $fileName
     * @return mixed[]
     */
    public function csvToArray(mixed $file, string $fileName): array
    {
        if (!file_exists(\dirname(__DIR__)."/../../public/{$fileName}.copy")) {
            copy(\dirname(__DIR__)."/../../public/{$fileName}", \dirname(__DIR__)."/../../public/{$fileName}.copy");
        }

        $headers = fgetcsv($file, 0, ';');
        fclose($file);
        $data = $this->serializer->decode(file_get_contents(\dirname(__DIR__)."/../../public/{$fileName}"), 'csv', [CsvEncoder::DELIMITER_KEY => ';']);
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
    public function dumpRestOfTheFile(int $i, mixed $tempFile, array $headers, mixed $data, string $fileName): void
    {
        $lineOfError = $i + 1;
        echo "\033[31m Errore trovato sul file csv\n";
        echo "\033[31m Le prime {$i} righe del file csv sono state caricate correttamente\n";
        echo "\033[31m Correggere la prima riga del file csv e rilanciare lo script\n \033[0m";

        fputcsv($tempFile, $headers, ';');

        $remainingRows = array_slice($data, $i);
        foreach ($remainingRows as $row) {
            fputcsv($tempFile, $row, ';');
        }
        fclose($tempFile);
        unlink(\dirname(__DIR__)."/../../public/{$fileName}");
        rename(\dirname(__DIR__)."/../../public/temp_{$fileName}", \dirname(__DIR__)."/../../public/{$fileName}");
    }


    public function cleanFiles(string $fileName): void
    {
        unlink(\dirname(__DIR__)."/../../public/{$fileName}");
        rename(\dirname(__DIR__)."/../../public/temp_{$fileName}", \dirname(__DIR__)."/../../public/{$fileName}");
        unlink(\dirname(__DIR__)."/../../public/{$fileName}");
        $destination = \dirname(__DIR__) . "/../../public/files/imported/";
        if (!is_dir($destination)) {
            mkdir($destination, 0777, true);
        }
        rename(\dirname(__DIR__) . "/../../public/{$fileName}.copy", $destination . "{$fileName}");        
    }
}
