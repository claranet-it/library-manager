<?php

namespace App\Book\Application\DTO;

use App\Book\Domain\Entity\Book;
use Symfony\Component\Validator\Constraints as Assert;

class BookDTO
{

    #[Assert\NotBlank]
    #[Assert\Length(max: 255)]
    private string $title;

    #[Assert\Length(max: 2000)]
    private ?string $description;

    #[Assert\Type("double")]
    #[Assert\PositiveOrZero]
    #[Assert\NotBlank]
    private ?float $price;

    #[Assert\NotBlank]
    #[Assert\Length(max: 255)]
    private ?string $author;

    public function __construct(
        string $title,
        string $author,
        float $price,
        ?string $description
    )
    {
        $this->title = $title;
        $this->author = $author;
        $this->price = $price;
        $this->description = $description;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float|string|null $price): self
    {
        if(is_numeric($price)) {
            $this->price = floatval($price);
        } else {
            $this->price = null;
        }
        return $this;
    }

    public function getAuthor(): ?string
    {
        return $this->author;
    }

    public function setAuthor(string $author): self
    {
        $this->author = $author;

        return $this;
    }

    public function toBook(): Book {
        return new Book(
          $this->title,
          $this->author,
          $this->price,
          $this->description
        );
    }
}