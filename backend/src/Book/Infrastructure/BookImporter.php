<?php

namespace App\Book\Infrastructure;

use App\Book\Application\StoreBook;
use App\Book\Domain\Entity\Book;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\HttpKernel\HttpCache\Store;
use Symfony\Component\Serializer\Encoder\CsvEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class BookImporter
{

    public function __construct(
        private readonly JsonSchemaValidator $jsonSchemaValidator,
        private readonly EntityManagerInterface $em,
        private readonly StoreBook $storeBook
    ) { }

    public function import(OutputInterface $output, string $fileName): void
    {   
        $serializer = new Serializer([new ObjectNormalizer()], [new CsvEncoder()]);
        $file = fopen(\dirname(__DIR__) . "/../../public/{$fileName}", 'r');
        $headers = fgetcsv($file, 0, ';');
        fclose($file);
        $data = $serializer->decode(file_get_contents(\dirname(__DIR__) . "/../../public/{$fileName}"), 'csv', [CsvEncoder::DELIMITER_KEY => ';'] );
        $dataLen = count($data);
        try {
            $this->em->getConnection()->beginTransaction();
            $tempFile = fopen(\dirname(__DIR__) . "/../../public/temp_{$fileName}", 'w');
            for ($i = 0; $i < $dataLen; $i++) {
                if(is_numeric($data[$i]['price'])){
                    $data[$i]['price'] = floatval($data[$i]['price']);
                }
                $isValid = $this->jsonSchemaValidator->validate(json_encode($data[$i]), $this->jsonSchemaValidator->requestBookJsonSchema());
                if ($isValid){
                    $this->storeBook->storeBook(
                        $data[$i]['price'],
                        $data[$i]['author'],
                        $data[$i]['title'],
                        $data[$i]['description']
                    );
                }
                else {
                    throw new Exception();
                }
            }
            $this->em->getConnection()->commit();
            fclose($tempFile);
            unlink(\dirname(__DIR__) . "/../../public/{$fileName}");
            rename(\dirname(__DIR__) . "/../../public/temp_{$fileName}", \dirname(__DIR__) . "/../../public/{$fileName}");
            unlink(\dirname(__DIR__) . "/../../public/{$fileName}");
            echo("File csv caricato completamente\n");

        }
        catch (\Throwable $e) {
            $this->em->getConnection()->commit();
            $this->dumpRestOfTheFile($i, $tempFile, $headers, $data, $fileName);
        }
    }

    private function dumpRestOfTheFile(int $i, bool $tempFile, bool|array $headers, mixed $data, string $fileName): void
    {
        echo("Errore trovato sulla riga {$i}+1 del csv\n");
        echo("Le prime {$i} righe del file csv sono state caricate correttamente\n");
        echo("Correggere la prima riga del file csv e rilanciare lo script\n");
        fputcsv($tempFile, $headers, ';');
        $remainingRows = array_slice($data, $i);
        foreach ($remainingRows as $row) {
            fputcsv($tempFile, $row, ';');
        }
        fclose($tempFile);
        unlink(\dirname(__DIR__) . "/../../public/{$fileName}");
        rename(\dirname(__DIR__) . "/../../public/temp_{$fileName}", \dirname(__DIR__) . "/../../public/{$fileName}");
    }

}