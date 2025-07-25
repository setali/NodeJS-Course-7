process.title = "Child - Node";

console.log(process.pid);
console.log(process.ppid);

const intervalId = setInterval(() => {
  console.log("Now", Date.now());
}, 1000);

// setTimeout(() => {
//   //   clearInterval(intervalId);
//   //   process.exit();
//   //   throw new Error("My Error");
// }, 5000);
