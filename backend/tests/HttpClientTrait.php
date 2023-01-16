<?php

namespace App\Tests;

use GuzzleHttp\Client;

trait HttpClientTrait
{
    private static Client $client;

    public static function client(): Client
    {
        return self::$client ??= new Client([
            'base_uri' => 'http://localhost:8080',
            'timeout' => 10.0,
            'verify' => false,
            'http_errors' => false,
        ]);
    }
}
