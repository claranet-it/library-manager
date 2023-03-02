<?php

namespace App\Book\Infrastructure;

use App\Book\Application\DTO\BookDTO;
use Symfony\Component\Filesystem\Exception\FileNotFoundException;
use Symfony\Component\Serializer\Encoder\CsvEncoder;
use Symfony\Component\Serializer\SerializerInterface;

class CsvFileHandler
{
    public function __construct(private SerializerInterface $serializerInterface)
    {
    }

    /**
     * @return BookDTO[]
     */
    public function csvToBookList(string $filePath, string $delimiter = ';'): array
    {
        $data = @file_get_contents($filePath);
        if (false === $data) {
            throw new FileNotFoundException('Invalid file path');
        }

        return $this->serializerInterface->deserialize($data, BookDTO::class.'[]', 'csv', [CsvEncoder::DELIMITER_KEY => $delimiter]);
    }
}
