import { parse } from "../lib/index.js";

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

describe("vue template bind", function () {
  it("should parse", function () {
    const node = getParser(`<div :bc="c"></div>`)();
    console.info(JSON.stringify(node, null, 4));
  });
});

describe("vue template bind full", function () {
  it("should parse full bind", function () {
    const node = getParser(`<div v-bind:bcd="c"></div>`)();
    console.info(JSON.stringify(node, null, 4));
  });
});
