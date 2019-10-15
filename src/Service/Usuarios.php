<?php
/**
 * Created by PhpStorm.
 * User: Raf
 * Date: 24/12/2018
 * Time: 15:37
 */

namespace App\Service;


use Doctrine\Common\Persistence\ManagerRegistry;
use http\Exception;

class Usuarios
{

    private $managerRegistry;

    public function __construct(ManagerRegistry $managerRegistry) {
        $this->managerRegistry = $managerRegistry;
    }

    public function login($usr, $psw){

        $response = null;

        try {
            $mg = $this->managerRegistry->getManager();
            $resp = $mg->getRepository(\App\Entity\Usuarios::class)
                ->findBy(array('usuario' => $usr, 'pass' => $psw));

            $elem = [];
            $elem['usuario'] = $resp[0]->getUsuario();

            $response['userdata'] = $elem;
            $response['token'] = md5($usr);

        }
        catch (Exception $exception) {
            print_r($exception->getMessage()); // DEBUGGING
            return $response;
        }

        return $response;
    }

    public function getUsuario($usr){

        $response = null;

        try {
            $mg = $this->managerRegistry->getManager();
            $resp = $mg->getRepository(\App\Entity\Usuarios::class)
                ->findBy(array('usuario' => $usr))[0];

            $elem = [];
            $elem['usuario'] = $resp->getUsuario();
            $elem['nombre'] = $resp->getNombre();
            $elem['apellidos'] = $resp->getApellidos();
            $elem['correo'] = $resp->getCorreo();
            $elem['telefono'] = $resp->getTelefono();
            $elem['direccion'] = $resp->getDireccion();
            $elem['ciudad'] = $resp->getCiudad();
            $elem['cp'] = $resp->getCp();

            $response['datos'] = $elem;
        }
        catch (Exception $exception) {
            print_r($exception->getMessage()); // DEBUGGING
            return $response;
        }

        return $response;
    }
}