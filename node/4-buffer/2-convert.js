function convert(text, from, to) {
  return Buffer.from(text, from).toString(to);
}

const base64 = convert("Ali Mousavi", "utf8", "base64");

console.log(base64);

const utf = convert(base64, "base64", "utf8");

console.log(utf);
