<?php

namespace App\BookCollection\Infrastructure\Repository;

use App\BookCollection\Domain\Entity\BookCollection;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

/**
 * @extends ServiceEntityRepository<BookCollection>
 *
 * @method BookCollection|null find($id, $lockMode = null, $lockVersion = null)
 * @method BookCollection|null findOneBy(array $criteria, array $orderBy = null)
 * @method BookCollection[]    findAll()
 * @method BookCollection[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
interface iBookCollectionRepository
{
    public function save(BookCollection $entity): void;

    public function remove(BookCollection $entity): void;
}
