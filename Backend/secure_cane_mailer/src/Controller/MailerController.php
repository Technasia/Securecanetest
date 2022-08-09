<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Routing\Annotation\Route;

class MailerController extends AbstractController
{
    /**
    * @Route("/email/{msg}/{mail}", name="email")
    */
    public function index(MailerInterface $mailer, string $msg, string $mail): JsonResponse
    {
        switch ($msg){
          case "msg1":
            $msg = "Your Message was uploaded successfully.";
            break;
          case "msg2":
            $msg = "Your Message has been encoded successfully.";
            break;
        }

        $email = (new Email())
          ->from($_ENV['APP_MAILER_ADDRESS'])
          ->to($mail)
          ->subject($msg)
          ->text($msg);

        try {
            $mailer->send($email);
        } catch (TransportExceptionInterface $e) {
            $res['code'] = 'error';
            $res['msg'] = $e->getMessage();
            $resultat = json_encode($res);

            return new JsonResponse(
                $resultat,
                Response::HTTP_INTERNAL_SERVER_ERROR,
                [],
                true
            );
        }

        $res['code'] = 'ok';
        $res['msg'] = 'mail envoye';

        $resultat = json_encode($res);

        return new JsonResponse(
          $resultat,
          Response::HTTP_OK,
          [],
          true
        );
    }
}
