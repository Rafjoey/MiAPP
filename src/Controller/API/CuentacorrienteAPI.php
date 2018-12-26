<?php
/**
 * Created by PhpStorm.
 * User: Raf
 * Date: 25/12/2018
 * Time: 14:26
 */

namespace App\Controller\API;

use App\Service\Cuentacorriente;
use App\Service\ERR;
use App\Service\API;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;

class CuentacorrienteAPI extends AbstractController
{
    /**
     * @Route("/cuentacorriente", name="cuentacorriente", methods={"GET"})
     * @param Cuentacorriente $cc
     * @return Response
     */
    public function cc(Cuentacorriente $cc)
    {
        $request = Request::createFromGlobals();
        $usuario = $request->headers->get('usuario');

        $resp = $cc->getCC($usuario);

        return is_null($resp) ? ERR::send_error(__FUNCTION__) : API::send_json($resp);
    }
}