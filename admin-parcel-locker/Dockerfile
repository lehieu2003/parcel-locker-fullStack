# Use an official Bun image as a base
FROM oven/bun:latest

# Set the working directory
WORKDIR /app

# Copy package.json and bun.lockb files to the working directory
COPY package.json bun.lockb ./

# Install dependencies using Bun
RUN bun install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 5173

# Define the command to run the app
CMD ["bun", "run", "dev"]
