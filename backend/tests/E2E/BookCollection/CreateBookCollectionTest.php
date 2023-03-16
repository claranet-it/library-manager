<?php

namespace App\Tests\E2E\BookCollection;

use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class CreateBookCollectionTest extends WebTestCase
{
    private KernelBrowser $client;

    protected function setUp(): void
    {
        $this->client = static::createClient();
    }

    public function testItCreatesNewBookCollection(): void
    {
        $headers = ['CONTENT_TYPE' => 'application/json'];
        $body = '{
                  "name": "Collana di test",
                  "description": "A collection of my favorite books",
                  "books": [
                    "74a1ddc4-4373-47cf-a3e7-c4c7c79814ad",
                    "e2a9e13f-1931-4221-8e4c-4cb4a4ba4d1b",
                  ]
                }
        ';
        $this->client->xmlHttpRequest('POST', '/api/collections', [], [], $headers, $body);
        $res = $this->client->getResponse();
        self::assertEquals(201, $res->getStatusCode());
    }
}
