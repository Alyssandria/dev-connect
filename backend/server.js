// BACKEND ENTRY POINT
import http from "node:http";
import URL from "node:url";
import fs from "node:fs";
import path from "node:path";

import { ROUTES, serveFiles } from "./utils.js";

// CONSTANTS
const PORT = 3000;
const HOSTNAME = "localhost";

const HTTP_METHODS = {
  GET: "GET",
  PUT: "PUT",
  OPTIONS: "OPTIONS",
  DELETE: "DELETE",
  POST: "POST",
};

const server = http.createServer((req, res) => {
  const { url, method } = req;

  const paths = URL.parse(url).pathname;
  // CORS
  res.setHeader("Control-Access-Allow-Origin", "*");
  res.setHeader(
    "Control-Access-Allow-Methods",
    "GET, PUT, POST, DELETE, OPTIONS"
  );
  res.setHeader("Control-Access-Allow-Headers", "Content-Type");
  if (method === HTTP_METHODS.OPTIONS) {
    res.statusCode = 204;
    res.end();
    return;
  }

  // SERVE STATIC FILES
  serveFiles(url, res);
});

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at ${PORT}`);
});
