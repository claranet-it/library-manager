<?php

namespace App\Book\Domain\Entity;

use App\Book\Application\DTO\BookDTO;
use App\Book\Infrastructure\Repository\BookRepository;
use App\BookCollection\Domain\Entity\BookCollection;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Types\UuidType;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: BookRepository::class)]
class Book implements \JsonSerializable
{
    #[ORM\Id]
    #[ORM\Column(type: UuidType::NAME, unique: true)]
    private Uuid $id;

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

    #[ORM\ManyToMany(targetEntity: BookCollection::class, mappedBy: 'books')]
    private Collection $bookCollections;

    public function __construct(
        Uuid $id,
        string $title,
        string $author,
        float $price,
        ?string $description,
        array $bookCollections = []
    ) {
        $this->id = $id;
        $this->title = $title;
        $this->author = $author;
        $this->price = $price;
        $this->description = $description;
        $this->bookCollections = new ArrayCollection($bookCollections);
    }

    public function getId(): Uuid
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
        $id = Uuid::v4();
        return new Book(
            $id,
            (string) $bookDTO->getTitle(),
            (string) $bookDTO->getAuthor(),
            (float) $bookDTO->getPrice(),
            $bookDTO->getDescription(),
            $bookDTO->getCollections()
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

    /**
     * @return Collection<int, BookCollection>
     */
    public function getBookCollections(): Collection
    {
        return $this->bookCollections;
    }

    public function addBookCollection(BookCollection $bookCollection): self
    {
        if (!$this->bookCollections->contains($bookCollection)) {
            $this->bookCollections->add($bookCollection);
            $bookCollection->addBook($this);
        }

        return $this;
    }

    public function removeBookCollection(BookCollection $bookCollection): self
    {
        if ($this->bookCollections->removeElement($bookCollection)) {
            $bookCollection->removeBook($this);
        }

        return $this;
    }
}
