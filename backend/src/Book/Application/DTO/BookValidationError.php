<?php

namespace App\Book\Application\DTO;

class BookValidationError
{
    private BookDTO $bookDTO;

    private string $field;

    private string $errorMessage;

    public function __construct(
        BookDTO $bookDTO,
        string $field,
        string $errorMessage
    ) {
        $this->bookDTO = $bookDTO;
        $this->field = $field;
        $this->errorMessage = $errorMessage;
    }

    public function getValidationErrorMessage(): string
    {
        return 'Validation error on book '.$this->bookDTO->getAuthor().' '.$this->bookDTO->getTitle().': '.$this->field.' '.$this->errorMessage;
    }
}
