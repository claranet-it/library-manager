<?php

namespace App\Tests\E2E\Book;

use App\Book\Domain\Entity\Book;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Uid\Uuid;

class DeleteBookTest extends WebTestCase
{
    private KernelBrowser $client;
    private Uuid $id;

    protected function setUp(): void
    {
        $this->client = static::createClient();
        /** @var EntityManagerInterface $manager */
        $manager = static::getContainer()->get(EntityManagerInterface::class);
        $book = new Book(
            Uuid::v4(),
            'Titolo di test',
            'Autore di test',
            20.99,
            'Test inserimento'
        );

        $manager->persist($book);
        $manager->flush();
        $this->id = $book->getId();
    }

    public function testItDeletesExistingBook(): void
    {
        $this->client->request('DELETE', "/api/books/$this->id");
        $this->assertResponseStatusCodeSame(Response::HTTP_NO_CONTENT);
    }

    public function testItHandlesDeleteNonExistentBook(): void
    {
        $this->client->request('DELETE', '/api/books/74a1ddc4-4373-47cf-a3e7-c4c7c79814ad');
        $this->assertResponseStatusCodeSame(Response::HTTP_NOT_FOUND);
        $res = $this->client->getResponse();
        self::assertNotFalse($res->getContent());
        self::assertEquals('Error: Book not found', json_decode($res->getContent())->error);
    }
}
