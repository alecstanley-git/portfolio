import { test } from "node:test";
import assert from "node:assert/strict";
import { parseInline } from "../src/lib/inline.js";

const text = (t) => ({ type: "text", text: t });

test("plain text is one text token", () => {
  assert.deepEqual(parseInline("hello"), [text("hello")]);
});

test("bold", () => {
  assert.deepEqual(parseInline("a **b** c"), [text("a "), { type: "strong", text: "b" }, text(" c")]);
});

test("italic with * and _", () => {
  assert.deepEqual(parseInline("*x*"), [{ type: "em", text: "x" }]);
  assert.deepEqual(parseInline("_x_"), [{ type: "em", text: "x" }]);
});

test("link", () => {
  assert.deepEqual(parseInline("see [the report](https://x.org/a_b*c)"), [
    text("see "),
    { type: "link", text: "the report", href: "https://x.org/a_b*c" },
  ]);
});

test("link with parentheses in URL", () => {
  assert.deepEqual(parseInline("[w](https://en.wikipedia.org/wiki/Foo_(bar))"), [
    { type: "link", text: "w", href: "https://en.wikipedia.org/wiki/Foo_(bar)" },
  ]);
});

test("literal asterisk survives", () => {
  assert.deepEqual(parseInline("5 * 3 = 15"), [text("5 * 3 = 15")]);
});

test("snake_case survives", () => {
  assert.deepEqual(parseInline("call my_var_name now"), [text("call my_var_name now")]);
});

test("unclosed marks are literal", () => {
  assert.deepEqual(parseInline("**open"), [text("**open")]);
  assert.deepEqual(parseInline("[text](no-close"), [text("[text](no-close")]);
});

test("only http(s), mailto and site-relative links", () => {
  assert.deepEqual(parseInline("[x](javascript:alert(1))"), [text("[x](javascript:alert(1))")]);
  assert.deepEqual(parseInline("[me](mailto:a@b.com)"), [{ type: "link", text: "me", href: "mailto:a@b.com" }]);
  assert.deepEqual(parseInline("[p](/work/p-013)"), [{ type: "link", text: "p", href: "/work/p-013" }]);
});
