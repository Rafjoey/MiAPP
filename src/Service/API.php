<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\Response;

class API
{
    public static function send_json($item, $status = Response::HTTP_OK) {
        return new Response(
            json_encode($item),
            $status,
            array('content-type' => 'application/json')
        );
    }

    public static function send_ok($status = Response::HTTP_OK) {
        $response['ok'] = array();
        return new Response(
            json_encode($response),
            $status,
            array('content-type' => 'application/json')
        );
    }

    public function ckeckSession($token, $usr){

        $response = false;

        if($token === md5($usr)) $response = true;

        return $response;
    }
}