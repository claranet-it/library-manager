<?php

namespace App\Tests\E2E\Book;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class DeleteBookTest extends WebTestCase
{
    private $client;

    protected function setUp(): void
    {
        $this->client = static::createClient();
    }

    public function testItDeletesExistingBook()
    {
        $this->client->request('DELETE', '/api/books/1');
        $res = $this->client->getResponse();
        self::assertEquals(204, $res->getStatusCode());
    }

    public function testItHandlesDeleteNonExistentBook()
    {
        $this->client->request('DELETE', '/api/books/9999');
        $res = $this->client->getResponse();
        self::assertEquals(404, $res->getStatusCode());
        self::assertEquals('Error: Book not found', json_decode($res->getContent())->error);
    }
}