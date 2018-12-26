<?php
/**
 * Created by PhpStorm.
 * User: Raf
 * Date: 25/12/2018
 * Time: 14:26
 */

namespace App\Controller\API;

use App\Service\ERR;
use App\Service\API;
use App\Service\Historico;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;

class HistoricoAPI extends AbstractController
{
    /**
     * @Route("/historico", name="historico", methods={"GET"})
     * @param Historico $historico
     * @return Response
     */
    public function historico(Historico $historico)
    {
        $resp = $historico->getHistorico();

        return is_null($resp) ? ERR::send_error(__FUNCTION__) : API::send_json($resp);
    }

    /**
     * @Route("{codigoempresa}/historico", name="historicoFiltrado", methods={"GET"})
     * @param Historico $historico
     * @param string $codigoempresa
     * @return Response
     */
    public function historicoFiltrado(Historico $historico, string $codigoempresa)
    {
        $resp = $historico->getHistoricoEmpresa($codigoempresa);

        return is_null($resp) ? ERR::send_error(__FUNCTION__) : API::send_json($resp);
    }
}