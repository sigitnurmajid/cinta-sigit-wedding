# syntax=docker/dockerfile:1

# ── Build stage ───────────────────────────────────────────────────────
FROM node:22-bookworm-slim AS builder
WORKDIR /app

# Toolchain for compiling the better-sqlite3 native addon (node-gyp),
# used if no prebuilt binary is available for this platform.
RUN apt-get update && apt-get install -y --no-install-recommends \
      python3 make g++ ca-certificates \
 && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ── Runtime stage ─────────────────────────────────────────────────────
FROM node:22-bookworm-slim AS runner
WORKDIR /app

ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    NEXT_TELEMETRY_DISABLED=1

# Run as a non-root user.
RUN groupadd -g 1001 nodejs && useradd -u 1001 -g nodejs -m nextjs

# Next.js standalone output bundles the server + traced node_modules
# (including the better-sqlite3 native binary).
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Writable directory for the SQLite database (mounted as a volume).
RUN mkdir -p /app/data && chown -R nextjs:nodejs /app/data

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
