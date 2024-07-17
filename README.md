# petals-app

A simple React/Node application to capture Teams' PETALs data within MongoDB.

## Run the development server:

Requires NodeJS & NPM v18+.

### client:

```bash
cd client
npm start
```

### Server

```bash
cd server
node app.js
```

Assuming this is executed from within EC2/VPS.
Remember to `chmod +x deploy.sh`.

## Deploy the application:

```bash
./deploy.sh
```