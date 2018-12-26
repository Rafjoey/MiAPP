<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\Response;

class ERR
{

    public static function send_error($name) {

        $response = array(
            'method'    =>  $name,
            'error'     =>  'Request failed ('.Response::HTTP_FORBIDDEN.')',
            'reason'    =>  'Sorry, you are not allowed to use this service.');

        return API::send_json($response, Response::HTTP_FORBIDDEN);
    }

}