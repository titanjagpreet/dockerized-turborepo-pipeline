FROM node:24

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY apps/http-server/package.json apps/http-server/package.json
COPY apps/web/package.json apps/web/package.json
COPY apps/ws-server/package.json apps/ws-server/package.json

COPY packages/prisma/package.json packages/prisma/package.json
COPY packages/typescript-config/package.json packages/typescript-config/package.json
COPY packages/ui/package.json packages/ui/package.json
COPY packages/eslint-config/package.json packages/eslint-config/package.json

RUN pnpm install

COPY . .

WORKDIR /app/packages/prisma

RUN pnpm prisma generate
RUN pnpm run build

WORKDIR /app

EXPOSE 3000
EXPOSE 3001
EXPOSE 3003

CMD ["pnpm", "run", "dev"]