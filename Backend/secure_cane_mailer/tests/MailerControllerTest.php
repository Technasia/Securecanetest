<?php

namespace App\Tests;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Response;

class MailerControllerTest extends WebTestCase
{
    public function testIndex(): void
    {
        $client = static::createClient();
        $client->request('GET', '/email/msg1/deret_r@etna-alternance.net');
        $this->assertResponseStatusCodeSame(Response::HTTP_OK);
    }
}
