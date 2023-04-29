<?php

namespace App\Tests\E2E\Book;

use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Response;

class GetAllBooksTest extends WebTestCase
{
    private KernelBrowser $client;

    protected function setUp(): void
    {
        $this->client = static::createClient();
    }

    public function testItGetsAllBooks(): void
    {
        $this->client->request('GET', '/api/books');
        $this->assertResponseStatusCodeSame(Response::HTTP_OK);
    }
}
