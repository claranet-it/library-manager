<?php

namespace App\Tests\E2E;

use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Request;

class BooksApiTest extends \PHPUnit\Framework\TestCase
{

    //TODO: 1) Spostare $ip tra le variabili di ambiente
    //      3) 4 end point in una sola funzione per usare store e delete insieme e lasciare il db pulito?

    private $ip;
    private $client;

    protected function setUp(): void
    {
        $this->ip = '192.168.1.66';
        $this->client = new Client();
    }

    public function testItGetAllBooks() {
        $res = $this->client->request('GET', "http://$this->ip:8080/api/books?offset=0&limit=5");
        $quantity = count(json_decode($res->getBody()->getContents())->data);

        self::assertEquals(200, $res->getStatusCode());
        self::assertEquals(5, $quantity);
    }

    public function testItStoreGetUpdateAndDeleteBook() {

        //test store
        $headers = ['Content-Type' => 'application/json'];
        $body = '{
                    "title": "Libro di test",
                    "author": "Autore di test",
                    "price": 20.99,
                    "description": "Descrizione libro di test"
                }';
        $request = new Request('POST', "http://$this->ip:8080/api/books", $headers, $body);

        $res = $this->client->send($request);
        $id = json_decode($res->getBody()->getContents())->id;
        self::assertEquals(201, $res->getStatusCode());


        //test get book by id
        $res = $this->client->request('GET', "http://$this->ip:8080/api/books/$id");
        $title = json_decode($res->getBody()->getContents())->title;
        self::assertEquals(200, $res->getStatusCode());
        self::assertEquals('Libro di test', $title);

        //test update book
        $updatedBody = '{
                            "title": "Libro di test 2",
                            "author": "Autore di test",
                            "price": 20.99,
                            "description": "Descrizione libro di test"
                        }';

        $updatedRequest = new Request('PUT', "http://$this->ip:8080/api/books/$id", $headers, $updatedBody);
        $res = $this->client->send($updatedRequest);
        $updatedTitle = json_decode($res->getBody()->getContents())->title;
        self::assertEquals(200, $res->getStatusCode());
        self::assertEquals('Libro di test 2', $updatedTitle);

        //test delete book
        $res = $this->client->request('DELETE', "http://$this->ip:8080/api/books/$id");
        self::assertEquals(204, $res->getStatusCode());
    }

}