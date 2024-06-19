# CHALLENGE TECNICO ATOM

    Prueba técnica para FullStack Developer
    El proyecto consiste creación, modificación, eliminación y muestra de tareas por parte de diferentes usuarios

## BACKEND

- Hecho en `Node js` v18
- Base de datos: `Firestore Database`
- Módulos:
    * `express`: Utilizado para la configuración del servidor y exposicion de los endpoints
    * `firebase-admin`: Para conectarnos a Firestore y realizar las consultas a la BD
    * `jsonwebtoken`: Para generacion y validaciones mediante JWT
    * `dotenv`: Para establecer valores necesarios para la configuracion del proyecto

## ESTRUCTURA

El proyecto esta se realizó con una arquitectura en capas
- `server`: Capa Server donde se realiza la configuracion para levantar `express`
- `routes`: Capa Routes donde se encuentra los endpoints a exponer en el Server
- `controllers`: Capa Controller donde se encuentra la logica de los Endpoint
- `db`: Capa DB aqui se encuentra la configuracion y conexion a `Firestore Database`
    