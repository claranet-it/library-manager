<?php

namespace App\BookCollection\Application\DTO;

use Symfony\Component\Validator\Constraints as Assert;
class BookCollectionDTO
{
    #[Assert\NotBlank]
    #[Assert\Length(max: 255)]
    private string $name;

    #[Assert\NotBlank]
    #[Assert\Length(max: 2000)]
    private string $description;

    #[Assert\Count(
        min: 2,
        minMessage: 'You must specify at least two books',
    )]
    private array $books;

    public function __construct(
        string $name,
        string $description,
        array $books
    ) {
        $this->name = $name;
        $this->description = $description;
        $this->books = $books;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName(string $name): void
    {
        $this->name = $name;
    }

    /**
     * @return string
     */
    public function getDescription(): string
    {
        return $this->description;
    }

    /**
     * @param string $description
     */
    public function setDescription(string $description): void
    {
        $this->description = $description;
    }

    /**
     * @return array
     */
    public function getBooks(): array
    {
        return $this->books;
    }

    /**
     * @param array $books
     */
    public function setBooks(array $books): void
    {
        $this->books = $books;
    }

}