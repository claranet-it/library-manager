<?php

namespace App\Tests\E2E\Book;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class GetAllBooksTest extends WebTestCase
{
    private $client;

    protected function setUp(): void
    {
        $this->client = static::createClient();
    }

    public function testItGetsAllBooks()
    {
        $this->client->request("GET", '/api/books');
        $res = $this->client->getResponse();
        self::assertEquals(200, $res->getStatusCode());
    }
}