<?php

namespace App\Tests\E2E\Book;

use App\Book\Domain\Entity\Book;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\KernelBrowser;

class UpdateBookTest extends \Symfony\Bundle\FrameworkBundle\Test\WebTestCase
{
    private KernelBrowser $client;
    private int $id;
    private EntityManagerInterface|null $manager;

    protected function setUp(): void
    {
        $this->client = static::createClient();
        $this->manager = static::getContainer()->get(EntityManagerInterface::class);
        $book = new Book();
        $book->setDescription('Test inserimento')
            ->setTitle('Titolo di test')
            ->setAuthor('Autore di test')
            ->setPrice(20.99);

        $this->manager->persist($book);
        $this->manager->flush();
        $this->id = $book->getId();
    }

    public function testItUpdatesExistingBook(): void
    {
        $headers = ['CONTENT_TYPE' => 'application/json'];
        $body = '{
            "title": "Test Aggiornamento Libro",
            "author": "Autore di Prova",
            "price": 25.99,
            "description": "Test aggiornamento libro esistente"
        }';
        $this->client->request('PUT', "/api/books/$this->id", [], [], $headers, $body);
        $res = $this->client->getResponse();

        self::assertEquals(200, $res->getStatusCode());
    }

    public function testItHandlesInvalidIdUpdate(): void
    {
        $headers = ['CONTENT_TYPE' => 'application/json'];
        $body = '{
            "title": "Libro di Test",
            "author": "Autore di TEst",
            "price": 25.99,
            "description": "Test aggiornamento libro con id inesistente"
        }';
        $this->client->request('PUT', '/api/books/9999', [], [], $headers, $body);
        $res = $this->client->getResponse();

        self::assertEquals(404, $res->getStatusCode());
        self::assertEquals('Error: Book not found', json_decode($res->getContent())->error);
    }

    public function testItHandlesUpdateWithMissingFields(): void
    {
        $headers = ['CONTENT_TYPE' => 'application/json'];
        $body = '{
            "price": 25.99,
            "description": "Test aggiornamento libro con campi mancanti"
        }';

        $this->client->request('PUT', "/api/books/$this->id", [], [], $headers, $body);
        $res = $this->client->getResponse();

        self::assertEquals(400, $res->getStatusCode());
        self::assertEquals('Error: Invalid body format', json_decode($res->getContent())->error);
    }
}
