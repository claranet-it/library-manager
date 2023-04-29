<?php

namespace App\Tests\E2E\Book;

use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Response;

class StoreBookTest extends WebTestCase
{
    private KernelBrowser $client;

    protected function setUp(): void
    {
        $this->client = static::createClient();
    }

    public function testItHandlesStoreWithMissingFields(): void
    {
        $headers = ['CONTENT_TYPE' => 'application/json'];
        $body = '{
                "author": "Autore di test",
                "price": 20.99,
                "description": "Test inserimento con campi mancanti"
            }';
        $this->client->request('POST', '/api/books', [], [], $headers, $body);
        $this->assertResponseStatusCodeSame(Response::HTTP_BAD_REQUEST);
        $res = $this->client->getResponse();
        self::assertNotFalse($res->getContent());
        self::assertEquals('Error: Invalid body format', json_decode($res->getContent())->error);
    }

    public function testItHandlesStoreWithInvalidContentType(): void
    {
        $headers = ['CONTENT_TYPE' => 'text/plain'];
        $body = '{
            "title": "Libro di Prova",
            "author": "Autore di Prova",
            "price": 20.99,
            "description": "Test inserimento libro con content type errato"
        }';
        $this->client->request('POST', '/api/books', [], [], $headers, $body);
        $this->assertResponseStatusCodeSame(Response::HTTP_BAD_REQUEST);
        $res = $this->client->getResponse();
        self::assertNotFalse($res->getContent());
        self::assertEquals('Error: Invalid request format', json_decode($res->getContent())->error);
    }

    public function testItStoresNewBook(): void
    {
        $headers = ['CONTENT_TYPE' => 'application/json'];
        $body = '{
            "title": "Inserimento Libro di Test",
            "author": "Autore di Test",
            "price": 20.99,
            "description": "Test inserimento nuovo libro"
        }';
        $this->client->request('POST', '/api/books', [], [], $headers, $body);
        $this->assertResponseStatusCodeSame(Response::HTTP_CREATED);
    }
}
