-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS control_rrhh
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;

-- Usar la base de datos
USE control_rrhh;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- Resto del contenido del archivo sigue igual

CREATE TABLE colaboradores (
  id_colaborador int(11) NOT NULL,
  nombre varchar(150) NOT NULL,
  edad int(11) NOT NULL,
  telefono varchar(15) DEFAULT NULL,
  correo varchar(100) DEFAULT NULL,
  id_empresa int(11) NOT NULL,
  situacion_colaborador tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO colaboradores (id_colaborador, nombre, edad, telefono, correo, id_empresa, situacion_colaborador) VALUES
(6, 'Daniel Armando Peralta Argueta', 24, '32859787', 'danyperalta28@gmail.com', 17, 1);

--
-- Estructura de tabla para la tabla departamentos
--

CREATE TABLE departamentos (
  id_departamento int(11) NOT NULL,
  nombre varchar(100) NOT NULL,
  id_pais int(11) NOT NULL,
  situacion_departamento tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO departamentos (id_departamento, nombre, id_pais, situacion_departamento) VALUES
(1, 'Alta Verapaz', 1, 1),
(2, 'Baja Verapaz', 1, 1),
(3, 'Chimaltenango', 1, 1),
(4, 'Chiquimula', 1, 1),
(5, 'El Progreso', 1, 1),
(6, 'Escuintla', 1, 1),
(7, 'Guatemala', 1, 1),
(8, 'Huehuetenango', 1, 1),
(9, 'Izabal', 1, 1),
(10, 'Jalapa', 1, 1),
(11, 'Jutiapa', 1, 1),
(12, 'Petén', 1, 1),
(13, 'Quetzaltenango', 1, 1),
(14, 'Quiché', 1, 1),
(15, 'Retalhuleu', 1, 1),
(16, 'Sacatepéquez', 1, 1),
(17, 'San Marcos', 1, 1),
(18, 'Santa Rosa', 1, 1),
(19, 'Sololá', 1, 1),
(20, 'Suchitepéquez', 1, 1),
(21, 'Totonicapán', 1, 1),
(22, 'Zacapa', 1, 1),
(23, 'Ahuachapán', 2, 1),
(24, 'Cabañas', 2, 1),
(25, 'Chalatenango', 2, 1),
(26, 'Cuscatlán', 2, 1),
(27, 'La Libertad', 2, 1),
(28, 'La Paz', 2, 1),
(29, 'La Unión', 2, 1),
(30, 'Morazán', 2, 1),
(31, 'San Miguel', 2, 1),
(32, 'San Salvador', 2, 1),
(33, 'San Vicente', 2, 1),
(34, 'Santa Ana', 2, 1),
(35, 'Sonsonate', 2, 1),
(36, 'Usulután', 2, 1);

--
-- Estructura de tabla para la tabla empresas
--

CREATE TABLE empresas (
  id_empresa int(11) NOT NULL,
  nit varchar(20) NOT NULL,
  razon_social varchar(150) NOT NULL,
  nombre_comercial varchar(100) DEFAULT NULL,
  telefono varchar(15) DEFAULT NULL,
  correo varchar(100) DEFAULT NULL,
  id_departamento int(11) DEFAULT NULL,
  id_municipio int(11) NOT NULL,
  situacion_empresa tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO empresas (id_empresa, nit, razon_social, nombre_comercial, telefono, correo, id_departamento, id_municipio, situacion_empresa) VALUES
(17, 'ABCD', 'ABCD', 'ABCD S.A', '22332233', 'abcd@gmail.com', 1, 1, 1);

--
-- Estructura de tabla para la tabla municipios
--

CREATE TABLE municipios (
  id_municipio int(11) NOT NULL,
  nombre varchar(100) NOT NULL,
  id_departamento int(11) NOT NULL,
  situacion_municipio tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO municipios (id_municipio, nombre, id_departamento, situacion_municipio) VALUES
(1, 'Cobán', 1, 1),
(2, 'Cahabón', 1, 1),
(3, 'Chisec', 1, 1),
(4, 'Fray Bartolomé de las Casas', 1, 1),
(5, 'La Tinta', 1, 1),
(6, 'Panzós', 1, 1),
(7, 'Raxruhá', 1, 1),
(8, 'San Cristóbal Verapaz', 1, 1),
(9, 'San Juan Chamelco', 1, 1),
(10, 'Santa Cruz Verapaz', 1, 1),
(11, 'Tactic', 1, 1),
(12, 'Tamahú', 1, 1),
(13, 'Santa María Cahabón', 1, 1),
(14, 'Salamá', 2, 1),
(15, 'Cubulco', 2, 1),
(16, 'Granados', 2, 1),
(17, 'Purulhá', 2, 1),
(18, 'Rabinal', 2, 1),
(19, 'San Jerónimo', 2, 1),
(20, 'San Miguel Chicaj', 2, 1),
(21, 'Chimaltenango', 3, 1),
(22, 'Patzicía', 3, 1),
(23, 'Comalapa', 3, 1),
(24, 'San Juan Comalapa', 3, 1),
(25, 'Santa Apolonia', 3, 1),
(26, 'Tecpán', 3, 1),
(27, 'Antigua Guatemala', 16, 1),
(28, 'Ciudad Vieja', 16, 1),
(29, 'Jocotenango', 16, 1),
(30, 'Escuintla', 6, 1),
(31, 'Puerto San José', 6, 1),
(32, 'Nueva Concepción', 6, 1),
(33, 'Guatemala', 7, 1),
(34, 'Mixco', 7, 1),
(35, 'Villa Nueva', 7, 1),
(36, 'Amatitlán', 7, 1),
(37, 'Huehuetenango', 8, 1),
(38, 'Zacapa', 22, 1),
(39, 'Totonicapán', 21, 1),
(40, 'Quetzaltenango', 13, 1),
(41, 'Salcajá', 13, 1),
(42, 'La Esperanza', 13, 1),
(200, 'Ahuachapán', 23, 1),
(201, 'Apaneca', 23, 1),
(202, 'Atiquizaya', 23, 1),
(203, 'Sensuntepeque', 24, 1),
(204, 'Ilobasco', 24, 1),
(205, 'Victoria', 24, 1),
(206, 'Chalatenango', 25, 1),
(207, 'La Palma', 25, 1),
(208, 'Nueva Concepción', 25, 1),
(300, 'San Salvador', 32, 1),
(301, 'Soyapango', 32, 1),
(302, 'Mejicanos', 32, 1);

--
-- Estructura de tabla para la tabla paises
--

CREATE TABLE paises (
  id_pais int(11) NOT NULL,
  nombre varchar(100) NOT NULL,
  situacion_pais tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO paises (id_pais, nombre, situacion_pais) VALUES
(1, 'Guatemala', 1),
(2, 'El Salvador', 1);

--
-- Indices de la tabla colaboradores
--
ALTER TABLE colaboradores
  ADD PRIMARY KEY (id_colaborador),
  ADD KEY id_empresa (id_empresa);

--
-- Indices de la tabla departamentos
--
ALTER TABLE departamentos
  ADD PRIMARY KEY (id_departamento),
  ADD KEY id_pais (id_pais);

--
-- Indices de la tabla empresas
--
ALTER TABLE empresas
  ADD PRIMARY KEY (id_empresa),
  ADD UNIQUE KEY nit (nit),
  ADD KEY id_municipio (id_municipio),
  ADD KEY fk_empresa_departamento (id_departamento);

--
-- Indices de la tabla municipios
--
ALTER TABLE municipios
  ADD PRIMARY KEY (id_municipio),
  ADD KEY id_departamento (id_departamento);

--
-- Indices de la tabla paises
--
ALTER TABLE paises
  ADD PRIMARY KEY (id_pais);

--
-- AUTO_INCREMENT de la tabla colaboradores
--
ALTER TABLE colaboradores
  MODIFY id_colaborador int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla departamentos
--
ALTER TABLE departamentos
  MODIFY id_departamento int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla empresas
--
ALTER TABLE empresas
  MODIFY id_empresa int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla municipios
--
ALTER TABLE municipios
  MODIFY id_municipio int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=303;

--
-- AUTO_INCREMENT de la tabla paises
--
ALTER TABLE paises
  MODIFY id_pais int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Filtros para la tabla colaboradores
--
ALTER TABLE colaboradores
  ADD CONSTRAINT colaboradores_ibfk_1 FOREIGN KEY (id_empresa) REFERENCES empresas (id_empresa) ON DELETE CASCADE;

--
-- Filtros para la tabla departamentos
--
ALTER TABLE departamentos
  ADD CONSTRAINT departamentos_ibfk_1 FOREIGN KEY (id_pais) REFERENCES paises (id_pais) ON DELETE CASCADE;

--
-- Filtros para la tabla empresas
--
ALTER TABLE empresas
  ADD CONSTRAINT empresas_ibfk_1 FOREIGN KEY (id_municipio) REFERENCES municipios (id_municipio) ON DELETE CASCADE,
  ADD CONSTRAINT fk_empresa_departamento FOREIGN KEY (id_departamento) REFERENCES departamentos (id_departamento) ON DELETE CASCADE;

--
-- Filtros para la tabla municipios
--
ALTER TABLE municipios
  ADD CONSTRAINT municipios_ibfk_1 FOREIGN KEY (id_departamento) REFERENCES departamentos (id_departamento) ON DELETE CASCADE;
COMMIT;
