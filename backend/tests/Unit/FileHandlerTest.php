<?php

namespace App\Book\Infrastructure;


use PHPUnit\Framework\TestCase;

class FileHandlerTest extends TestCase
{
    private $fileHandler;
    private $filePath;
    private $delimiter = ';';

    protected function setUp(): void
    {
        $this->fileHandler = new FileHandler();
        $this->filePath = dirname(__FILE__) . '/sample.csv';
        
        // Create sample csv file and write sample data
        $sampleData = [
            ['author' => 'John Doe', 'title' => 'Sample Book 1', 'price' => '10.99', 'description' => 'This is a sample book description.'],
            ['author' => 'Jane Doe', 'title' => 'Sample Book 2', 'price' => '15.99', 'description' => 'This is another sample book description.']
        ];
        $file = fopen($this->filePath, 'w');
        fputcsv($file, array_keys($sampleData[0]), $this->delimiter);
        foreach ($sampleData as $row) {
            fputcsv($file, $row, $this->delimiter);
        }
        fclose($file);
    }

    public function testCsvToArray()
    {
        $file = fopen($this->filePath, 'r');
        [$headers, $data, $dataLen] = $this->fileHandler->csvToArray($file, $this->filePath);
        fclose($file);
        $this->assertEquals([0 => 'author', 1 => 'title', 2 => 'price', 3 => 'description'], $headers);
        $this->assertEquals(['author' => 'John Doe', 'title' => 'Sample Book 1', 'price' => '10.99', 'description' => 'This is a sample book description.'], $data[0]);
        $this->assertEquals(2, $dataLen);
    }

    public function testRemoveStoredRowsAndUpdateCsvFile()
    {
        $file = fopen($this->filePath, 'r');

        $data = [
            ['price' => '10.99', 'author' => 'John Doe', 'title' => 'Sample Book 1', 'description' => 'This is a sample book description.'],
            ['price' => '15.99', 'author' => 'Jane Doe', 'title' => 'Sample Book 2', 'description' => 'This is another sample book description.']
        ];
        $headers = [0 => 'price', 1 => 'author', 2 => 'title', 3=> 'description'];
        
        $this->fileHandler->removeStoredRowsAndUpdateCsvFile(1, $headers, $data, $this->filePath);

        $result = $this->fileHandler->csvToArray($file, $this->filePath);
        $this->assertEquals($headers, $result[0]);
        $this->assertEquals([$data[1]], $result[1]);
        $this->assertCount(1, $result[1]);

    }


    protected function tearDown(): void
    {
        // Remove the sample csv file
        unlink($this->filePath);
    }
}
