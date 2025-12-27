# Gunakan Node.js untuk build React
FROM node:18-alpine

# Set folder kerja
WORKDIR /app

# Salin package.json
COPY package.json .

# Install library React
RUN npm install

# Salin semua kode frontend
COPY . .

# Buka port 3000 (port React)
EXPOSE 3000

# Jalankan React
CMD ["npm", "start"]