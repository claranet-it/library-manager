<?php

namespace App\Book\Infrastructure;

use App\Book\Application\DTO\BookDTO;
use Symfony\Component\Serializer\Encoder\CsvEncoder;
use Symfony\Component\Serializer\SerializerInterface;


class CsvFileHandler
{

    public function __construct(private SerializerInterface $serializerInterface)
    {
    }

    /**
     * @param string $filePath
     * @param string $delimiter
     * @return BookDTO[]
     */
    public function csvToBookList(string $filePath, string $delimiter = ';'): array
    {
        $data = file_get_contents($filePath);
        return $this->serializerInterface->deserialize($data, BookDTO::class.'[]', 'csv', [CsvEncoder::DELIMITER_KEY => $delimiter]);
    }
}
