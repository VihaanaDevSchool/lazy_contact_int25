# Use Bun for fast builds
FROM oven/bun:1 AS base
WORKDIR /app

# Copy package.json + lock first for caching
COPY package.json bun.lock ./

# Install deps
RUN bun install --frozen-lockfile

# Copy rest of code
COPY . .

# Expose backend port
EXPOSE 5000

# Start backend
CMD ["bun", "run", "dev"]
