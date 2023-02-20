<?php

namespace App\Book\Infrastructure;

use App\Book\Domain\Entity\Book;
use Symfony\Component\Serializer\Encoder\CsvEncoder;
use Symfony\Component\Serializer\SerializerInterface;


class CsvFileHandler
{

    public function __construct(private SerializerInterface $serializerInterface)
    {
    }

    public function csvToBookList(string $filePath, string $delimiter = ';'): array
    {
        $data = file_get_contents($filePath);
        $books = $this->serializerInterface->deserialize($data, Book::class.'[]', 'csv', [CsvEncoder::DELIMITER_KEY => $delimiter]);
        return $books;
    }
}
