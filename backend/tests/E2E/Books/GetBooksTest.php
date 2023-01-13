<?php

namespace App\Tests\E2E\Books;

use GuzzleHttp\Client;

class GetBooksTest extends \PHPUnit\Framework\TestCase
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

    public function testItGetsAllBooks()
    {
        $res = $this->client->get('/api/books?offset=0&limit=5');
        $quantity = count(json_decode($res->getBody()->getContents())->data);

        self::assertEquals(200, $res->getStatusCode());
        self::assertEquals(5, $quantity);
    }

}