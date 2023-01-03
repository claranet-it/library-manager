<?php

namespace App\Book\Infrastructure;

use JsonSchema\Validator;

class JsonSchemaValidator
{
    public function validate($body, array $schema): bool
    {
        $validator = new Validator();

        $validator->validate($body, $schema);

        return $validator->isValid();
    }

}