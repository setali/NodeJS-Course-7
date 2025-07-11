// const buf = Buffer.alloc(10, "?!ali");

// // const buf = Buffer.allocUnsafe(10);

// console.log(buf);
// console.log(typeof buf);

// console.log(buf[0]);
// console.log(buf[3]);

// for (let b of buf) {
//   console.log(b);
// }

// const buf = Buffer.from("Ali Mousavi");
// console.log(buf);

// console.log(buf.toString());
// console.log(buf.toString("base64"));
// console.log(buf.length);

// console.log(Array.isArray(buf));

// const buf = Buffer.from("ali");

// console.log(buf.toString());
// console.log(buf.toString("base64"));

// // 01100001 01101100 01101001
// // 011000010110110001101001
// // 011000  010110  110001  101001
// // Y       W       x       p

// console.log(buf);

const buf = Buffer.from("علی موسوی");
console.log(buf);
console.log(buf.length);

buf.forEach((b, i, buf) => console.log(b));
