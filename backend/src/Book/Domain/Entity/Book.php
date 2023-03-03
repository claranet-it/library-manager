<?php

namespace App\Book\Domain\Entity;

use App\Book\Application\DTO\BookDTO;
use App\Book\Infrastructure\Repository\BookRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: BookRepository::class)]
class Book implements \JsonSerializable
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private int|null $id;

    #[Assert\NotBlank]
    #[Assert\Length(max: 255)]
    #[ORM\Column(length: 255)]
    private string $title;

    #[Assert\Length(max: 2000)]
    #[ORM\Column(length: 2000, nullable: true)]
    private ?string $description;

    #[Assert\Type('double')]
    #[Assert\NotBlank]
    #[Assert\PositiveOrZero]
    #[ORM\Column]
    private float $price;

    #[Assert\NotBlank]
    #[Assert\Length(max: 255)]
    #[ORM\Column(length: 255)]
    private string $author;

    public function __construct(
        string $title,
        string $author,
        float $price,
        ?string $description
    ) {
        $this->id = null;
        $this->title = $title;
        $this->author = $author;
        $this->price = $price;
        $this->description = $description;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): string
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

    public function getPrice(): float
    {
        return $this->price;
    }

    public function setPrice(float $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getAuthor(): string
    {
        return $this->author;
    }

    public function setAuthor(string $author): self
    {
        $this->author = $author;

        return $this;
    }

    public static function newBookFrom(BookDTO $bookDTO): Book
    {
        return new Book(
            (string) $bookDTO->getTitle(),
            (string) $bookDTO->getAuthor(),
            (float) $bookDTO->getPrice(),
            $bookDTO->getDescription()
        );
    }

    public function jsonSerialize(): mixed
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'author' => $this->author,
            'description' => $this->description,
            'price' => $this->price,
        ];
    }
}
