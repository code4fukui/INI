# INI - ユーザーフレンドリーなデータ表現

INI.jsはINIテキストファイル形式の実装です。

## 使い方

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

## 仕様

- 値は文字列（数値は文字列に変換されます）
- 文字列はJSON文字列エンコーディングでエスケープされます
- セクション名はオブジェクトのパスになります
- デフォルトのセクションは[]
- コメント行は";"から始まります

## ライセンス

MITライセンス