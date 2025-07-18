const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  res.setHeader("content-type", "text/html");
  if (req.url === "/") {
    return res.end("Home Page");
    // log to db
    // send notfication
    // send email
  }

  if (req.url === "/about") {
    const filePath = path.resolve(__dirname, "about.html");
    const data = fs.readFileSync(filePath);

    return res.end(data);
  }

  if (req.url === "/favicon.ico") {
    return res.end(fs.readFileSync(path.resolve(__dirname, "favicon.ico")));
  }

  res.statusCode = 404;
  res.end("Page not found");
});

const port = 3333;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
