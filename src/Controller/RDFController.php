<?php
/**
 * Created by PhpStorm.
 * User: Rafa
 * Date: 17/12/2018
 * Time: 17:19
 */

namespace App\Controller;

//use App\Service\API;
use App\Service\RDFService;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;

/**
 * @Route("/rdf", name="api_v1")
 */
class RDFController
{
    /**
     * @Route("/get", name="getRDF", methods={"GET"})
     * @return Response
     */
    public function rdf() {

        $response = null;

        $service = new RDFService();
        $response = $service->leerRDF();

        $status = Response::HTTP_OK;

        $itemJson = json_encode($response);
        if(is_bool($itemJson)){
            print_r($response);
            $itemJson = json_encode("error:".json_last_error_msg()."");
        }

        $response = new Response(
            $itemJson,
            $status,
            array('content-type' => 'application/json')
        );

        $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
    }
}