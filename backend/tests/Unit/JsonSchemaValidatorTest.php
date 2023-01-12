<?php

namespace App\Tests\Unit;


use App\Book\Infrastructure\JsonSchemaValidator;
use PHPUnit\Framework\TestCase;

class JsonSchemaValidatorTest extends TestCase
{
    public function testItShouldReturnTrue(): void
    {
        $validator = new JsonSchemaValidator();
        $json = json_encode([
            "name" => "Test"
        ]);
        $schema = [
            'type' => 'object',
            'required' => ['name'],
            'properties' => [
                'name' => [
                    'type' => 'string',
                ]
            ],];
        $isValid = $validator->validate(body: $json, schema: $schema);
        $this->assertTrue($isValid);
    }

    public function testItShouldReturnFalse(): void
    {
        $validator = new JsonSchemaValidator();
        $json = json_encode([
            "prova" => "Test"
        ]);
        $schema = [
            'type' => 'object',
            'required' => ['name'],
            'properties' => [
                'name' => [
                    'type' => 'string',
                ]
            ],];
        $isValid = $validator->validate(body: $json, schema: $schema);
        $this->assertFalse($isValid);
    }
}