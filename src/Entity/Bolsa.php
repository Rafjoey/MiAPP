<?php

namespace App\Entity;

use JsonSerializable;
use Doctrine\ORM\Mapping as ORM;

/**
 * Bolsa
 *
 * @ORM\Table(name="bolsa", uniqueConstraints={@ORM\UniqueConstraint(name="CODMEPRESA", columns={"CODIGOEMPRESA"})})
 * @ORM\Entity
 */
class Bolsa implements JsonSerializable
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
     * @var float
     *
     * @ORM\Column(name="VALORDIA", type="float", precision=10, scale=0, nullable=false)
     */
    private $valordia;

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
     * @return float
     */
    public function getValordia(): float
    {
        return $this->valordia;
    }

    /**
     * @param float $valordia
     */
    public function setValordia(float $valordia): void
    {
        $this->valordia = $valordia;
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
        $elem['valordia'] = $this->getValordia();
        $elem['codigoempresa'] = $this->getCodigoempresa();
        $elem['nombreempresa'] = $this->getNombreempresa();
        return $elem;
    }
}
