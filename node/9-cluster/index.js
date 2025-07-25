const http = require("http");
const cluster = require("cluster");
const cpuCount = require("os").cpus().length;

if (cluster.isMaster) {
  process.title = "Parent: Node";
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }
} else {
  // Workers can share any TCP connection
  process.title = "Child: Node: " + process.pid;
  makeServer();
}

function makeServer() {
  http
    .createServer((req, res) => {
      res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
      res.end(process.pid + "");
    })
    .listen(3000, () =>
      console.log(`Server is run on port ${3000} and process ${process.pid}`)
    );
}
