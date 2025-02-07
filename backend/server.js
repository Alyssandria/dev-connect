// BACKEND ENTRY POINT
import http from "node:http";
import URL from "node:url";
import { MongoClient } from "mongodb";

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

const server = http.createServer(async (req, res) => {
  const URI = "mongodb://localhost:27017";
  const client = new MongoClient(URI);

  await client.connect();
  const DB = client.db("dev-con");
  const USERS = DB.collection("users");

  const { url, method } = req;
  const paths = URL.parse(url)
    .pathname.split("/")
    .filter((el) => el !== "");

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

  const isReqAPI = paths[0] === ROUTES.API.BASE;

  // SERVE STATIC FILES
  if (!isReqAPI) {
    serveFiles(url, res);
  }

  // HANDLE API REQUESTS
  if (isReqAPI && paths[1] === ROUTES.API.USER) {
    // IF CREATING NEW USER
    if (method === HTTP_METHODS.POST) {
      let body = "";
      req.on("data", (chunk) => (body += chunk));

      req.on("end", () => {
        try {
          body = JSON.parse(body);
          USERS.insertOne(body);
          console.log(body);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              status: 200,
              message: "User successfully created",
              data: body,
            })
          );
        } catch (error) {
          console.log(error);
          throw error;
        }
      });
    }
  }

  // HANDLE API REQUESTS
});

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at ${PORT}`);
});
