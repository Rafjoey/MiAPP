<?php
/**
 * Created by PhpStorm.
 * User: Raf
 * Date: 25/12/2018
 * Time: 14:26
 */

namespace App\Controller\API;

use App\Service\Bolsa;
use App\Service\ERR;
use App\Service\API;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;

class BolsaAPI extends AbstractController
{
    /**
     * @Route("/bolsa", name="bolsa", methods={"GET"})
     * @param Bolsa $bolsa
     * @return Response
     */
    public function bolsa(Bolsa $bolsa)
    {
        $resp = $bolsa->getBolsa();

        return is_null($resp) ? ERR::send_error(__FUNCTION__) : API::send_json($resp);
    }

    /**
     * @Route("{codigoempresa}/bolsa", name="bolsaFiltrada", methods={"GET"})
     * @param Bolsa $bolsa
     * @param string $codigoempresa
     * @return Response
     */
    public function bolsaFiltrada(Bolsa $bolsa, string $codigoempresa)
    {
        $resp = $bolsa->getBolsaByEmpresa($codigoempresa);

        return is_null($resp) ? ERR::send_error(__FUNCTION__) : API::send_json($resp);
    }

    /**
     * @Route("/bolsa/agregar", name="agregarEmpresa", methods={"POST"})
     * @param Bolsa $bolsa
     * @return Response
     */
    public function agregarEmpresa(Bolsa $bolsa)
    {
        $request = Request::createFromGlobals();
        $datos = $request->request->get('datos');
        $datos = json_decode($datos, true);
        $resp = $bolsa->anadirEmpresa($datos);

        return !$resp ? ERR::send_error(__FUNCTION__) : API::send_ok();
    }
}