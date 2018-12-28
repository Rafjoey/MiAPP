<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Historico
 *
 * @ORM\Table(name="historico")
 * @ORM\Entity
 */
class Historico
{
    /**
     * @var int
     *
     * @ORM\Column(name="ID", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="CODIGOEMPRESA", type="string", length=20, nullable=false)
     */
    private $codigoempresa;

    /**
     * @var string
     *
     * @ORM\Column(name="FECHA", type="string", length=20, nullable=false)
     */
    private $fecha;

    /**
     * @var float
     *
     * @ORM\Column(name="VALOR", type="float", precision=10, scale=0, nullable=false)
     */
    private $valor;

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @param int $id
     */
    public function setId(int $id): void
    {
        $this->id = $id;
    }

    /**
     * @return string
     */
    public function getCodigoempresa(): string
    {
        return $this->codigoempresa;
    }

    /**
     * @param string $codigoempresa
     */
    public function setCodigoempresa(string $codigoempresa): void
    {
        $this->codigoempresa = $codigoempresa;
    }

    /**
     * @return string
     */
    public function getFecha(): string
    {
        return $this->fecha;
    }

    /**
     * @param string $fecha
     */
    public function setFecha(string $fecha): void
    {
        $this->fecha = $fecha;
    }

    /**
     * @return float
     */
    public function getValor(): float
    {
        return $this->valor;
    }

    /**
     * @param float $valor
     */
    public function setValor(float $valor): void
    {
        $this->valor = $valor;
    }
}
