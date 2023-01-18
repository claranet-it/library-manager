<?php

namespace App\Tests\E2E\Book;

use Symfony\Bundle\FrameworkBundle\KernelBrowser;

class UpdateBookTest extends \Symfony\Bundle\FrameworkBundle\Test\WebTestCase
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
                "description": "Test inserimento con campi mancanti"
            }';
        $this->client->request('POST', '/api/books', [], [], $headers, $body);
        $this->id = json_decode($this->client->getResponse()->getContent())->id;
    }

    public function testItUpdatesExistingBook(): void
    {
        $headers = ['CONTENT_TYPE' => 'application/json'];
        $body = '{
            "title": "Test Aggiornamento Libro",
            "author": "Autore di Prova",
            "price": 25.99,
            "description": "Test aggiornamento libro esistente"
        }';
        $this->client->request('PUT', "/api/books/$this->id", [], [], $headers, $body);
        $res = $this->client->getResponse();

        self::assertEquals(200, $res->getStatusCode());
    }

    public function testItHandlesInvalidIdUpdate(): void
    {
        $headers = ['CONTENT_TYPE' => 'application/json'];
        $body = '{
            "title": "Libro di Test",
            "author": "Autore di TEst",
            "price": 25.99,
            "description": "Test aggiornamento libro con id inesistente"
        }';
        $this->client->request('PUT', '/api/books/9999', [], [], $headers, $body);
        $res = $this->client->getResponse();

        self::assertEquals(404, $res->getStatusCode());
        self::assertEquals('Error: Book not found', json_decode($res->getContent())->error);
    }

    public function testItHandlesUpdateWithMissingFields(): void
    {
        $headers = ['CONTENT_TYPE' => 'application/json'];
        $body = '{
            "price": 25.99,
            "description": "Test aggiornamento libro con campi mancanti"
        }';

        $this->client->request('PUT', "/api/books/$this->id", [], [], $headers, $body);
        $res = $this->client->getResponse();

        self::assertEquals(400, $res->getStatusCode());
        self::assertEquals('Error: Invalid body format', json_decode($res->getContent())->error);
    }
}
