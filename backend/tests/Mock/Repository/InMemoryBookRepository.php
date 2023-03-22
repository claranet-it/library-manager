<?php

namespace App\Tests\Mock\Repository;

use App\Book\Domain\Entity\Book;
use App\BookCollection\Domain\Entity\BookCollection;
use Symfony\Component\Uid\Uuid;

/**
 * @method null findOneBy(array $criteria, array $orderBy = null)
 * @method Book[] findAll()
 * @method Book[] findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class InMemoryBookRepository implements \App\Book\Infrastructure\Repository\iBookRepository
{

    /**
     * @var Book[]
     */
    private array $books = [];

    public function save(Book $entity, bool $flush = false): void
    {
        $this->books[$entity->getId()->__toString()] = $entity;
    }


    public function find(Uuid $id): Book
    {
        return $this->books[$id->__toString()];
    }

    public function remove(Book $entity, bool $flush = false): void
    {
        // TODO: Implement remove() method.
    }

    public function __call(string $name, array $arguments)
    {
        // TODO: Implement @method null find($id, $lockMode = null, $lockVersion = null)
        // TODO: Implement @method null findOneBy(array $criteria, array $orderBy = null)
        // TODO: Implement @method Book[] findAll()
        // TODO: Implement @method Book[] findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
    }
}