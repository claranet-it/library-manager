<?php

namespace App\BookCollection\Application\Validator;

use App\BookCollection\Application\DTO\BookCollectionDTO;
use App\BookCollection\Application\DTO\BookCollectionValidationError;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class BookCollectionValidator
{
    public function __construct(private readonly ValidatorInterface $validatorInterface)
    {
    }

    /** @return string[] */
    public function validate(BookCollectionDTO $collectionDTO): array
    {
        $validationErrors = $this->validatorInterface->validate($collectionDTO);
        $validationErrorsContent = [];

        foreach ($validationErrors as $error) {
            $bookCollectionValidationError = new BookCollectionValidationError(
                $collectionDTO,
                $error->getPropertyPath(),
                $error->getMessage()
            );
            $validationErrorsContent[] = $bookCollectionValidationError->getValidationErrorMessage();
        }

        return $validationErrorsContent;
    }
}
