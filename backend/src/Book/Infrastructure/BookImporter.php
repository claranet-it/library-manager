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

    public function import(OutputInterface $output): void
    {
        $serializer = new Serializer([new ObjectNormalizer()], [new CsvEncoder()]);
        $data = $serializer->decode(file_get_contents(\dirname(__DIR__) . '/../../public/books.csv'), 'csv', [CsvEncoder::DELIMITER_KEY => ';'] );
        try {
            $this->em->getConnection()->beginTransaction();
            foreach ($data as $row) {
                $this->storeBook->storeBook(
                    $row['price'],
                    $row['author'],
                    $row['title'],
                    $row['description']
                );
            }
            $this->em->getConnection()->commit();
        }
        catch (\Throwable $e) {
            var_dump('exception');
            $this->em->getConnection()->rollBack();
        }
    }

}