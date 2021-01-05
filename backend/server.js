import http from "http";

import app from "./app.js";

const port = process.env.PORT || 5000;

const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

server.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
