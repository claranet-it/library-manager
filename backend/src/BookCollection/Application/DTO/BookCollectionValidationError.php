<?php

namespace App\BookCollection\Application\DTO;

class BookCollectionValidationError
{
    private BookCollectionDTO $bookCollectionDTO;

    private string $field;

    private string $errorMessage;

    public function __construct(
        BookCollectionDTO $bookCollectionDTO,
        string $field,
        string $errorMessage
    ) {
        $this->bookCollectionDTO = $bookCollectionDTO;
        $this->field = $field;
        $this->errorMessage = $errorMessage;
    }

    public function getValidationErrorMessage(): string
    {
        return 'Validation error on collection '.$this->bookCollectionDTO->getName().': '.$this->field.' '.$this->errorMessage;
    }
}
