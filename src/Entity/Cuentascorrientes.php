<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Cuentascorrientes
 *
 * @ORM\Table(name="cuentascorrientes", uniqueConstraints={@ORM\UniqueConstraint(name="IBAN", columns={"IBAN"})})
 * @ORM\Entity
 */
class Cuentascorrientes
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
     * @ORM\Column(name="IBAN", type="string", length=20, nullable=false)
     */
    private $iban;

    /**
     * @var float
     *
     * @ORM\Column(name="SALDO", type="float", precision=10, scale=0, nullable=false)
     */
    private $saldo;

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
     * @return float
     */
    public function getSaldo(): float
    {
        return $this->saldo;
    }

    /**
     * @param float $saldo
     */
    public function setSaldo(float $saldo): void
    {
        $this->saldo = $saldo;
    }
}
