const fs = require("fs");
const path = require("path");

const Stream = require("stream");

const chunks = [];

const writebaleStream = new Stream.Writable({
  write: (chunk, encoding, next) => {
    chunks.push(chunk);
    next();
  },
});

const readableStream = new Stream.Readable({
  read: () => {},
});

readableStream.pipe(writebaleStream);

const filePath = path.resolve(__dirname, "files", "image.jpg");

const data = fs.readFileSync(filePath);

const chunkSize = 2 ** 10;

const chunkCount = parseInt(data.length / chunkSize) + 1;

console.log(chunkCount);

for (let i = 0; i < chunkCount; i++) {
  const chunk = data.slice(i * chunkSize, (i + 1) * chunkSize);
  readableStream.push(chunk);
}

readableStream.on("close", () => writebaleStream.end());
writebaleStream.on("close", () => {
  console.log("Stream ended");
  const buffer = Buffer.concat(chunks);
  const newFilePath = path.resolve(__dirname, "files", "new-image.jpg");

  fs.writeFileSync(newFilePath, buffer);
});

readableStream.destroy();
