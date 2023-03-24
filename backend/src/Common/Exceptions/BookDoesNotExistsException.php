<?php

namespace App\Common\Exceptions;

class BookDoesNotExistsException extends \Exception
{
    public function __construct(string $message)
    {
        $this->message = $message;
        $this->code = 400;
    }
}
