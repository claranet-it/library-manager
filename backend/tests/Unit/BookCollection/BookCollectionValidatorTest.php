<?php

namespace App\Tests\Unit\BookCollection;

use App\BookCollection\Application\DTO\BookCollectionDTO;
use App\BookCollection\Application\Validator\BookCollectionValidator;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Validator\ConstraintViolation;
use Symfony\Component\Validator\ConstraintViolationList;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Prophecy\PhpUnit\ProphecyTrait;

class BookCollectionValidatorTest extends TestCase
{
    use ProphecyTrait;
    private  $validator;
    private  $constraint;

    protected function setUp(): void
    {
        $this->validator = $this->prophesize(ValidatorInterface::class);
        $this->constraint = $this->prophesize(ConstraintViolation::class);
    }

    public function testItReturnsNoErrors(): void
    {
        $collectionDTO = new BookCollectionDTO(
            "pippo",
            "asdasdas",
            ["beb7c73c-b371-4760-8b62-bd8d393aa398",
                "ab1d7b0c-cc10-4d6e-9793-34d45f5de4df"]
        );

        $testResult = new ConstraintViolationList();

        $this->validator->validate($collectionDTO)->willReturn($testResult);

        $bookValidator = new BookCollectionValidator($this->validator->reveal());

        $result = $bookValidator->validate($collectionDTO);

        self::assertEmpty($result);

    }

    public function testItReturnsErrors(): void
    {
        $collectionDTO = new BookCollectionDTO(
            "pippo",
            "asdasdas",
            ["beb7c73c-b371-4760-8b62-bd8d393aa398"]
        );

        $this->constraint->getMessage()->willReturn("asdadsa");
        $this->constraint->getPropertyPath()->willReturn("asdadsa");
        $testResult = new ConstraintViolationList([$this->constraint->reveal()]);

        $this->validator->validate($collectionDTO)->willReturn($testResult);

        $bookValidator = new BookCollectionValidator($this->validator->reveal());

        $result = $bookValidator->validate($collectionDTO);

        self::assertNotEmpty($result);

    }

}