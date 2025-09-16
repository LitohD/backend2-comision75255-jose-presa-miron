# Imagen base oficial de Node.js
FROM node:18

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install --production

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto (ajusta si usas otro)
EXPOSE 3000

# Comando para iniciar la app
CMD ["node", "src/index.js"]
