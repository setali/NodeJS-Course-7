// UV_THREADPOLL_SIZE = 12

console.log(process.cwd());

process.title = "Anisa";
console.log(process.pid);
console.log(process.ppid);

console.log(process.uptime());

setInterval(() => {
  console.log(Date.now());
}, 1000);

setTimeout(() => {
  process.exit();
}, 5000);

process.on("uncaughtException", (ex) => {
  console.log(ex);
});

throw "Error";
