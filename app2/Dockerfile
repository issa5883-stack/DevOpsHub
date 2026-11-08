# Web App 2 - Dashboard
FROM node:18-alpine

WORKDIR /app

# Install dependencies first so this layer is cached between builds
COPY package*.json ./
RUN npm install --omit=dev

# Copy the application code
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
