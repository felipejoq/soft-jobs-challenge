# 👨‍💻 Soft Jobs
En este desafío se ponen a prueba conocimientos sobre autenticación y autorización utilizando herramientas como JWT.
El desafío queda expresado en este [Documento PDF](01_desafio_soft_jobs.pdf) donde expresa la funcionalidad sobre el proyecto.

- Debe registrar usuarios.
- Debe autenticar usuarios.
- Debe autorizar usuarios.

## ✅ Ejemplo de request permitidos:
### Register user 
```http request
POST http://localhost:3000/usuarios
Content-Type: application/json


{
  "email": "test@test.com",
  "password": "123456",
  "rol": "Full Stack Developer",
  "lenguage": "JavaScript"
}
```

> Retorna mismo objeto sin password.

### Login user
```http request
POST http://localhost:3000/login
Content-Type: application/json

{
  "email": "test@test.com",
  "password": "123456"
}
```

> Retorna un objeto con un token de 2 horas de duración.

### Get user details 
```http request
GET http://localhost:3000/usuarios
Authorization: Bearer "token_here"
```

> Retorna los detalles del usuario menos su password.

## 🚀 Desplegar en local:
- Requisitos:
    - PostgreSQL 14 o superior.
    - Node.js 18 o superior.

1. Clonar el repositorio

```bash
git clone https://github.com/felipejoq/soft-jobs-challenge.git
```

2. Navegar a la carpeta del proyecto

```bash
cd soft-jobs-challenge
```

3. Instalar los módulos de node

```bash
npm install
```

4Ejecutar el script SQL

Tomar el script SQL en el archivo ./sql/script.sql y ejecutarlo para crear la DB y la tabla necesaria.

```sql
CREATE DATABASE softjobs;
-- \c softjobs;
CREATE TABLE usuarios (
    id SERIAL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(60) NOT NULL,
    rol VARCHAR(25),
    lenguage VARCHAR(20)
);
```

5. Renombrar el archivo .env.template a .env y editar sus valores

```dotenv
PORT=3000
JWT_SEED=
## Config default for pg package -> https://github.com/brianc/node-postgres
PGUSER=
PGHOST=
PGPASSWORD=
PGDATABASE=softjobs
PGPORT=5432
```

6. Ejecutar el proyecto:

```bash
npm run dev
```
7. Visitar localhost

```
http://localhost:3000/
```
