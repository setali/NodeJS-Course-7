const Stream = require("stream");

const transformStream = new Stream.Transform();

transformStream._transform = (chunck, encoding) => {
  const data = chunck.toString().toUpperCase();
  transformStream.push(data);
};

process.stdin.pipe(transformStream).pipe(process.stdout);
