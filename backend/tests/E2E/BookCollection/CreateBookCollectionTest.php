<?php

namespace App\Tests\E2E\BookCollection;

use App\Book\Domain\Entity\Book;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\Uid\Uuid;

class CreateBookCollectionTest extends WebTestCase
{
    private KernelBrowser $client;
    private string $id;
    private string $id2;

    protected function setUp(): void
    {
        $this->client = static::createClient();
        /** @var EntityManagerInterface $manager */
        $manager = static::getContainer()->get(EntityManagerInterface::class);
        $book = new Book(
            Uuid::v4(),
            'Libro Collana di test',
            'Autore per collana di test',
            20.99,
            'Test inserimento'
        );

        $manager->persist($book);
        $manager->flush();
        $this->id = $book->getId()->__toString();

        $book2 = new Book(
            Uuid::v4(),
            'Libro 2 Collana di test',
            'Autore 2 per collana di test',
            20.99,
            'Test inserimento'
        );

        $manager->persist($book2);
        $manager->flush();
        $this->id2 = $book2->getId()->__toString();
    }

    public function testItCreatesNewBookCollection(): void
    {
        $headers = ['CONTENT_TYPE' => 'application/json'];
        $body = json_encode([
                  'name' => 'Collana di test',
                  'description' => 'A collection of my favorite books',
                  'books' => [
                    $this->id,
                    $this->id2,
                  ],
                ]);
        $this->client->xmlHttpRequest('POST', '/api/collections', [], [], $headers, $body);
        $res = $this->client->getResponse();
        self::assertEquals(201, $res->getStatusCode());
    }

    public function testItReturnsErrorBecauseCollectionsMustHaveAtLeastTwoBooks(): void
    {
        $headers = ['CONTENT_TYPE' => 'application/json'];
        $body = json_encode([
            'name' => 'Collana di test',
            'description' => 'A collection of my favorite books',
            'books' => [
                $this->id,
            ],
        ]);
        $this->client->xmlHttpRequest('POST', '/api/collections', [], [], $headers, $body);
        $res = $this->client->getResponse();
        self::assertEquals(400, $res->getStatusCode());
    }

    public function testItReturnsErrorBecauseCollectionsBookDoesNotExist(): void
    {
        $headers = ['CONTENT_TYPE' => 'application/json'];
        $body = json_encode([
            'name' => 'Collana di test',
            'description' => 'A collection of my favorite books',
            'books' => [
                $this->id,
                $this->id2,
                '74a1ddc4-4373-47cf-a3e7-c4c7c79814ad'
            ],
        ]);
        $this->client->xmlHttpRequest('POST', '/api/collections', [], [], $headers, $body);
        $res = $this->client->getResponse();
        self::assertEquals(400, $res->getStatusCode());
    }
}
