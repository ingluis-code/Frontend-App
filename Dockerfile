
# Etapa 1: Build de la aplicación Angular
FROM node:18-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build --prod 
# Asegúrate de que este comando genera la build correctamente

# Etapa 2: Servir la aplicación Angular con NGINX
FROM nginx:alpine

# Copia los archivos de la build desde la carpeta `dist/frontend-app/browser`
COPY --from=build /app/dist/frontend-app/browser /usr/share/nginx/html

# Expone el puerto 80 para acceder a la aplicación
EXPOSE 80

# Comando para mantener NGINX ejecutándose
CMD ["nginx", "-g", "daemon off;"]
