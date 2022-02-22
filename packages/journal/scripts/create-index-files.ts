"use strict";
// taken from https://github.com/vuestorefront/storefront-ui
import fs from "fs";
import glob from "glob";
import path from "path";

const pathTargetIndexJs = path.resolve(__dirname, "..", "src", "index.js");

const pathVueComponentsRoot = path.resolve(__dirname, "..", "src/components");
const pathUtilsRoot = path.resolve(__dirname, "..", "src/utils");

const pathsVueComponents = glob.sync("*/*/At*.vue", {
  cwd: pathVueComponentsRoot,
  ignore: ["**/**.spec.js", "**/**.stories.js"],
});

const pathsUtils = glob.sync("**/use**.{js,ts}", {
  cwd: pathUtilsRoot,
  ignore: ["**/use**.spec.js"],
});

export function createIndexFiles() {
  const filesContent = generateFilesContent();
  filesContent.contentIndexJs += generateUtils().contentIndexJs;
  saveIndexJs(filesContent.contentIndexJs);
  console.log("index.js created");
}

function generateFilesContent() {
  const imports = [];
  for (const pathComponentVue of pathsVueComponents) {
    const atComponentName = pathComponentVue.replace(/.*\/(At.+)\.vue/, "$1");
    const importLine = `export { default as ${atComponentName} } from "./components/${pathComponentVue}";`;
    imports.push(importLine);
  }
  const contentIndexJs =
    `// Auto-generated file by create-index-files.js. Do not edit manually\n` +
    imports.join("\n");
  return {
    contentIndexJs,
  };
}

function generateUtils() {
  const imports = [];
  for (const pathUtil of pathsUtils) {
    const fileName = pathUtil.replace(/(.+)(\.js|\.ts)/, "$1");
    const cleanPath = pathUtil.slice(0, pathUtil.lastIndexOf("."));
    const importLine = `export { ${fileName} } from "./utils/${cleanPath}";`;
    imports.push(importLine);
  }
  const contentIndexJs = `\n \n // Utils \n` + imports.join("\n");
  return {
    contentIndexJs,
  };
}

function saveIndexJs(contentIndexJs, target = pathTargetIndexJs) {
  fs.writeFileSync(target, contentIndexJs);
}
