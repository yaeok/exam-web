# 運用ルール

## 1.ブランチ運用

主要ブランチ

- main
- dev

基本的に dev からブランチを切っていく。
命名規則

### 画面系の開発

画面の見た目や挙動に関する実装は以下のフォーマットでブランチを切る

```
feature/ui_{画面名}
```

### 処理系の開発

DB への格納処理や、ボタンを押下で呼び出される処理などは以下のフォーマットでブランチを切る

```
feature/repository_{処理名}
```

### バグ修正

バグを検知した場合、issue を起票し、その番号をブランチ名に入れてブランチを切る

```
bug/issue_#{番号}
```

## 2.Next.js のページ作成

ページを実装する際は、以下の宣言方法でページを実装する

```
export default function Home() {
  return (
    <div>
      <h1>Hello World!</h1>
    </div>
  )
}
```

## 3.命名規則

変数、関数共通して以下の略語を使用すること

- 登録処理(reg)
- 更新処理(upd)
- 削除処理(del)
- 単一取得処理(get\_{処理名}\_ByUniqueKey)
- 複数取得処理(gets)
- 検索処理(find)

### (1).変数

変数を宣言する際、先頭文字は型を付けて宣言すること

```
// String型の場合
const strWord: String = ''

// int型の場合
const intNumber: int = 0

// Object型の場合
const recObject: ObjectA = new ObjectA()

// List型の場合
const lstArray: String[] = []
```

### (2).関数
