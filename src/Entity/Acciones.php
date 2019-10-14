<?php

namespace App\Entity;

use JsonSerializable;
use Doctrine\ORM\Mapping as ORM;

/**
 * Acciones
 *
 * @ORM\Table(name="acciones")
 * @ORM\Entity
 */
class Acciones implements JsonSerializable 
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
     * @ORM\Column(name="TITULAR", type="string", length=20, nullable=false)
     */
    private $titular;

    /**
     * @var string
     *
     * @ORM\Column(name="CODIGOEMPRESA", type="string", length=20, nullable=false)
     */
    private $codigoempresa;

    /**
     * @var int
     *
     * @ORM\Column(name="CANTIDAD", type="integer", nullable=false)
     */
    private $cantidad = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="NOMBREEMPRESA", type="string", length=30, nullable=false)
     */
    private $nombreempresa;

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
     * @return string
     */
    public function getNombreempresa(): string
    {
        return $this->nombreempresa;
    }

    /**
     * @param string $nombreempresa
     */
    public function setNombreempresa(string $nombreempresa): void
    {
        $this->nombreempresa = $nombreempresa;
    }

    public function jsonSerialize() {
        $elem = [];
        $elem['id'] = $this->getId();
        $elem['titular'] = $this->getTitular();
        $elem['cantidad'] = $this->getCantidad();
        $elem['codigoempresa'] = $this->getCodigoempresa();
        $elem['nombreempresa'] = $this->getNombreempresa();
        return $elem;
    }
}
