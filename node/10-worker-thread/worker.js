const { parentPort, workerData } = require("worker_threads");

console.log("Worker", process.pid);

parentPort.on("message", (data) => {
  console.log(data);

  parentPort.postMessage("Aleyk");
});

const result = (workerData.a ** workerData.b).toString().length;

parentPort.postMessage({ a: workerData.a, b: workerData.b, result });
