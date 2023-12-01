-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-12-2023 a las 05:12:59
-- Versión del servidor: 8.0.30
-- Versión de PHP: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `full_stack_laravel`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` int NOT NULL,
  `name` varchar(250) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Ordenadores', NULL, NULL),
(2, 'Moviles', NULL, NULL),
(3, 'Televisores', '2023-11-26 19:00:08', '2023-11-26 19:07:52'),
(4, 'Mesas', '2023-11-26 19:06:26', '2023-11-26 19:06:26'),
(6, 'Comida', '2023-11-29 02:20:24', '2023-11-29 02:20:24'),
(10, 'Animales', '2023-11-30 03:57:46', '2023-11-30 03:57:46'),
(11, 'Países', '2023-11-30 22:44:13', '2023-11-30 22:44:13');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `posts`
--

CREATE TABLE `posts` (
  `id` int NOT NULL,
  `category_id` int DEFAULT NULL,
  `title` varchar(250) DEFAULT NULL,
  `content` longtext,
  `image` varchar(250) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `posts`
--

INSERT INTO `posts` (`id`, `category_id`, `title`, `content`, `image`, `user_id`, `created_at`, `updated_at`) VALUES
(3, 1, 'HP', '<p><strong>Nuevo </strong>PC Computador todo en uno</p>', '1701369581R (1).jpg', 22, NULL, '2023-11-30 18:40:33'),
(5, 1, 'Monitor sansung', 'Monitor clase 1', '1701311352OIP (1).jpg', 22, '2023-11-26 19:55:11', '2023-11-26 19:55:11'),
(9, 2, 'Samsung galaxi s9', 'Contenido actualizado', NULL, 1, '2023-11-26 20:04:21', '2023-11-26 20:04:21'),
(13, 1, 'tu mejor pc', '<p><strong>Procesador:&nbsp;</strong>I9</p><p><strong>Ram:</strong> 16 gb</p><p><strong>Disco</strong>: SSD 500 Gb</p><p><strong>Pantalla&nbsp;</strong>14 \"</p>', '1701312060R.jpg', 22, '2023-11-30 02:41:09', '2023-11-30 18:09:44'),
(14, 10, 'Delfines', '<p><strong>Animales;</strong>son hemos</p><p>los <u>delfines </u>son muy inteligentes y tiene una gran capacidad, de</p><p>ubicación la cual se atribuye a su sentido del<em>oído </em>&nbsp;</p>', '1701316823OIP (2).jpg', 22, '2023-11-30 04:00:27', '2023-12-01 02:44:03'),
(16, 10, 'Oinguion', '<p><strong>El pinguino:&nbsp;</strong>se parece a la suricata</p>', '1701369992R (2).jpg', 22, '2023-11-30 18:46:38', '2023-11-30 18:46:38'),
(17, 3, 'Televisor engel', '<p>Televisor marca Engel</p><p><strong>Pulgadas:</strong> 42&nbsp;</p><p><br></p><p>Estas nuevas marcas, aunque nos son muy conocidas, cuentan con garantía, siendo una excelente opción entre coste veneficio&nbsp;&nbsp;</p>', '1701377208R (3).jpg', 22, '2023-11-30 20:46:55', '2023-11-30 20:46:55'),
(18, 10, 'Nana', '<p>Test áñ país :)</p>', '1701383178OIP (5).jpg', 22, '2023-11-30 22:26:22', '2023-11-30 22:26:22'),
(19, 11, 'España está genial', '<p><span style=\"background-color: transparent;\"><strong>Epa,</strong></span><strong>&nbsp;tío</strong></p><p>Contenido <em>del </em>post</p><p>de España está <strong>genial</strong></p><p><br></p><p>Listado de cosas buenas;</p><p>1. Es seguro</p><p>2. Es bonito</p><p><br></p>', '1701384278R (4).jpg', 22, '2023-11-30 22:44:42', '2023-11-30 22:57:30'),
(20, 11, 'Colombia', '<p><strong>Colombia; </strong>es uno de los países más ricos y diverso, tiene inficionad de recursos naturales, rico en fauna y ni hablar de los sitios turísticos</p>', '1701399429R (5).jpg', 22, '2023-12-01 02:44:47', '2023-12-01 02:57:14');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(250) DEFAULT NULL,
  `surname` varchar(250) DEFAULT NULL,
  `email` varchar(250) DEFAULT NULL,
  `password` varchar(250) DEFAULT NULL,
  `role` varchar(250) DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  `image` varchar(250) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `remember_token` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `surname`, `email`, `password`, `role`, `description`, `image`, `created_at`, `updated_at`, `remember_token`) VALUES
(1, 'admin', 'admin', 'admin@admin.com', 'admin', 'ROLE_ADMIN', NULL, NULL, '2023-12-12 00:00:00', '2023-12-12 00:00:00', NULL),
(4, 'Javier H.', 'Reyes', 'victor@victor.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'ROLE_USER', NULL, NULL, '2023-11-26 02:46:13', '2023-11-28 18:23:51', NULL),
(11, 'Daniel', 'Daza', 'daniel@gmial.com', '0252a7286ec7f6b1477b220a16c37a4f', 'ROLE_USER', NULL, NULL, '2023-11-28 05:24:50', '2023-11-28 05:24:50', NULL),
(12, 'Camila', 'Perez', 'camila@gmial.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'ROLE_USER', NULL, NULL, '2023-11-28 05:26:40', '2023-11-28 05:26:40', NULL),
(13, 'Pedro', 'Pica', 'eppedro@gmail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'ROLE_USER', NULL, NULL, '2023-11-28 05:43:42', '2023-11-28 05:43:42', NULL),
(14, 'Sandra', 'Daza', 'sandra@gmail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'ROLE_USER', NULL, '1701225545R.jpg', '2023-11-28 05:48:07', '2023-11-29 02:39:05', NULL),
(15, 'Javi', 'Dev', 'sandra2@gmail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'ROLE_USER', 'Desarrollador fullstack', '1701268422R.jpg', '2023-11-28 06:17:56', '2023-11-29 14:33:42', NULL),
(16, 'Natalia', 'Perez', 'natalia@gmail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'ROLE_USER', NULL, NULL, '2023-11-29 02:33:45', '2023-11-29 02:33:45', NULL),
(17, 'Miguel', 'Daza', 'miguel@gmail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'ROLE_USER', NULL, NULL, '2023-11-29 02:34:33', '2023-11-29 02:34:33', NULL),
(18, 'Pepe', 'Elpepe', 'gas@gmail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'ROLE_USER', NULL, NULL, '2023-11-29 02:35:55', '2023-11-29 02:35:55', NULL),
(19, 'Yurley', 'Perez', 'yur@gmail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'ROLE_USER', NULL, NULL, '2023-11-29 02:36:50', '2023-11-29 02:36:50', NULL),
(20, 'Tono', 'Neira', 'tono@gmail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'ROLE_USER', NULL, NULL, '2023-11-29 02:37:50', '2023-11-29 02:37:50', NULL),
(21, 'Mery', 'Neira', 'mery@gmail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'ROLE_USER', NULL, NULL, '2023-11-29 02:38:25', '2023-11-29 02:38:25', NULL),
(22, 'Camilo', 'Quito', 'comilo@gmail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'ROLE_USER', '<p>Descripción: se la&nbsp;<strong></strong> <strong>Suricata</strong></p>', '1701299957OIF.jpg', '2023-11-29 17:02:11', '2023-11-29 23:19:17', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_posts_users` (`user_id`),
  ADD KEY `fk_posts_categories` (`category_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `fk_posts_categories` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `fk_posts_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
