<?php

namespace App\Tests\E2E\Books;

use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Request;

class StoreBookTest extends \PHPUnit\Framework\TestCase
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

    public function testItHandlesStoreWithMissingFields()
    {
        $headers = ['Content-Type' => 'application/json'];
        $body = '{
                "author": "Autore di test",
                "price": 20.99,
                "description": "Test inserimento con campi mancanti"
            }';
        $request = new Request('POST', "http://$this->ip:8080/api/books", $headers, $body);

        $res = $this->client->send($request);
        self::assertEquals(400, $res->getStatusCode());
        self::assertEquals('Error: Invalid body format', json_decode($res->getBody()->getContents())->error);
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
        $request = new Request('POST', "http://$this->ip:8080/api/books", $headers, $body);
        $res = $this->client->send($request);
        self::assertEquals(400, $res->getStatusCode());
        self::assertEquals('Error: Invalid request format', json_decode($res->getBody()->getContents())->error);
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
        $request = new Request('POST', "http://$this->ip:8080/api/books", $headers, $body);

        $res = $this->client->send($request);
        self::assertEquals(201, $res->getStatusCode());
    }
}