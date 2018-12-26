<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Usuarios
 *
 * @ORM\Table(name="usuarios", uniqueConstraints={@ORM\UniqueConstraint(name="USUARIO", columns={"USUARIO"})})
 * @ORM\Entity
 */
class Usuarios
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
     * @ORM\Column(name="USUARIO", type="string", length=20, nullable=false)
     */
    private $usuario;

    /**
     * @var string
     *
     * @ORM\Column(name="PASS", type="string", length=20, nullable=false)
     */
    private $pass;

    /**
     * @var string|null
     *
     * @ORM\Column(name="NOMBRE", type="string", length=20, nullable=true)
     */
    private $nombre;

    /**
     * @var string|null
     *
     * @ORM\Column(name="APELLIDOS", type="string", length=30, nullable=true)
     */
    private $apellidos;

    /**
     * @var string|null
     *
     * @ORM\Column(name="CORREO", type="string", length=30, nullable=true)
     */
    private $correo;

    /**
     * @var int|null
     *
     * @ORM\Column(name="TELEFONO", type="integer", nullable=true)
     */
    private $telefono;

    /**
     * @var string|null
     *
     * @ORM\Column(name="DIRECCION", type="string", length=50, nullable=true)
     */
    private $direccion;

    /**
     * @var string|null
     *
     * @ORM\Column(name="CIUDAD", type="string", length=20, nullable=true)
     */
    private $ciudad;

    /**
     * @var int|null
     *
     * @ORM\Column(name="CP", type="integer", nullable=true)
     */
    private $cp;

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
    public function getUsuario(): string
    {
        return $this->usuario;
    }

    /**
     * @param string $usuario
     */
    public function setUsuario(string $usuario): void
    {
        $this->usuario = $usuario;
    }

    /**
     * @return string
     */
    public function getPass(): string
    {
        return $this->pass;
    }

    /**
     * @param string $pass
     */
    public function setPass(string $pass): void
    {
        $this->pass = $pass;
    }

    /**
     * @return null|string
     */
    public function getNombre(): ?string
    {
        return $this->nombre;
    }

    /**
     * @param null|string $nombre
     */
    public function setNombre(?string $nombre): void
    {
        $this->nombre = $nombre;
    }

    /**
     * @return null|string
     */
    public function getApellidos(): ?string
    {
        return $this->apellidos;
    }

    /**
     * @param null|string $apellidos
     */
    public function setApellidos(?string $apellidos): void
    {
        $this->apellidos = $apellidos;
    }

    /**
     * @return null|string
     */
    public function getCorreo(): ?string
    {
        return $this->correo;
    }

    /**
     * @param null|string $correo
     */
    public function setCorreo(?string $correo): void
    {
        $this->correo = $correo;
    }

    /**
     * @return int|null
     */
    public function getTelefono(): ?int
    {
        return $this->telefono;
    }

    /**
     * @param int|null $telefono
     */
    public function setTelefono(?int $telefono): void
    {
        $this->telefono = $telefono;
    }

    /**
     * @return null|string
     */
    public function getDireccion(): ?string
    {
        return $this->direccion;
    }

    /**
     * @param null|string $direccion
     */
    public function setDireccion(?string $direccion): void
    {
        $this->direccion = $direccion;
    }

    /**
     * @return null|string
     */
    public function getCiudad(): ?string
    {
        return $this->ciudad;
    }

    /**
     * @param null|string $ciudad
     */
    public function setCiudad(?string $ciudad): void
    {
        $this->ciudad = $ciudad;
    }

    /**
     * @return int|null
     */
    public function getCp(): ?int
    {
        return $this->cp;
    }

    /**
     * @param int|null $cp
     */
    public function setCp(?int $cp): void
    {
        $this->cp = $cp;
    }
}
