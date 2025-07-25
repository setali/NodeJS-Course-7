const fs = require("fs");
const path = require("path");

function loadEnv() {
  const filePath = path.resolve(__dirname, ".env");

  const data = fs.readFileSync(filePath, "utf8");

  data
    .split("\n")
    .filter((el) => el.trim())
    .map((el) => el.split("="))
    .forEach(([key, value]) => {
      process.env[key] = value;
    });
}

module.exports = {
  loadEnv,
};
