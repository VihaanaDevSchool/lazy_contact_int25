
FROM oven/bun:1
# Use official Bun image

# Set working directory inside container
WORKDIR /app

# Copy package.json and bun.lockb first (for faster caching)
COPY package.json bun.lockb* ./

# Install dependencies inside container
RUN bun install

# Copy the rest of your source code
COPY . .

# Expose port 5000 (our backend runs here)
EXPOSE 5000

# Command to start the app
CMD ["bun", "run", "src/index.ts"]
