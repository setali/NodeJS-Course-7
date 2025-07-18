const http = require("http");

const server = http.createServer((req, res) => {
  //   console.log(Object.keys(req));
  console.log(req.url);
  console.log(req.method);
  //   console.log(req.headers);

  //   res.statusCode = 500;

  res.setHeader("content-type", "text/html");
  //   res.setHeader("content-type", "application/json");

  //   const buf = Buffer.from("Ali Mousavi");

  //   console.log(buf);

  const base64 = convert("Ali", "utf-8", "base64");

  console.log(base64);

  res.write("<h1>");

  res.write(base64, "base64");

  res.write("</h1>");

  //   const user = { name: "Ali", family: "Mousavi" };

  //   res.write(JSON.stringify(user));

  res.end();
});

server.listen(3333, () => {
  console.log("Server is running om 3333");
});

function convert(text, from, to) {
  return Buffer.from(text, from).toString(to);
}
