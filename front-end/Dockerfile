FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package.json
COPY front-end/package.json front-end/package.json
COPY back-end/package.json back-end/package.json
RUN npm install

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run nx -- run front-end:build

FROM node:22-alpine AS runner
WORKDIR /app
COPY --from=builder /app/front-end/dist ./dist
RUN npm install -g serve
EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]
