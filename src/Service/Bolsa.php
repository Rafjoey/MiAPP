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

class Bolsa
{

    private $managerRegistry;

    public function __construct(ManagerRegistry $managerRegistry) {
        $this->managerRegistry = $managerRegistry;
    }

    public function getBolsa(){

        $response = null;

        try {
            $mg = $this->managerRegistry->getManager();
            $resp = $mg->getRepository(\App\Entity\Bolsa::class)
                ->findBy([], ['codigoempresa' => 'ASC']);

            $response['datos'] = [];

            foreach ($resp as $accion){
                $elem = [];
                $elem['id'] = $accion->getId();
                $elem['valordia'] = $accion->getValordia();
                $elem['codigoempresa'] = $accion->getCodigoempresa();
                $elem['nombreempresa'] = $accion->getNombreempresa();

                array_push($response['datos'], $elem);
            }

        }
        catch (Exception $exception) {
            print_r($exception->getMessage()); // DEBUGGING
            return $response;
        }

        return $response;
    }

    public function getBolsaByEmpresa($codigoempresa){

        $response = null;

        try {
            $mg = $this->managerRegistry->getManager();
            $resp = $mg->getRepository(\App\Entity\Bolsa::class)
                ->findBy(['codigoempresa' => $codigoempresa]);

            $response['datos'] = [];

            foreach ($resp as $accion){
                $elem = [];
                $elem['id'] = $accion->getId();
                $elem['valordia'] = $accion->getValordia();
                $elem['codigoempresa'] = $accion->getCodigoempresa();

                array_push($response['datos'], $elem);
            }

        }
        catch (Exception $exception) {
            print_r($exception->getMessage()); // DEBUGGING
            return $response;
        }

        return $response;
    }
}