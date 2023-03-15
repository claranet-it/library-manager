<?php

namespace App\BookCollection\Application\DTO;

class BookCollectionDTO
{

    private string $name;
    private string $description;
    private array $books;

    public function __construct(
        string $name,
        string $description,
        array $books
    )
    {
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