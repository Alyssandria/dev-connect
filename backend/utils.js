import fs from "node:fs";
import path from "node:path";

export const ROUTES = {
  SIGNUP: "signup",
  LOGIN: "login",
  API: {
    BASE: "api",
    USER: "user",
  },
};

const FILEPATHS = {
  "/": "frontend/index.html",
  "/signup": "frontend/pages/auth/signup/signup.html",
};

const MIMES = {
  ".css": "text/css",
  ".html": "text/html",
  ".js": "application/javascript",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

export const serveFiles = (url, res) => {
  const cleanUrl = url
    .split("/")
    .filter((_, index) => index !== 0)
    .join("/"); // REMOVE THE FIRST "/" ON THE URL
  const filePath = FILEPATHS[url] || cleanUrl;
  const contentType = MIMES[path.extname(filePath)];
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        console.log(err);
        res.writeHead(404, { "content-type": "text/html" });
        res.end("<h1>404 Not Found</h1>");
      } else {
        console.log(err);
        res.writeHead(500, { "content-type": "text/plain" });
        res.end("500 Internal Server Error");
      }
    } else {
      res.writeHead(200, { "content-type": contentType });
      res.end(content);
    }
  });

  return;
};
