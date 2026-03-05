# server/Dockerfile
# highly optimized multi-stage build for the TypeScript backend
# 
# Stage 1: Builder - compile TypeScript and fetch dependencies
# Stage 2: Runtime - minimal image with only production essentials
# This reduces the final image size by ~100 Mo compared to development builds

FROM node:20-alpine AS builder
WORKDIR /app

# install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# copy sources and compile TypeScript to JavaScript
COPY . .
RUN yarn build

# deduplicate and optimize dependencies for production
RUN yarn install --frozen-lockfile --production --no-optional

# ---
# Stage 2: Runtime - distroless Node for minimal footprint
FROM node:20-alpine
WORKDIR /app

# copy compiled JavaScript only (not .ts sources or test files)
COPY --from=builder /app/dist ./dist
# copy production dependencies only
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# run the compiled app (no TypeScript/ts-node overhead)
CMD ["node", "dist/index.js"]
