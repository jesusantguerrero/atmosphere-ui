"use strict";
// taken from https://github.com/vuestorefront/storefront-ui
import fs from "fs";
import glob  from "glob";
import * as url from "node:url";
import path, { dirname } from "path";
import process from "process";
import { fileURLToPath } from "url";

const _dirname =
    typeof __dirname !== "undefined"
        ? __dirname
        : dirname(fileURLToPath(import.meta.url));

const pathTargetIndexJs = path.resolve(_dirname, "..", "src", "index.ts");

const pathVueComponentsRoot = path.resolve(_dirname, "..", "src/components");
const pathUtilsRoot = path.resolve(_dirname, "..", "src/utils");

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
        const atComponentName = pathComponentVue.replace(
            /.*\/(At.+)\.vue/,
            "$1"
        );
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

if (import.meta.url.startsWith("file:")) {
    const modulePath = url.fileURLToPath(import.meta.url);
    if (process.argv[1] === modulePath) {
        // (B)
        createIndexFiles();
    }
}
