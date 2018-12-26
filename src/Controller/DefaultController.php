<?php
/**
 * Created by PhpStorm.
 * User: Rafa
 * Date: 10/12/2018
 * Time: 17:46
 *
 * @package EasyRdf
 */

namespace App\Controller;

use App\Service\API;
use App\Service\RDFService;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

/*
 * Controlador de vistas
 */

class DefaultController extends AbstractController
{
    /**
     * @Route("/", name="inicio")
     */
    public function inicio() {
        return $this->render('login.html.twig');
    }

    /**
     * @Route("/menu", name="menu")
     */
    public function menu() {
        if ($this->userLogCheck()) {
            return $this->render('menu.html.twig');
        }
        return $this->redirectToRoute('inicio');
    }

    private function userLogCheck(){

        $token = $_COOKIE['token'] ?? null;
        $usr = $_COOKIE['usuario'] ?? null;
        $usuarios = new API();
        if(is_null($token) || is_null($usr)) return false;
        else return $usuarios->ckeckSession($token, $usr);
    }
}