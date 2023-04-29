<?php

namespace App\Tests\E2E\Book;

use App\Book\Domain\Entity\Book;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Uid\Uuid;

class UpdateBookTest extends \Symfony\Bundle\FrameworkBundle\Test\WebTestCase
{
    private KernelBrowser $client;
    private string $id;
    private EntityManagerInterface $manager;

    protected function setUp(): void
    {
        $this->client = static::createClient();
        $this->manager = static::getContainer()->get(EntityManagerInterface::class);
        $book = new Book(
            Uuid::v4(),
            'Titolo di test',
            'Autore di test',
            20.99,
            'Test inserimento'
        );

        $this->manager->persist($book);
        $this->manager->flush();
        $this->id = $book->getId()->__toString();
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

        $this->assertResponseStatusCodeSame(Response::HTTP_OK);
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
        $this->client->request('PUT', '/api/books/c53ed316-6240-435c-9406-c03259b173cd', [], [], $headers, $body);

        $this->assertResponseStatusCodeSame(Response::HTTP_NOT_FOUND);
        $res = $this->client->getResponse();
        self::assertNotFalse($res->getContent());
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

        $this->assertResponseStatusCodeSame(Response::HTTP_BAD_REQUEST);
        $res = $this->client->getResponse();
        self::assertNotFalse($res->getContent());
        self::assertEquals('Error: Invalid body format', json_decode($res->getContent())->error);
    }
}
