<?php

namespace App\Tests\E2E\Books;

use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Request;

class UpdateBookTest extends \PHPUnit\Framework\TestCase
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


    public function testItUpdatesExistingBook()
    {
        $headers = ['Content-Type' => 'application/json'];
        $body = '{
            "title": "Test Aggiornamento Libro",
            "author": "Autore di Prova",
            "price": 25.99,
            "description": "Test aggiornamento libro esistente"
        }';
        $request = new Request('PUT', "http://$this->ip:8080/api/books/1", $headers, $body);

        $res = $this->client->send($request);
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
        $request = new Request('PUT', "http://$this->ip:8080/api/books/9999", $headers, $body);

        $res = $this->client->send($request);
        self::assertEquals(404, $res->getStatusCode());
        self::assertEquals('Error: Book not found', json_decode($res->getBody()->getContents())->error);
    }

    public function testItHandlesUpdateWithMissingFields()
    {
        $headers = ['Content-Type' => 'application/json'];
        $body = '{
            "price": 25.99,
            "description": "Test aggiornamento libro con campi mancanti"
        }';
        $request = new Request('PUT', "http://$this->ip:8080/api/books/1", $headers, $body);

        $res = $this->client->send($request);
        self::assertEquals(400, $res->getStatusCode());
        self::assertEquals('Error: Invalid body format', json_decode($res->getBody()->getContents())->error);
    }
}