const http = require("http");
const fs = require("fs");
const path = require("path");
const URL = require("url");
const qs = require("qs");

const STATIC_DIR = "public";

function initApp(req, res) {
  const { pathname, query } = URL.parse(req.url);

  req.query = qs.parse(query);
  req.pathname = pathname;

  res.json = (data) => {
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify(data));
  };
}

function staticServe(req, res) {
  const { pathname } = req;

  console.log("pathname", pathname);
  //   "styles/header.css"  => ["styles", "header.css"]
  const filePath = path.resolve(__dirname, STATIC_DIR, ...pathname.split("/"));

  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    res.end(data);
    return true;
  }

  return false;
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

  if (staticServe(req, res)) return;

  res.statusCode = 404;
  res.end("Page not found");
});

const port = 3333;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
