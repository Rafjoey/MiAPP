<?php
/**
 * Created by PhpStorm.
 * User: Rafa
 * Date: 18/12/2018
 * Time: 10:01
 */

namespace App\Service;

use Exception;

class RDFService
{
    public function leerRDF(){

        try {
            $response = $data = [];
            $i = $x = 0;

            $flag = false;
            $fichero = fopen("Accidentes-Bicicletas-2018.ttl", "r") or die("No se pudo abrir el fichero Accidentes-Bicicletas-2018.ttl");

            // Obtiene todos los datos
            while (($line = fgets($fichero)) !== false) {

                if ($i > 8) $flag = true;
                if ($flag) {
                    $valor = explode('"', $line);
                    if (sizeof($valor) === 3) {
                        $data[] = $valor[1];
                    }
                }
                $i++;
            }

            // Construye un array de objetos
            while($x < sizeof($data)){
                $response[] = [
                    'FECHA' => $data[$x],
                    'DISTRITO' => trim($data[$x+1]),
                    'LUGAR_ACCIDENTE' => trim($data[$x+2]),
                    'ID' => $data[$x+3],
                    'N' => $data[$x+4],
                    'N_VICTIMAS' => $data[$x+5],
                    'TIPO_ACCIDENTE' => trim($data[$x+6]),
                    'SEXO' => $data[$x+7],
                    'TRAMO_EDAD' => trim($data[$x+8]),
                    'URI' => 'localhost:8000/api/accidentes/' . $data[$x+3]
                ];
                $x = $x + 9;
            }
        }
        catch (Exception $exception) {
            print_r($exception->getMessage()); // DEBUGGING
            $response = null;
        }

        return $response;
    }

    public function getInfo($id){

        $response = null;

        try {
            $datos = $this->leerRDF();
            foreach ($datos as $dato) {
                if($dato['ID'] === $id){
                    $response = $dato;
                }
            }
        }
        catch (Exception $exception) {
            print_r($exception->getMessage()); // DEBUGGING
            $response = null;
        }

        return $response;
    }
}