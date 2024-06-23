# Descripcion 

Esto es un E-commerce exclusivo para la marca Decade ©


## Correr en DEV

1. Clonar repositorio.
2. Crear una copia del: ```.env.template``` y renombrarlo a ```.env ``` y cambiar las variables de entorno
3. Instalar dependencias: ```npm install```

--Esta parte es si no esta arriba la base de datos:
4. Levantar la base de de datos: ```docker compose up -d```
5. Correr las migraciones de Prisma:```npx prisma migrate dev```
6. Ejecutar seed: ```npm run seed```
7. Limpiar local storage del navegador. (En caso de hacer todo desde 0).
8. Correr el proyecto con: ```npm run dev```



## Correr en Prod

