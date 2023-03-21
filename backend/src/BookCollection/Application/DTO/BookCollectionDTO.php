<?php

namespace App\BookCollection\Application\DTO;

use App\Book\Domain\Entity\Book;
use Symfony\Component\Validator\Constraints as Assert;

class BookCollectionDTO
{
    #[Assert\NotBlank]
    #[Assert\Length(max: 255)]
    private string $name;

    #[Assert\NotBlank]
    #[Assert\Length(max: 2000)]
    private string $description;

    /** @var Book[] */
    #[Assert\Count(
        min: 2,
        minMessage: 'You must specify at least two books',
    )]
    private array $books;

    /** @param $books Book[] */
    public function __construct(
        string $name,
        string $description,
        array $books
    ) {
        $this->name = $name;
        $this->description = $description;
        $this->books = $books;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function setDescription(string $description): void
    {
        $this->description = $description;
    }

    /** @return Book[] */
    public function getBooks(): array
    {
        return $this->books;
    }

    /** @param $books Book[] */
    public function setBooks(array $books): void
    {
        $this->books = $books;
    }
}
