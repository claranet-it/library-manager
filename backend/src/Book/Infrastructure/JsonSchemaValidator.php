<?php

namespace App\Book\Infrastructure;

use JsonSchema\Validator;

class JsonSchemaValidator
{
    public function validate($body, array $schema): bool
    {
        $validator = new Validator();
        $data = json_decode($body);

        $validator->validate($data, $schema);

        return $validator->isValid();
    }

}