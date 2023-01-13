<?php

namespace App\Tests\E2E\Books;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class StoreBookTest extends WebTestCase
{
    private $client;

    protected function setUp(): void
    {
        $this->client = static::createClient();
    }

/*    protected static function getKernelClass(): string
    {
        return 'App\Kernel';
    }*/

    public function testItHandlesStoreWithMissingFields()
    {
        $headers = ['Content-Type' => 'application/json'];
        $body = '{
                "author": "Autore di test",
                "price": 20.99,
                "description": "Test inserimento con campi mancanti"
            }';
        $this->client->request('POST', '/api/books', [], [], $headers, $body);
        $res = $this->client->getResponse();
        self::assertEquals(400, $res->getStatusCode());
        self::assertEquals('Error: Invalid body format', json_decode($res->getContent())->error);
    }

    public function testItHandlesStoreWithInvalidContentType()
    {
        $headers = ['Content-Type' => 'text/plain'];
        $body = '{
            "title": "Libro di Prova",
            "author": "Autore di Prova",
            "price": 20.99,
            "description": "Test inserimento libro con content type errato"
        }';
        $this->client->request('POST', '/api/books', [], [], $headers, $body);
        $res = $this->client->getResponse();
        self::assertEquals(400, $res->getStatusCode());
        self::assertEquals('Error: Invalid request format', json_decode($res->getContent())->error);
    }

    public function testItStoresNewBook()
    {
        $headers = ['Content-Type' => 'application/json'];
        $body = '{
            "title": "Inserimento Libro di Test",
            "author": "Autore di Test",
            "price": 20.99,
            "description": "Test inserimento nuovo libro"
        }';
        $this->client->request('POST', '/api/books', [], [], $headers, $body);
        $res = $this->client->getResponse();
        self::assertEquals(201, $res->getStatusCode());
    }
}