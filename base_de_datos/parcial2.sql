-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-10-2021 a las 18:56:18
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `parcial2`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado`
--

CREATE TABLE `estado` (
  `id_status` int(100) NOT NULL,
  `statusz` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `estado`
--

INSERT INTO `estado` (`id_status`, `statusz`, `created_at`) VALUES
(1, 'infección', '2021-10-20 13:39:53'),
(2, 'desorientación', '2021-10-20 13:39:53'),
(3, 'violencia', '2021-10-20 13:39:53'),
(4, 'desmayo', '2021-10-20 13:39:53'),
(5, 'transformación', '2021-10-20 13:39:53');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sube`
--

CREATE TABLE `sube` (
  `id_sube` int(11) NOT NULL,
  `id_zombie` int(100) NOT NULL,
  `id_status` int(100) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `sube`
--

INSERT INTO `sube` (`id_sube`, `id_zombie`, `id_status`, `fecha`) VALUES
(1, 1, 2, '2021-10-20 13:41:24'),
(2, 1, 3, '2021-10-20 13:41:24'),
(3, 2, 3, '2021-10-20 14:37:08'),
(4, 2, 4, '2021-10-20 14:42:27'),
(5, 6, 4, '2021-10-20 15:00:36'),
(6, 4, 5, '2021-10-20 16:44:11'),
(7, 5, 2, '2021-10-20 16:44:31'),
(8, 7, 2, '2021-10-20 16:45:19');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zombie`
--

CREATE TABLE `zombie` (
  `id_zombie` int(100) NOT NULL,
  `nombre` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `zombie`
--

INSERT INTO `zombie` (`id_zombie`, `nombre`, `created_at`) VALUES
(1, 'Miguel Hidalgo', '2021-10-20 13:40:41'),
(2, 'Juan Aldama', '2021-10-20 13:40:41'),
(4, 'Agustín de Iturbide', '2021-10-20 14:50:36'),
(5, 'Miguel de la Madrid', '2021-10-20 14:54:00'),
(6, 'Venustiano Carranza', '2021-10-20 15:00:36'),
(7, 'Andrés Manuel López Obrador', '2021-10-20 16:45:19');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `estado`
--
ALTER TABLE `estado`
  ADD PRIMARY KEY (`id_status`);

--
-- Indices de la tabla `sube`
--
ALTER TABLE `sube`
  ADD PRIMARY KEY (`id_sube`),
  ADD KEY `id_zombie` (`id_zombie`),
  ADD KEY `id_status` (`id_status`);

--
-- Indices de la tabla `zombie`
--
ALTER TABLE `zombie`
  ADD PRIMARY KEY (`id_zombie`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `estado`
--
ALTER TABLE `estado`
  MODIFY `id_status` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `sube`
--
ALTER TABLE `sube`
  MODIFY `id_sube` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `zombie`
--
ALTER TABLE `zombie`
  MODIFY `id_zombie` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `sube`
--
ALTER TABLE `sube`
  ADD CONSTRAINT `sube_ibfk_1` FOREIGN KEY (`id_zombie`) REFERENCES `zombie` (`id_zombie`),
  ADD CONSTRAINT `sube_ibfk_2` FOREIGN KEY (`id_status`) REFERENCES `estado` (`id_status`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
