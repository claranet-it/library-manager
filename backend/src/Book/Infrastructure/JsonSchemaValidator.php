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

    public function requestBookJsonSchema(): array
    {
        return [
            'type' => 'object',
            'required' => ['title', 'author', 'price'],
            'properties' => [
                'title' => [
                    'type' => 'string',
                ],
                'author' => [
                    'type' => 'string',
                ],
                'price' => [
                    'type' => 'number',
                ],
                'description' => [
                    'type' => 'string'
                ]
            ],
        ];
    }

}