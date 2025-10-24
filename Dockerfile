# Multi-stage build for Next.js
# Stage 1: Build stage
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production stage
FROM node:20-alpine AS runner

# Set working directory
WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy built application from builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Set correct permission for prerender cache
RUN mkdir -p .next/cache && chown nextjs:nodejs .next/cache

# Switch to non-root user
USER nextjs

# Expose port 1124
EXPOSE 1124

# Set environment variable for port
ENV PORT=1124
ENV NODE_ENV=production

# Start the application
CMD ["npm", "start"]
