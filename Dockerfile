    # Start your image with a node base image
    FROM node:18-alpine

    # Create an application directory
    RUN mkdir -p /app

    # The /app directory should act as the main application directory
    WORKDIR /app

    # Copy the app package and package-lock.json file
    COPY package*.json ./
    COPY tsconfig*.json ./

    # Copy the Vite configuration file needed by tsconfig.node.json
    COPY vite.config.ts ./

    # Copy the index.html file (Vite expects it in the root)
    COPY index.html ./

    # Copy local directories to the current local directory of our docker image (/app)
    COPY ./src ./src
    COPY ./public ./public

    # Install node packages, install serve, build the app, and remove dependencies at the end
    RUN npm install \
        && npm install -g serve \
        && npm run build \
        && rm -fr node_modules

    EXPOSE 3000

    # Start the app using serve command
    CMD [ "serve", "-s", "dist" ]