<?php
/**
 * Created by PhpStorm.
 * User: Raf
 * Date: 25/12/2018
 * Time: 14:26
 */

namespace App\Controller\API;

use App\Service\Acciones;
use App\Service\ERR;
use App\Service\API;
use App\Service\Usuarios;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;

class AccionesAPI extends AbstractController
{
    /**
     * @Route("/acciones", name="acciones", methods={"GET"})
     * @param Usuarios $usuarios
     * @param Acciones $acciones
     * @return Response
     */
    public function acciones(Usuarios $usuarios, Acciones $acciones)
    {
        $request = Request::createFromGlobals();
        $usuario = $request->headers->get('usuario');

//        $infoUsuario = $usuarios->getUsuario($usr[1]);
//        $resp = $acciones->getAcciones($infoUsuario['datos']['usuario']);

        $resp = $acciones->getAcciones($usuario);

        return is_null($resp) ? ERR::send_error(__FUNCTION__) : API::send_json($resp);
    }
}