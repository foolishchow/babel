import { parse } from "../lib/index.js";
import { writeFileSync, existsSync, mkdirSync } from "fs";
import { resolve } from "path";

const dir = resolve(
  resolve("./packages/babel-parser/test"),
  "vue-template-result",
);
const writeResult = (name, node) => {
  if (!existsSync(dir)) {
    mkdirSync(dir);
  }
  writeFileSync(`${dir}/${name}.json`, JSON.stringify(node, null, 4));
};

function getParser(code) {
  return () =>
    parse(code, {
      sourceType: "module",
      plugins: [
        // enable jsx and flow syntax
        "jsx",
      ],
    });
}

describe("vue template", function () {
  it("should parse bind short", function () {
    const node = getParser(`<div :userName="name"></div>`)();
    writeResult("parse-bind", node);
  });
  it("should parse bind full", function () {
    const node = getParser(`<div v-bind:userName="name"></div>`)();
    writeResult("parse-bind-full", node);
  });
  it("should parse click short", function () {
    const node = getParser(`<div @click="c"></div>`)();
    writeResult("parse-click-short", node);
  });
  it("should parse click full", function () {
    const node = getParser(`<div v-on:click="c"></div>`)();
    writeResult("parse-click-full", node);
  });

  it("should parse click full modifier", function () {
    const node = getParser(`<div v-on:click.native="c"></div>`)();
    writeResult("parse-click-full-modifier", node);
  });
  it("should parse click full modifier empty", function () {
    const node = getParser(`<div v-on:click.stop></div>`)();
    writeResult("parse-click-full-modifier-empty", node);
  });
  it("should parse slot short", function () {
    const node = getParser(`<div #header="c"></div>`)();
    writeResult("parse-slot-short", node);
  });
  it("should parse slot full", function () {
    const node = getParser(`<div v-slot:header="c"></div>`)();
    writeResult("parse-slot-full", node);
  });
});
