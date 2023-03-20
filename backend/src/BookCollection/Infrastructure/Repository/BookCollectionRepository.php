<?php

namespace App\BookCollection\Infrastructure\Repository;

use App\BookCollection\Domain\Entity\BookCollection;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<BookCollection>
 *
 * @method BookCollection|null find($id, $lockMode = null, $lockVersion = null)
 * @method BookCollection|null findOneBy(array $criteria, array $orderBy = null)
 * @method BookCollection[]    findAll()
 * @method BookCollection[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BookCollectionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, BookCollection::class);
    }

    public function save(BookCollection $entity): void
    {
        $this->getEntityManager()->persist($entity);
        $this->getEntityManager()->flush();
    }

    public function remove(BookCollection $entity): void
    {
        $this->getEntityManager()->remove($entity);
        $this->getEntityManager()->flush();
    }
}
