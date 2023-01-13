<?php

namespace App\Tests\E2E\Books;

use GuzzleHttp\Client;

class GetBookByIdTest extends \PHPUnit\Framework\TestCase
{

    //TODO: 1) Spostare $ip tra le variabili di ambiente

    private $ip;
    private $client;

    protected function setUp(): void
    {
        $this->ip = '192.168.1.109';
        $this->client = new Client([
            'base_uri' => "http://{$this->ip}:8080",
            'http_errors' => false,
        ]);
    }

    public function testItGetsBookById()
    {
        $res = $this->client->get('/api/books/1');
        self::assertEquals(200, $res->getStatusCode());
    }

    public function testItHandlesGetNonExistentBook()
    {
        $res = $this->client->get("/api/books/9999");
        self::assertEquals(404, $res->getStatusCode());
        self::assertEquals('Error: Book not found', json_decode($res->getBody()->getContents())->error);
    }
}