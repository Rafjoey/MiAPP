# API Grupo 8

## Instalación de dependencias

Para poder usar la API se ha de descargar:

- [Nuestra API](https://github.com/Rafjoey/API.git).
- [COMPOSER](https://getcomposer.org/) e instalarlo.
- PHP, en nuestro caso hemos usado [XAMPP](https://www.apachefriends.org/es/index.html).

Añadir la variable de entorno C:\composer

Para instalar las dependencias se ha de descargar el repositorio y en el cmd desde su raíz escribir:

- Abrir el cmd en la raiz del respositorio.
- Instalar las dependencias usando el comando: 'composer update'.
- Una vez instaladas las dependencias, arrancar el servidor con el comando: 'php bin/console server:run'.

## Acceso a la API

Acceder a la [API](http://localhost:8000/api/accidentes)

## Cambio de versión

Esta versión de la API es una mejora respecto a la mostrada el día de la presentación.

Comparando estas versiones se han añadido:
```bash
  1 - Columna VER ACCIDENTE (URI): 
      Donde visualizaremos un botón correspondiente a cada fila. Tras hacer click nos abrirá una nueva pestaña en
      la cual por motivos que desconocemos, inicialmente no muestra nada, pero tras pulsar F5 atacará a la URI
      con el objeto seleccionado y mostrando su información.
```
```bash     
  2 - Columna FECHA:
      En la versión mostrada en la presentación dividíamos este campo en FECHA y RANGO HORARIO.
      En esta versión hemos unificado esos dos campos en una única columna FECHA.
```
```bash      
  3 - Descripción en la parte superior de la tabla de cómo ver los datos de cada objeto.
      Esto ya lo hemos mencionado en el punto 1.
```
```bash  
  4 - Se ha cambiado la parte de backend en controladores y servicios.
```

## Integrantes del grupo 8
```bash  
  Adrián Álvarez Atienza
  Rafael Aineto Guerrero
  Alejandro Bravo Merodio
  Tomás Miranda Perales
```
