<?php

namespace App\BookCollection\Domain\Entity;

use App\Book\Domain\Entity\Book;
use App\BookCollection\Application\DTO\BookCollectionDTO;
use App\BookCollection\Infrastructure\Repository\BookCollectionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Types\UuidType;
use Symfony\Component\Uid\Uuid;

#[ORM\Entity(repositoryClass: BookCollectionRepository::class)]
class BookCollection
{
    #[ORM\Id]
    #[ORM\Column(type: UuidType::NAME, unique: true)]
    private Uuid $id;

    #[ORM\Column(length: 255)]
    private string $name;

    #[ORM\Column(length: 2000)]
    private string $description;

    #[ORM\ManyToMany(targetEntity: Book::class, inversedBy: 'bookCollections')]
    private Collection $books;

    public function __construct(
        Uuid $id,
        string $name,
        string $description,
        array $books
    )
    {
        $this->id = $id;
        $this->name = $name;
        $this->description = $description;
        $this->books = new ArrayCollection($books);
    }

    public function getId(): Uuid
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Collection<int, Book>
     */
    public function getBooks(): Collection
    {
        return $this->books;
    }

    public function addBook(Book $book): self
    {
        if (!$this->books->contains($book)) {
            $this->books->add($book);
        }

        return $this;
    }

    public function removeBook(Book $book): self
    {
        $this->books->removeElement($book);

        return $this;
    }

    public function newBookCollectionFrom(BookCollectionDTO $bookCollectionDTO): BookCollection
    {
        $id = Uuid::v4();
        return new BookCollection(
            $id,
            $bookCollectionDTO->getName(),
            $bookCollectionDTO->getDescription(),
            $bookCollectionDTO->getBooks()
        );
    }

}
