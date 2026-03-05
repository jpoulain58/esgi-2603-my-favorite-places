# client/Dockerfile
# optimized multi-stage build for the React application
# 
# Stage 1: Builder - build React app with Vite
# Stage 2: Runtime - serve static files with lightweight nginx
# Final image is very small (~50 MB) and suitable for production

FROM node:20-alpine AS builder
WORKDIR /app

# install dependencies for building
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# copy source and build React app
COPY . .
RUN yarn build

# ---
# Stage 2: Runtime - lightweight nginx for serving static files
FROM nginx:1.27-alpine

# copy built static files to nginx's default html folder
COPY --from=builder /app/dist /usr/share/nginx/html

# optional: use custom nginx config for SPA routing
# (Vite builds a standard SPA, nginx serves it directly)

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
