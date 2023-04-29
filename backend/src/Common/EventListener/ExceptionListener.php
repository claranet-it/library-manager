<?php

namespace App\Common\EventListener;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Symfony\Component\HttpKernel\KernelEvents;

class ExceptionListener implements EventSubscriberInterface
{
    public function onKernelException(ExceptionEvent $event): void
    {
        $exception = $event->getThrowable();
        $message = sprintf(
            'Error: %s',
            $exception->getMessage()
        );

        $event->allowCustomResponseCode();
        if ($exception instanceof HttpExceptionInterface) {
            $response = new JsonResponse(['error' => $message], $exception->getStatusCode());
            $response->headers->replace($exception->getHeaders());
        } elseif ($exception instanceof \Exception) {
            $response = new JsonResponse(['error' => $message], $exception->getCode());
        } else {
            $response = new JsonResponse(['error' => $message], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        $event->setResponse($response);
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::EXCEPTION => ['onKernelException', 256],
        ];
    }
}
