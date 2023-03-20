<?php

namespace App\BookCollection\Infrastructure\Validator;

use App\Book\Infrastructure\JsonSchemaValidator;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;

class CollectionRequestValidator
{
    public function __construct(private JsonSchemaValidator $jsonSchemaValidator)
    {
    }

    public function validate(Request $request): void
    {
        if ('json' !== $request->getContentTypeFormat()) {
            throw new HttpException(400, 'Invalid request format');
        }

        $isValid = $this->jsonSchemaValidator->validate($request->getContent(), $this->jsonSchemaValidator->requestBookCollectionJsonSchema());
        if (!$isValid) {
            throw new HttpException(Response::HTTP_BAD_REQUEST, 'Invalid body format');
        }
    }
}
