const args = process.argv.splice(2);

const tuples = args.map((el) => el.split("="));

const result = Object.fromEntries(tuples);

console.log(result);
console.log(result.name);
