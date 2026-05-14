# INI - 人間が読みやすいデータエンコーディング

INI.js は INI テキストファイル形式の実装です。

## 使い方

本ライブラリは主に2つの関数を提供します：

- `INI.stringify`: JavaScriptオブジェクトをINI形式の文字列に変換します。
- `INI.parse`: INI形式の文字列を解析し、JavaScriptオブジェクトを返します。

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

- 値は文字列として保存されます（数値は文字列に変換されます）
- 文字列はJSON文字列としてエンコードされます
- セクション名はオブジェクトのパスとして使用されます
- デフォルトのセクションは `[]` です
- コメント行は `;` で始まります

## ライセンス

MIT License — 詳細は [LICENSE](LICENSE) を参照してください。
