const { execFile } = require("child_process");

// execFile("node", ["--version"], (error, stdout, stderr) => {
//   if (error) {
//     console.error(stderr);
//   } else {
//     console.log(stdout);
//   }
// });

execFile("ls", ["-l"], (error, stdout, stderr) => {
  if (error) {
    console.error(stderr);
  } else {
    console.log(stdout);
  }
});
