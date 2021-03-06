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

class Historico
{

    private $managerRegistry;

    public function __construct(ManagerRegistry $managerRegistry) {
        $this->managerRegistry = $managerRegistry;
    }

    public function getHistorico(){

        $response = null;

        try {
            $mg = $this->managerRegistry->getManager();
            $resp = $mg->getRepository(\App\Entity\Historico::class)
                ->findBy([], ['codigoempresa' => 'ASC', 'fecha' => 'ASC']);

            $response['datos'] = [];

            foreach ($resp as $accion){
                $elem = [];
                $elem['id'] = $accion->getId();
                $elem['valor'] = $accion->getValor();
                $elem['codigoempresa'] = $accion->getCodigoempresa();
                $elem['fecha'] = $accion->getFecha();

                array_push($response['datos'], $elem);
            }

        }
        catch (Exception $exception) {
            print_r($exception->getMessage()); // DEBUGGING
            return $response;
        }

        return $response;
    }

    public function getHistoricoEmpresa($codigoempresa){

        $response = null;

        try {
            $mg = $this->managerRegistry->getManager();
            $resp = $mg->getRepository(\App\Entity\Historico::class)
                ->findBy(['codigoempresa' => $codigoempresa]);

            $response['datos'] = [];

            foreach ($resp as $accion){
                $elem = [];
                $elem['id'] = $accion->getId();
                $elem['valor'] = $accion->getValor();
                $elem['codigoempresa'] = $accion->getCodigoempresa();
                $elem['fecha'] = $accion->getFecha();

                array_push($response['datos'], $elem);
            }

        }
        catch (Exception $exception) {
            print_r($exception->getMessage()); // DEBUGGING
            return $response;
        }

        return $response;
    }

    public function anadirHistorico($datos){

        $response = false;

        try {
            $mg = $this->managerRegistry->getManager();
            $historico = new \App\Entity\Historico();

            $fecha = $codigoempresa = null;
            if($datos['fecha'] !== '') $fecha = $datos['fecha'];
            if($datos['codigoempresa'] !== '') $codigoempresa = $datos['codigoempresa'];

            $historico->setFecha($fecha);
            $historico->setCodigoempresa($codigoempresa);
            $historico->setValor($datos['valor']);

            $mg->persist($historico);
            $mg->flush();

            $response = true;
        }
        catch (Exception $exception) {
            print_r($exception->getMessage()); // DEBUGGING
            return $response;
        }

        return $response;
    }
}