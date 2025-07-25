const { Worker } = require("worker_threads");
const path = require("path");

console.log("Master", process.pid);

const workerPath = path.resolve(__dirname, "worker.js");

function makeWorker(a, b) {
  const worker = new Worker(workerPath, {
    workerData: { a, b },
  });

  //   worker.postMessage("Salam");
  worker.on("message", (data) => console.log("=======>", data));
}

makeWorker(99999999n, 999999n);
makeWorker(99999999n, 9999999n);
makeWorker(99999999999n, 999999n);
makeWorker(99999999n, 9999999n);
makeWorker(99999999999n, 999999n);
makeWorker(99999999999n, 999999n);
makeWorker(99999999999n, 999999n);
makeWorker(99999999999n, 999999n);
makeWorker(999999999999n, 999999n);

setInterval(() => {
  console.log(Date.now());
}, 1000);
