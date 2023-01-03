<?php

namespace App\Book\Infrastructure;

use JsonSchema\Validator;

class JsonSchemaValidator
{
    public function validate($body, array $schema): array
    {
        $validator = new Validator();

        $validator->validate($body, $schema);

        return $validator->isValid() ? [] : self::formatErrors($validator);
    }

    private static function formatErrors(Validator $validator): array
    {
        return array_map(
            function (array $error): array {
                return array_intersect_key($error, array_flip(['property', 'message']));
            },
            $validator->getErrors()
        );
    }
}