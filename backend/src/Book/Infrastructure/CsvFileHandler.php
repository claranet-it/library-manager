<?php

namespace App\Book\Infrastructure;

use App\Book\Domain\Entity\Book;
use Symfony\Component\Serializer\Encoder\CsvEncoder;
use Symfony\Component\Serializer\Normalizer\ArrayDenormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class CsvFileHandler
{
    private $serializer;

    public function __construct()
    {
        $normalizers = [new ObjectNormalizer(), new ArrayDenormalizer()];
        $encoders = [new CsvEncoder()];
        $this->serializer = new Serializer($normalizers, $encoders);
    }

    public function csvToBookList(string $filePath, string $delimiter = ';'): array
    {
        $data = file_get_contents($filePath);
        $books = $this->serializer->deserialize($data, Book::class.'[]', 'csv', [CsvEncoder::DELIMITER_KEY => $delimiter]);

        return $books;
    }
}
