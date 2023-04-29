<?php

namespace App\Tests\Mock\Repository;

use App\BookCollection\Domain\Entity\BookCollection;
use App\BookCollection\Infrastructure\Repository\iBookCollectionRepository;
use Symfony\Component\Uid\Uuid;

/**
 * @method BookCollection[] findAll()
 */
class InMemoryBookCollectionRepository implements iBookCollectionRepository
{
    /**
     * @var BookCollection[]
     */
    private array $collection;
    private array $collectionByName;

    public function save(BookCollection $entity): void
    {
        $this->collection[$entity->getId()->__toString()] = $entity;
        $this->collectionByName[$entity->getName()] = $entity;
    }

    public function find(Uuid $id): BookCollection|null
    {
        if (array_key_exists($id->__toString(), $this->collection)) {
            return $this->collection[$id->__toString()];
        }

        return null;
    }

    public function findOneBy(array $params): BookCollection|null
    {
        if (array_key_exists($params['name'], $this->collectionByName)) {
            return $this->collectionByName[$params['name']];
        }

        return null;
    }

    public function remove(BookCollection $entity): void
    {
        // TODO: Implement remove() method.
    }

    public function __call(string $name, array $arguments)
    {
        // TODO: Implement @method null findOneBy(array $criteria, array $orderBy = null)
        // TODO: Implement @method BookCollection[] findAll()
        // TODO: Implement @method BookCollection[] findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
    }
}
