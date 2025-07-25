const heavyProcess = require("./heavy-process");
process.title = "Child: Node";

setTimeout(() => {
  const result = heavyProcess();

  process.send({ result });
}, 0);

process.send("Child say: salam");

process.on("message", (data) => console.log(data));
