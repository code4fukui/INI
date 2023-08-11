import * as t from "https://deno.land/std/testing/asserts.ts";
import { INI } from "./INI.js";

Deno.test("simple", () => {
  const ini = `[section]
a=3
b=def
`;
  const obj = INI.parse(ini);
  t.assertEquals(obj, { section: { a: "3", b: "def" }});
  t.assertEquals(INI.stringify(obj), ini);
});

Deno.test("flat", () => {
  const ini = `a=3
b=def
`;
  const obj = INI.parse(ini);
  t.assertEquals(obj, { a: "3", b: "def" });
  t.assertEquals(INI.stringify(obj), ini);
});

Deno.test("path", () => {
  const ini = `[a]
a=3
[a/b]
c=5
`;
  const obj = INI.parse(ini);
  t.assertEquals(obj, { a: { a: "3", b: { c: "5" } } });
  t.assertEquals(INI.stringify(obj), ini);
});

Deno.test("path2", () => {
  const ini = `[a]
a=3
[a/b/c]
d=5
[b]
k=3
`;
  const obj = INI.parse(ini);
  t.assertEquals(obj, { a: { a: "3", b: { c: { d: "5" } } }, b: { k: "3" } });
  t.assertEquals(INI.stringify(obj), ini);
});

Deno.test("comment", () => {
  const ini = `a=3
  ; comment
b=def
 ; コメント
`;
  const ini2 = `a=3
b=def
`;
  const obj = INI.parse(ini);
  t.assertEquals(obj, { a: "3", b: "def" });
  t.assertEquals(INI.stringify(obj), ini2);
});

Deno.test("inline comment is not supported", () => {
  const ini = `a=3 ; comment
`;
  const obj = INI.parse(ini);
  t.assertEquals(obj, { a: "3 ; comment" });
  t.assertEquals(INI.stringify(obj), ini);
});

Deno.test("escape as JSON string", () => {
  const ini = `a=a\\nb
b=\u0066
`;
  const obj = INI.parse(ini);
  t.assertEquals(obj, { a: "a\nb", b: "f" });
  t.assertEquals(INI.stringify(obj), ini);
});

Deno.test("ja name", () => {
  const ini = `鍵=ABC
データ=123
`;
  const obj = INI.parse(ini);
  t.assertEquals(obj, { 鍵: "ABC", データ: "123" });
  t.assertEquals(INI.stringify(obj), ini);
});

Deno.test("array num", () => {
  const obj = [1, 2, 3];
  const ini = INI.stringify(obj);
  const ini2 = `0=1
1=2
2=3
`;
  t.assertEquals(ini, ini2);
});

Deno.test("array obj", () => {
  const obj = [1, { a: "2" }, 3];
  const ini = INI.stringify(obj);
  const ini2 = `0=1
[1]
a=2
[]
2=3
`;
  t.assertEquals(ini, ini2);
});
