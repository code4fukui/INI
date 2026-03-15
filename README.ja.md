# INI - ユーザーフレンドリーなデータ表現

INI.jsは、INIテキストファイル形式の実装です。INIは人間が読み書きしやすいデータ表現形式です。

## 使い方

- `INI.stringify`関数は、JavaScriptオブジェクトをINI形式の文字列に変換します。
- `INI.parse`関数は、INI形式の文字列をJavaScriptオブジェクトに変換します。

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

## 仕様

- 値は文字列で表現され、数値は文字列に変換されます。
- 文字列はJSON文字列エンコーディングでエスケープされます。
- セクション名はオブジェクトのパスとして使用されます。
- デフォルトのセクション名は`[]`です。
- コメント行は`;`から始まります。

## ライセンス

MITライセンス