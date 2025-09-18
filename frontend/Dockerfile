
# Stage 1: Build the React app
FROM node:20 AS build
WORKDIR /app

# Copy deps first
COPY package.json package-lock.json* pnpm-lock.yaml* bun.lock* ./
RUN npm install

# Copy source
COPY . .

# Build production-ready app
RUN npm run build

# Stage 2: Serve with a lightweight webserver
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copy build files
COPY --from=build /app/dist ./

# Copy custom nginx config (optional, can add proxy rules)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
