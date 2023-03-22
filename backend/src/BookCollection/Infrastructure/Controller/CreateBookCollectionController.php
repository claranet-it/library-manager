<?php

namespace App\BookCollection\Infrastructure\Controller;

use App\BookCollection\Application\DTO\BookCollectionDTO;
use App\BookCollection\Application\Handler\CreateBookCollectionHandler;
use App\BookCollection\Application\Validator\BookCollectionValidator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Serializer\SerializerInterface;

class CreateBookCollectionController extends AbstractController
{
    public function __construct(
        private readonly SerializerInterface $serializerInterface,
        private readonly BookCollectionValidator $bookCollectionValidator,
        private readonly CreateBookCollectionHandler $bookCollectionHandler
    ) {
    }

    public function __invoke(Request $request): JsonResponse
    {
        $collectionDTO = $this->serializerInterface->deserialize($request->getContent(), BookCollectionDTO::class, 'json');
        $bookCollectionValidationErrorsContent = $this->bookCollectionValidator->validate($collectionDTO);

        if (count($bookCollectionValidationErrorsContent) > 0) {
            $errorJson = json_encode($bookCollectionValidationErrorsContent);
            throw new HttpException(400, false !== $errorJson ? $errorJson : 'Invalid body format.');
        }

        $bookCollection = $this->bookCollectionHandler->handle($collectionDTO);

        return new JsonResponse($bookCollection, status: 201);
    }
}
