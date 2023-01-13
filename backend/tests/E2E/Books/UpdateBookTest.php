<?php

namespace App\Tests\E2E\Books;


use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class UpdateBookTest extends WebTestCase
{

    private $client;

/*    protected static function getKernelClass(): string
    {
        return 'App\Kernel';
    }*/
    protected function setUp(): void
    {
        $this->client = static::createClient();
    }



    public function testItUpdatesExistingBook()
    {
        $headers = ['Content-Type' => 'application/json'];
        $body = '{
            "title": "Test Aggiornamento Libro",
            "author": "Autore di Prova",
            "price": 25.99,
            "description": "Test aggiornamento libro esistente"
        }';
        $this->client->request('PUT', "/api/books/1",[],[], $headers, $body);
        $res = $this->client->getResponse();

        self::assertEquals(200, $res->getStatusCode());
    }

    public function testItHandlesInvalidIdUpdate()
    {
        $headers = ['Content-Type' => 'application/json'];
        $body = '{
            "title": "Libro di Test",
            "author": "Autore di TEst",
            "price": 25.99,
            "description": "Test aggiornamento libro con id inesistente"
        }';
        $this->client->request('PUT', "/api/books/9999",[],[], $headers, $body);
        $res = $this->client->getResponse();

        self::assertEquals(404, $res->getStatusCode());
        self::assertEquals('Error: Book not found', json_decode($res->getContent())->error);
    }

    public function testItHandlesUpdateWithMissingFields()
    {
        $headers = ['Content-Type' => 'application/json'];
        $body = '{
            "price": 25.99,
            "description": "Test aggiornamento libro con campi mancanti"
        }';

        $this->client->request('PUT', "/api/books/1",[],[], $headers, $body);
        $res = $this->client->getResponse();

        self::assertEquals(400, $res->getStatusCode());
        self::assertEquals('Error: Invalid body format', json_decode($res->getContent())->error);
    }
}