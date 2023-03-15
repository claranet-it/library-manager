<?php

namespace App\Tests\E2E\Book;

use Symfony\Bundle\FrameworkBundle\KernelBrowser;

class GetBookByIdTest extends \Symfony\Bundle\FrameworkBundle\Test\WebTestCase
{
    private KernelBrowser $client;
    private string $id;

    protected function setUp(): void
    {
        $this->client = static::createClient();
        $headers = ['CONTENT_TYPE' => 'application/json'];
        $body = '{
                "title": "Titolo di test",
                "author": "Autore di test",
                "price": 20.99,
                "description": "Test inserimento"
            }';
        $this->client->request('POST', '/api/books', [], [], $headers, $body);
        $content = $this->client->getResponse()->getContent();
        if ($content) {
            $this->id = json_decode($content)->id;
        }
    }

    public function testItGetsBookById(): void
    {
        $this->client->request('GET', "/api/books/$this->id");
        $res = $this->client->getResponse();
        self::assertEquals(200, $res->getStatusCode());
    }

    public function testItHandlesGetNonExistentBook(): void
    {
        $this->client->request('GET', '/api/books/74a1ddc4-4373-47cf-a3e7-c4c7c79814ad');
        $res = $this->client->getResponse();
        self::assertEquals(404, $res->getStatusCode());
        self::assertNotFalse($res->getContent());
        self::assertEquals('Error: Book not found', json_decode($res->getContent())->error);
    }
}
