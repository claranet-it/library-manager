<?php

namespace App\Book\Infrastructure;

use JsonSchema\Validator;

class JsonSchemaValidator
{
    /**
     * @param mixed[] $schema
     */
    public function validate(string|false $body, array $schema): bool
    {
        $validator = new Validator();
        $data = json_decode((string) $body);

        $validator->validate($data, $schema);

        return $validator->isValid();
    }

    /**
     * @return mixed[]
     */
    public function requestBookJsonSchema(): array
    {
        return [
            'type' => 'object',
            'required' => ['title', 'author', 'price'],
            'properties' => [
                'title' => [
                    'type' => 'string',
                    'minLength' => 1,
                ],
                'author' => [
                    'type' => 'string',
                    'minLength' => 1,
                ],
                'price' => [
                    'type' => 'number',
                ],
                'description' => [
                    'type' => 'string',
                ],
            ],
        ];
    }

    /**
     * @return mixed[]
     */
    public function requestBookCollectionJsonSchema(): array
    {
        return [
            'type' => 'object',
            'required' => ['name', 'description', 'books'],
            'properties' => [
                'name' => [
                    'type' => 'string',
                    'minLength' => 1,
                ],
                'description' => [
                    'type' => 'string',
                    'minLength' => 1,
                ],
                'books' => [
                    'type' => 'array',
                    'minLength' => 2,
                ],
            ],
        ];
    }
}
