#!/bin/bash

# Build the React app
cd client
npm run build

# Move the build files to the server directory
rm -rf ../server/public
mv build ../server/public

# Go to the server directory and install dependencies
cd ../server
npm install

# Start the server
pm2 start server.js --name petals-app