<?php

namespace App\Tests\E2E\Books;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class GetBookByIdTest extends WebTestCase
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


    public function testItGetsBookById()
    {
        $this->client->request("GET", '/api/books/1');
        $res = $this->client->getResponse();
        self::assertEquals(200, $res->getStatusCode());
    }

    public function testItHandlesGetNonExistentBook()
    {
        $this->client->request("GET", '/api/books/999');
        $res = $this->client->getResponse();
        self::assertEquals(404, $res->getStatusCode());
        self::assertEquals('Error: Book not found', json_decode($res->getContent())->error);
    }
}