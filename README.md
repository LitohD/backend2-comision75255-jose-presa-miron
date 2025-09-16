# backend3-comision94210-jose-presa-miron

# Backend Proyecto Final - Coderhouse

## Descripción

Proyecto backend desarrollado para la entrega final del curso Backend en Coderhouse. Incluye gestión de usuarios, adopciones, autenticación, documentación Swagger, tests funcionales y dockerización completa.

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB (o FileSystem/Memoria, según configuración)
- Docker
- Swagger
- Jest & Supertest

## Instalación y ejecución local

1. Clona el repositorio:
   ```bash
   git clone https://github.com/LitohD/backend2-comision75255-jose-presa-miron.git
   cd backend2-comision75255-jose-presa-miron
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura las variables de entorno en un archivo `.env` si es necesario.
4. Inicia el servidor:
   ```bash
   npm start
   ```
5. Accede a la app en [http://localhost:3000](http://localhost:3000)

## Ejecución con Docker

La imagen del proyecto está disponible en Dockerhub:
[https://hub.docker.com/r/litohd/backend2-comision75255-jose-presa-miron](https://hub.docker.com/r/litohd/backend2-comision75255-jose-presa-miron)

1. Instala Docker Desktop.
2. Descarga la imagen:
   ```bash
   docker pull litohd/backend2-comision75255-jose-presa-miron
   ```
3. Ejecuta el contenedor:
   ```bash
   docker run -p 3000:3000 litohd/backend2-comision75255-jose-presa-miron
   ```
4. Accede a la app en [http://localhost:3000](http://localhost:3000)

## Documentación Swagger

La documentación de la API (módulo Users) está disponible en:
[http://localhost:3000/api/docs](http://localhost:3000/api/docs)

## Tests funcionales

El proyecto incluye tests funcionales para todos los endpoints del router `adoption.router.js`.
Para ejecutarlos:

```bash
npx jest tests/adoption.test.js
```

## Endpoints principales

- `/api/users` - Gestión de usuarios
- `/api/adoption` - Gestión de adopciones
- `/api/docs` - Documentación Swagger

## Variables de entorno recomendadas

- `PORT=3000`
- `PERSISTENCE=mongo` (o `fs`/`memory`)
- `LINK_DB=<tu_url_mongodb>`
- `SECRET_COOKIE=<tu_secreto>`

## Autor

- José Presa Mirón
- [GitHub: LitohD](https://github.com/LitohD)

---

