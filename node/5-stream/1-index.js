const Streram = require("stream");

const writebaleStream = new Streram.Writable();

writebaleStream._write = (chunk, encoding, next) => {
  console.log(chunk.toString());
  //   console.log(encoding);
  next();
};

const readableStream = new Streram.Readable();

readableStream.pipe(writebaleStream);

readableStream._read = (size) => {
  //   console.log("Size", size);
};

let counter = 1;

const intervalId = setInterval(() => {
  readableStream.push(String(counter++));
}, 2000);

readableStream.on("close", () => writebaleStream.end());
writebaleStream.on("close", () => console.log("Stream ended"));

setTimeout(() => {
  readableStream.destroy();
  clearInterval(intervalId);
}, 8000);
