<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Movimientoscc
 *
 * @ORM\Table(name="movimientoscc")
 * @ORM\Entity
 */
class Movimientoscc
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
     * @ORM\Column(name="IBAN", type="string", length=20, nullable=false)
     */
    private $iban;

    /**
     * @var string
     *
     * @ORM\Column(name="IBANDESTINO", type="string", length=20, nullable=false)
     */
    private $ibandestino;

    /**
     * @var float
     *
     * @ORM\Column(name="CANTIDAD", type="float", precision=10, scale=0, nullable=false)
     */
    private $cantidad;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="FECHA", type="date", nullable=false)
     */
    private $fecha;

    /**
     * @var string|null
     *
     * @ORM\Column(name="CONCEPTO", type="string", length=30, nullable=true)
     */
    private $concepto;

    /**
     * @var string
     *
     * @ORM\Column(name="TIPO", type="string", length=2, nullable=false)
     */
    private $tipo;

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
    public function getIban(): string
    {
        return $this->iban;
    }

    /**
     * @param string $iban
     */
    public function setIban(string $iban): void
    {
        $this->iban = $iban;
    }

    /**
     * @return string
     */
    public function getIbandestino(): string
    {
        return $this->ibandestino;
    }

    /**
     * @param string $ibandestino
     */
    public function setIbandestino(string $ibandestino): void
    {
        $this->ibandestino = $ibandestino;
    }

    /**
     * @return float
     */
    public function getCantidad(): float
    {
        return $this->cantidad;
    }

    /**
     * @param float $cantidad
     */
    public function setCantidad(float $cantidad): void
    {
        $this->cantidad = $cantidad;
    }

    /**
     * @return \DateTime
     */
    public function getFecha(): \DateTime
    {
        return $this->fecha;
    }

    /**
     * @param \DateTime $fecha
     */
    public function setFecha(\DateTime $fecha): void
    {
        $this->fecha = $fecha;
    }

    /**
     * @return null|string
     */
    public function getConcepto(): ?string
    {
        return $this->concepto;
    }

    /**
     * @param null|string $concepto
     */
    public function setConcepto(?string $concepto): void
    {
        $this->concepto = $concepto;
    }

    /**
     * @return string
     */
    public function getTipo(): string
    {
        return $this->tipo;
    }

    /**
     * @param string $tipo
     */
    public function setTipo(string $tipo): void
    {
        $this->tipo = $tipo;
    }
}
