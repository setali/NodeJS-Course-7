const http = require("http");
const fs = require("fs");
const path = require("path");
const URL = require("url");
const qs = require("qs");
const static = require("node-static");

const STATIC_DIR = "public";

const fileServer = new static.Server(STATIC_DIR);

function initApp(req, res) {
  const { pathname, query } = URL.parse(req.url);

  req.query = qs.parse(query);
  req.pathname = pathname;

  res.json = (data) => {
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify(data));
  };
}

const server = http.createServer((req, res) => {
  initApp(req, res);

  const { pathname } = req;

  if (pathname === "/") {
    return res.end(fs.readFileSync(path.resolve(__dirname, "index.html")));
  }

  if (pathname === "/about") {
    const filePath = path.resolve(__dirname, "about.html");
    const data = fs.readFileSync(filePath);

    return res.end(data);
  }

  fileServer.serve(req, res, (error, response) => {
    if (error?.status === 404) {
      res.statusCode = 404;
      res.end("Page not found");
    }
  });
});

const port = 3333;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
