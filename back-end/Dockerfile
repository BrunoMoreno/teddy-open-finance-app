FROM node:22-slim AS deps
WORKDIR /app
COPY package.json package.json
COPY back-end/package.json back-end/package.json
COPY front-end/package.json front-end/package.json
RUN npm install

FROM node:22-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run nx -- run back-end:build

FROM node:22-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/back-end/package.json ./back-end/package.json
COPY --from=builder /app/back-end/dist ./back-end/dist
EXPOSE 3000
CMD ["node", "back-end/dist/src/main.js"]
