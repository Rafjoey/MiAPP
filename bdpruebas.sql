-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-10-2019 a las 16:06:15
-- Versión del servidor: 10.1.37-MariaDB
-- Versión de PHP: 7.3.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bdpruebas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `acciones`
--

CREATE TABLE `acciones` (
  `ID` int(11) NOT NULL,
  `TITULAR` varchar(20) NOT NULL,
  `CODIGOEMPRESA` varchar(20) NOT NULL,
  `CANTIDAD` int(20) NOT NULL DEFAULT '0',
  `NOMBREEMPRESA` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `acciones`
--

INSERT INTO `acciones` (`ID`, `TITULAR`, `CODIGOEMPRESA`, `CANTIDAD`, `NOMBREEMPRESA`) VALUES
(1, 'Raf', 'EMP123ABC16ISS', 16, 'Isi'),
(2, 'Raf', 'EMP987ZYX09KFC', 5, 'KFC'),
(3, 'Eva', 'EMP123ABC16ISS', 13, 'Isi'),
(5, 'Raf', 'EMP645OGT54KGT', 13, 'OGT'),
(6, 'Raf', 'EMP246SOL96SOL', 9, 'SOL');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bolsa`
--

CREATE TABLE `bolsa` (
  `ID` int(11) NOT NULL,
  `CODIGOEMPRESA` varchar(20) NOT NULL,
  `VALORDIA` float NOT NULL,
  `NOMBREEMPRESA` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `bolsa`
--

INSERT INTO `bolsa` (`ID`, `CODIGOEMPRESA`, `VALORDIA`, `NOMBREEMPRESA`) VALUES
(1, 'EMP123ABC16ISS', 20, 'Isi'),
(2, 'EMP987ZYX09KFC', 12, 'KFC'),
(3, 'EMP645OGT54KGT', 22.16, 'OGT'),
(4, 'EMP246SOL96SOL', 15, 'SOL'),
(23, 'EMP951RES01NUE', 9.4, 'Nueva');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuentascorrientes`
--

CREATE TABLE `cuentascorrientes` (
  `ID` int(11) NOT NULL,
  `TITULAR` varchar(20) NOT NULL,
  `IBAN` varchar(20) NOT NULL,
  `SALDO` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cuentascorrientes`
--

INSERT INTO `cuentascorrientes` (`ID`, `TITULAR`, `IBAN`, `SALDO`) VALUES
(1, 'Raf', 'ES1234567890', 16000.2),
(2, 'Raf', 'ES9876543210', 69.54),
(3, 'Raf', 'ES5031679842', 35492.2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historico`
--

CREATE TABLE `historico` (
  `ID` int(11) NOT NULL,
  `CODIGOEMPRESA` varchar(20) NOT NULL,
  `FECHA` varchar(20) NOT NULL,
  `VALOR` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `historico`
--

INSERT INTO `historico` (`ID`, `CODIGOEMPRESA`, `FECHA`, `VALOR`) VALUES
(1, 'EMP123ABC16ISS', '23/12/2018', 14),
(2, 'EMP123ABC16ISS', '24/12/2018', 15),
(3, 'EMP123ABC16ISS', '25/12/2018', 8),
(4, 'EMP987ZYX09KFC', '23/12/2018', 10.5),
(5, 'EMP987ZYX09KFC', '24/12/2018', 9.75),
(6, 'EMP123ABC16ISS', '26/12/2018', 13.3),
(7, 'EMP987ZYX09KFC', '26/12/2018', 11),
(8, 'EMP987ZYX09KFC', '25/12/2018', 12),
(9, 'EMP645OGT54KGT', '23/12/2018', 22.16),
(10, 'EMP645OGT54KGT', '24/12/2018', 20.5),
(11, 'EMP645OGT54KGT', '25/12/2018', 12.9),
(12, 'EMP645OGT54KGT', '26/12/2018', 18.4),
(13, 'EMP246SOL96SOL', '23/12/2018', 7),
(14, 'EMP246SOL96SOL', '24/12/2018', 8.6),
(15, 'EMP246SOL96SOL', '25/12/2018', 9.1),
(16, 'EMP246SOL96SOL', '26/12/2018', 14.8),
(66, 'EMP951RES01NUE', '23/12/2018', 10.2),
(67, 'EMP951RES01NUE', '24/12/2018', 11.7),
(68, 'EMP951RES01NUE', '25/12/2018', 10.6),
(69, 'EMP951RES01NUE', '26/12/2018', 10.3),
(70, 'EMP123ABC16ISS', '27/12/2018', 16),
(71, 'EMP246SOL96SOL', '27/12/2018', 9.5),
(72, 'EMP645OGT54KGT', '27/12/2018', 11.1),
(73, 'EMP951RES01NUE', '27/12/2018', 9.8),
(74, 'EMP987ZYX09KFC', '27/12/2018', 11.7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movimientosac`
--

CREATE TABLE `movimientosac` (
  `ID` int(11) NOT NULL,
  `CODIGOEMPRESA` varchar(20) NOT NULL,
  `TITULAR` varchar(20) NOT NULL,
  `TITULARDESTINO` varchar(20) NOT NULL,
  `CANTIDAD` int(11) NOT NULL,
  `FECHA` date NOT NULL,
  `TIPO` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movimientoscc`
--

CREATE TABLE `movimientoscc` (
  `ID` int(11) NOT NULL,
  `IBAN` varchar(20) NOT NULL,
  `IBANDESTINO` varchar(20) NOT NULL,
  `CANTIDAD` float NOT NULL,
  `FECHA` date NOT NULL,
  `CONCEPTO` varchar(30) DEFAULT NULL,
  `TIPO` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `ID` int(11) NOT NULL,
  `USUARIO` varchar(20) NOT NULL,
  `PASS` varchar(20) NOT NULL,
  `NOMBRE` varchar(20) DEFAULT NULL,
  `APELLIDOS` varchar(30) DEFAULT NULL,
  `CORREO` varchar(30) DEFAULT NULL,
  `TELEFONO` int(9) DEFAULT NULL,
  `DIRECCION` varchar(50) DEFAULT NULL,
  `CIUDAD` varchar(20) DEFAULT NULL,
  `CP` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`ID`, `USUARIO`, `PASS`, `NOMBRE`, `APELLIDOS`, `CORREO`, `TELEFONO`, `DIRECCION`, `CIUDAD`, `CP`) VALUES
(1, 'Raf', 'cdc', 'Rafael', 'Aineto Guerrero', 'raf_469@hotmail.com', 648039386, 'C/ Conrado del campo, 11, 1B, izq', 'Madrid', 28027),
(2, 'Eva', 'asd', 'Eva', 'Aineto Guerrero', 'evuchimi@hotmail.com', 676836618, 'C/ Conrado del campo, 11, 1B, izq', 'Madrid', 28027);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `acciones`
--
ALTER TABLE `acciones`
  ADD PRIMARY KEY (`ID`,`TITULAR`,`CODIGOEMPRESA`,`NOMBREEMPRESA`);

--
-- Indices de la tabla `bolsa`
--
ALTER TABLE `bolsa`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `CODMEPRESA` (`CODIGOEMPRESA`),
  ADD UNIQUE KEY `NOMBREEMPRESA` (`NOMBREEMPRESA`);

--
-- Indices de la tabla `cuentascorrientes`
--
ALTER TABLE `cuentascorrientes`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `IBAN` (`IBAN`);

--
-- Indices de la tabla `historico`
--
ALTER TABLE `historico`
  ADD PRIMARY KEY (`ID`,`CODIGOEMPRESA`,`FECHA`),
  ADD UNIQUE KEY `CODIGOEMPRESA` (`CODIGOEMPRESA`,`FECHA`);

--
-- Indices de la tabla `movimientosac`
--
ALTER TABLE `movimientosac`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `movimientoscc`
--
ALTER TABLE `movimientoscc`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `USUARIO` (`USUARIO`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `acciones`
--
ALTER TABLE `acciones`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `bolsa`
--
ALTER TABLE `bolsa`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `cuentascorrientes`
--
ALTER TABLE `cuentascorrientes`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `historico`
--
ALTER TABLE `historico`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT de la tabla `movimientosac`
--
ALTER TABLE `movimientosac`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `movimientoscc`
--
ALTER TABLE `movimientoscc`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
