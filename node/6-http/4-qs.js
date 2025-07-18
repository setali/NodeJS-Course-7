const http = require("http");
const fs = require("fs");
const path = require("path");
const URL = require("url");
const qs = require("qs");

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

  const { pathname, query } = req;

  if (pathname === "/") {
    return res.end(fs.readFileSync(path.resolve(__dirname, "form-get.html")));
  }

  if (pathname === "/contact") {
    return res.json(query);
  }
});

server.listen(3333, () => console.log("Server is up"));
