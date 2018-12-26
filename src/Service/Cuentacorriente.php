<?php
/**
 * Created by PhpStorm.
 * User: Raf
 * Date: 24/12/2018
 * Time: 15:37
 */

namespace App\Service;


use App\Entity\Cuentascorrientes;
use Doctrine\Common\Persistence\ManagerRegistry;
use http\Exception;

class Cuentacorriente
{

    private $managerRegistry;

    public function __construct(ManagerRegistry $managerRegistry) {
        $this->managerRegistry = $managerRegistry;
    }

    public function getCC($usr){

        $response = null;

        try {
            $mg = $this->managerRegistry->getManager();
            $resp = $mg->getRepository(Cuentascorrientes::class)
                ->findBy(['titular' => $usr]);

            $response['datos'] = [];

            foreach ($resp as $accion){
                $elem = [];
                $elem['id'] = $accion->getId();
                $elem['titular'] = $accion->getTitular();
                $elem['iban'] = $accion->getIban();
                $elem['saldo'] = $accion->getSaldo();

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