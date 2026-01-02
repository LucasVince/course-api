FROM node:22-alpine AS builder
RUN npm install -g pnpm@10.11.1
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

FROM node:22-alpine AS runner
RUN npm install -g pnpm@10.11.1
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod
COPY --from=builder /app/dist ./dist
RUN mkdir -p /uploads/photos
RUN mkdir -p /uploads/videos

EXPOSE 5000

ENV NODE_ENV=production

CMD ["pnpm", "start"]