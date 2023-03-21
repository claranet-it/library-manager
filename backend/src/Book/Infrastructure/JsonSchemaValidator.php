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

}
