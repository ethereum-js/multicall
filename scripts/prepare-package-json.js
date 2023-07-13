const fs = require("fs");
const path = require("path");

const buildDir = "./build";
function createEsmModulePackageJson() {
  if (!fs.existsSync("./package.json")) {
    throw Error("package.json not found");
  }
  const package = JSON.parse(fs.readFileSync("./package.json").toString());
  fs.readdir(buildDir, function (err, dirs) {
    if (err) {
      throw err;
    }
    dirs.forEach(function (dir) {
      if (dir === "esm") {
        var packageJsonFile = path.join(buildDir, dir, "/package.json");
        if (!fs.existsSync(packageJsonFile)) {
          fs.writeFile(
            packageJsonFile,
            new Uint8Array(
              Buffer.from(
                `{"name":"${package.name}","version":"${package.version}","type": "module","exports":{".": "./index.js","./*": "./*.js"}}`
              )
            ),
            function (err) {
              if (err) {
                throw err;
              }
            }
          );
        }
      } else if (dir === "cjs") {
        var packageJsonFile = path.join(buildDir, dir, "/package.json");
        if (!fs.existsSync(packageJsonFile)) {
          fs.writeFile(
            packageJsonFile,
            new Uint8Array(
              Buffer.from(
                `{"name":"${package.name}","version":"${package.version}","exports":{".": "./index.js","./*": "./*.js"}}`
              )
            ),
            function (err) {
              if (err) {
                throw err;
              }
            }
          );
        }
      }
    });
  });
}

createEsmModulePackageJson();
