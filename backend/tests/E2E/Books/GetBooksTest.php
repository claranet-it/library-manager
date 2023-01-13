<?php

namespace App\Tests\E2E\Books;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class GetBooksTest extends WebTestCase
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


    public function testItGetsAllBooks()
    {
        $this->client->request("GET", '/api/books?offset=0&limit=5');
        $res = $this->client->getResponse();
        var_dump(json_decode($res->getContent()));
        //$quantity = count(json_decode($res->getContent())->data);


        self::assertEquals(200, $res->getStatusCode());
        self::assertEquals(5, $quantity);
    }

}