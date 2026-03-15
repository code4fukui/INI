# INI - Human-friendly data encoding

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

INI.js is an implementation of the INI text file format.

## Usage

- `INI.stringify`
- `INI.parse`

```js
import { INI } from "https://code4fukui.github.io/INI/INI.js";

const obj = { section: { a: "ABC", b: "123" } };
const ini = INI.stringify(obj);
console.log(ini);
const obj2 = INI.parse(`[section]
a=ABC
b=123
`);
console.log(obj2);
```

```js
import { INI } from "https://code4fukui.github.io/INI/INI.js";

const obj = INI.parse(await Deno.readTextFile("test.ini"));
console.log(obj);
console.log(obj.a.a);
```

## Specification

- Values support strings (numbers will be converted to strings)
- Strings are encoded as JSON strings
- Section names are used as object paths
- Default section is `[]`
- Comment lines start with `;`

## License

MIT License