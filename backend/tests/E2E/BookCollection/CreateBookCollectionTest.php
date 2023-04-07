<?php

namespace App\Tests\E2E\BookCollection;

use App\Book\Domain\Entity\Book;
use App\BookCollection\Application\DTO\BookCollectionDTO;
use App\BookCollection\Domain\Entity\BookCollection;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Response;
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
        $this->id = $book->getId()->__toString();

        $book2 = new Book(
            Uuid::v4(),
            'Libro 2 Collana di test',
            'Autore 2 per collana di test',
            20.99,
            'Test inserimento'
        );

        $manager->persist($book2);
        $this->id2 = $book2->getId()->__toString();

        $bookCollection = BookCollection::newBookCollectionFromDTO(
            new BookCollectionDTO(
                'Collana gia presente a db',
                'Una collana di libri gia presente a db',
                [$book->getId()->__toString(), $book2->getId()->__toString()]
            ),
            [$book, $book2]
        );

        $manager->persist($bookCollection);
        $manager->flush();
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
        self::assertNotFalse($body);
        $this->client->request('POST', '/api/collections', [], [], $headers, $body);
        $this->assertResponseStatusCodeSame(Response::HTTP_CREATED);
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
        self::assertNotFalse($body);
        $this->client->request('POST', '/api/collections', [], [], $headers, $body);
        $this->assertResponseStatusCodeSame(Response::HTTP_BAD_REQUEST);
        $res = $this->client->getResponse();
        self::assertNotFalse($res->getContent());
        self::assertStringContainsString('Validation error on collection Collana di test: books You must specify at least two books', $res->getContent());
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
                '74a1ddc4-4373-47cf-a3e7-c4c7c79814ad',
            ],
        ]);
        self::assertNotFalse($body);
        $this->client->request('POST', '/api/collections', [], [], $headers, $body);
        $this->assertResponseStatusCodeSame(Response::HTTP_BAD_REQUEST);
        $res = $this->client->getResponse();
        self::assertNotFalse($res->getContent());
        self::assertStringContainsString('Book with id: 74a1ddc4-4373-47cf-a3e7-c4c7c79814ad not found', $res->getContent());
    }

    public function testItReturnsErrorBecauseWeDontProvideDescription(): void
    {
        $headers = ['CONTENT_TYPE' => 'application/json'];
        $body = json_encode([
            'name' => 'Collana di test',
            'description' => '',
            'books' => [
                $this->id,
                $this->id2,
            ],
        ]);
        self::assertNotFalse($body);
        $this->client->request('POST', '/api/collections', [], [], $headers, $body);
        $this->assertResponseStatusCodeSame(Response::HTTP_BAD_REQUEST);
        $res = $this->client->getResponse();
        self::assertNotFalse($res->getContent());
        self::assertStringContainsString('Validation error on collection Collana di test: description This value should not be blank.', $res->getContent());
    }

    public function testItReturnsErrorBecauseABookCollectionWithThisNameAlreadyExists(): void
    {
        $headers = ['CONTENT_TYPE' => 'application/json'];
        $body = json_encode([
            'name' => 'Collana gia presente a db',
            'description' => 'Collana di libri',
            'books' => [
                $this->id,
                $this->id2,
            ],
        ]);
        self::assertNotFalse($body);
        $this->client->request('POST', '/api/collections', [], [], $headers, $body);
        $this->assertResponseStatusCodeSame(Response::HTTP_BAD_REQUEST);
        $res = $this->client->getResponse();
        self::assertNotFalse($res->getContent());
        self::assertStringContainsString('A collection with name: Collana gia presente a db already exists', $res->getContent());
    }
}
