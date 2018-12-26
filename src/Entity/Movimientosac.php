<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Movimientosac
 *
 * @ORM\Table(name="movimientosac")
 * @ORM\Entity
 */
class Movimientosac
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
     * @ORM\Column(name="TITULAR", type="string", length=20, nullable=false)
     */
    private $titular;

    /**
     * @var string
     *
     * @ORM\Column(name="TITULARDESTINO", type="string", length=20, nullable=false)
     */
    private $titulardestino;

    /**
     * @var int
     *
     * @ORM\Column(name="CANTIDAD", type="integer", nullable=false)
     */
    private $cantidad;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="FECHA", type="date", nullable=false)
     */
    private $fecha;

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
    public function getTitular(): string
    {
        return $this->titular;
    }

    /**
     * @param string $titular
     */
    public function setTitular(string $titular): void
    {
        $this->titular = $titular;
    }

    /**
     * @return string
     */
    public function getTitulardestino(): string
    {
        return $this->titulardestino;
    }

    /**
     * @param string $titulardestino
     */
    public function setTitulardestino(string $titulardestino): void
    {
        $this->titulardestino = $titulardestino;
    }

    /**
     * @return int
     */
    public function getCantidad(): int
    {
        return $this->cantidad;
    }

    /**
     * @param int $cantidad
     */
    public function setCantidad(int $cantidad): void
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
