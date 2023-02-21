<?php

namespace App\Tests\E2E\Book;

use App\Book\Domain\Entity\Book;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class DeleteBookTest extends WebTestCase
{
    private KernelBrowser $client;
    private int $id;
    private EntityManagerInterface|null $manager;

    protected function setUp(): void
    {
        $this->client = static::createClient();
        $this->manager = static::getContainer()->get(EntityManagerInterface::class);
        $book = new Book(
            'Titolo di test',
            'Autore di test',
            20.99,
            'Test inserimento'
        );

        $this->manager->persist($book);
        $this->manager->flush();
        $this->id = $book->getId();
    }

    public function testItDeletesExistingBook(): void
    {
        $this->client->request('DELETE', "/api/books/$this->id");
        $res = $this->client->getResponse();
        self::assertEquals(204, $res->getStatusCode());
    }

    public function testItHandlesDeleteNonExistentBook(): void
    {
        $this->client->request('DELETE', '/api/books/9999');
        $res = $this->client->getResponse();
        self::assertEquals(404, $res->getStatusCode());
        self::assertEquals('Error: Book not found', json_decode($res->getContent())->error);
    }
}
