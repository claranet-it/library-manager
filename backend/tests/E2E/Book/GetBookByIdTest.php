<?php

namespace App\Tests\E2E\Book;

class GetBookByIdTest extends \Symfony\Bundle\FrameworkBundle\Test\WebTestCase
{
    private $client;
    private $id;

    protected function setUp(): void
    {
        $this->client = static::createClient();
        $headers = ['CONTENT_TYPE' => 'application/json'];
        $body = '{
                "title": "Titolo di test",
                "author": "Autore di test",
                "price": 20.99,
                "description": "Test inserimento"
            }';
        $this->client->request('POST', '/api/books', [], [], $headers, $body);
        $this->id = json_decode($this->client->getResponse()->getContent())->id;
    }

    public function testItGetsBookById()
    {
        $this->client->request("GET", "/api/books/$this->id");
        $res = $this->client->getResponse();
        self::assertEquals(200, $res->getStatusCode());
    }

    public function testItHandlesGetNonExistentBook()
    {
        $this->client->request("GET", '/api/books/999');
        $res = $this->client->getResponse();
        self::assertEquals(404, $res->getStatusCode());
        self::assertEquals('Error: Book not found', json_decode($res->getContent())->error);
    }
}