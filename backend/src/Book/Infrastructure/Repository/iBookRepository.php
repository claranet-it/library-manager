<?php

namespace App\Book\Infrastructure\Repository;


use App\Book\Domain\Entity\Book;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

/**
 * @extends ServiceEntityRepository<Book>
 *
 * @method Book|null find($id, $lockMode = null, $lockVersion = null)
 * @method Book|null findOneBy(array $criteria, array $orderBy = null)
 * @method Book[]    findAll()
 * @method Book[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
interface iBookRepository
{
    public function save(Book $entity, bool $flush = false): void;

    public function remove(Book $entity, bool $flush = false): void;
}