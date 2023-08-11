# INI - human friendly data encoding

INI.js is an implementation of INI text file format.

## Usage

- INI.stringify
- INI.parse

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

## Spec

- value supports string (number will convert to string)
- string as JSON string encoding
- section name as object path
- default section is []
- comment line starts with ';'
