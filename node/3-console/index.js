console.log("Hi %s, welcom", "Ali");
console.log("Hi %d", 2.13);
console.log("Hi %i", 2.13);

const obj = {
  name: "Ali",
  family: "Mousavi",
};

console.log("Hi %o", obj);
console.log("Hi %o", Boolean);

console.time("my-label");

9999n ** 9999999n;

console.timeEnd("my-label");

console.clear();

function f1() {
  f2();
}

function f2() {
  f3();
}

function f3() {
  console.trace();
}

f1();
