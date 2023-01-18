<?php

namespace App\Tests\E2E\Book;

use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class DeleteBookTest extends WebTestCase
{
    private KernelBrowser $client;
    private int $id;

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

    public function testItDeletesExistingBook(): void
    {
        $this->client->request('DELETE', "/api/books/$this->id");
        $res = $this->client->getResponse();
        self::assertEquals(204, $res->getStatusCode());
    }

    public function testItHandlesDeleteNonExistentBook(): void
    {
        $this->client->request('DELETE', '/api/books/9999');
        $res = $this->client->getResponse();
        self::assertEquals(404, $res->getStatusCode());
        self::assertEquals('Error: Book not found', json_decode($res->getContent())->error);
    }
}
