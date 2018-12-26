<?php
/**
 * Created by PhpStorm.
 * User: Raf
 * Date: 24/12/2018
 * Time: 15:38
 */

namespace App\Controller\API;

use App\Service\API;
use App\Service\ERR;
use App\Service\Usuarios;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;

class LoginAPI extends AbstractController
{
    /**
     * @Route("/login", name="login")
     * @param Usuarios $usuarios
     * @return Response
     */
    public function login(Usuarios $usuarios) {

        $response = null;

        $request = Request::createFromGlobals();
        $user = $request->request->get('username');
        $pass = $request->request->get('password');

        $response = $usuarios->login($user, $pass);

        return is_null($response) ? ERR::send_error(__FUNCTION__) : API::send_json($response);
    }
}