"use strict";
// taken from https://github.com/vuestorefront/storefront-ui
const fs = require("fs");
const glob = require("glob");
const path = require("path");

const pathTargetIndexJs = path.resolve(__dirname, "..", "index.js");
const pathTargetUtilsJs = path.resolve(__dirname, "..", "utils.js");

const pathVueComponentsRoot = path.resolve(__dirname, "..", "src/components");
const pathUtilsRoot = path.resolve(__dirname, "..", "src/utils");

const pathsVueComponents = glob.sync("*/*/At*.vue", {
  cwd: pathVueComponentsRoot,
});

const pathsUtils = glob.sync("**/use**.js", {
  cwd: pathUtilsRoot,
  ignore: [
    "**/use**.spec.js"
  ]
});

function createIndexFiles() {
  let filesContent = generateFilesContent();
  filesContent.contentIndexJs += generateUtils().contentIndexJs;
  saveIndexJs(filesContent.contentIndexJs);
  console.log("index.js created");
}

function generateFilesContent() {
  const imports = [];
  for (const pathComponentVue of pathsVueComponents) {
    const atComponentName = pathComponentVue.replace(/.*\/(At.+)\.vue/, "$1");
    const importLine = `export { default as ${atComponentName} } from "./src/components/${pathComponentVue}";`;
    imports.push(importLine);
  }
  const contentIndexJs =
  `// Auto-generated file by create-index-files.js. Do not edit manually\n` +
    imports.join("\n")
  return {
    contentIndexJs,
  };
}

function generateUtils() {
  const imports = [];
  for (const pathUtil of pathsUtils) {
    const fileName = pathUtil.replace(/(.+)\.js/, "$1");
    const importLine = `export { ${fileName} } from "./src/utils/${pathUtil}";`;
    imports.push(importLine);
  }
  const contentIndexJs =
    `\n \n // Utils \n` +
    imports.join("\n")
  return {
    contentIndexJs,
  };
}

function saveIndexJs(contentIndexJs, target = pathTargetIndexJs) {
  fs.writeFileSync(target, contentIndexJs);
}
module.exports = {
  createIndexFiles,
};

if (require.main === module) {
  createIndexFiles();
}
