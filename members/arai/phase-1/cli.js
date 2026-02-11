#!/usr/bin/env node
// シバン（Shebang）: このファイルをNode.jsで実行することを指定

/**
 * Simple CLI program that greets the user
 * Usage: node cli.js <name>
 */
// プログラムの説明をドキュメントコメントで記載

function main() {
  // メイン関数の定義：プログラムの処理をまとめる

  const args = process.argv.slice(2)
  // process.argv: コマンドライン引数の配列
  // [0]はNode.jsのパス、[1]はスクリプトのパス、[2]以降がユーザー指定の引数
  // slice(2)で最初の2つをスキップして、ユーザーが入力した引数だけを取得

  if (args.length === 0) {
    // 引数が1つも渡されていない場合の処理

    console.error('エラー: 名前を指定してください')
    // console.error: エラーメッセージを標準エラー出力に表示

    console.error('使い方: node cli.js <名前>')
    // 正しい使い方をユーザーに案内

    process.exit(1)
    // プログラムを終了（終了コード1 = エラーで終了したことを示す）
  }

  const name = args[0]
  // 最初の引数を変数nameに代入（これが挨拶する相手の名前）

  if (typeof name !== 'string' || name.trim().length === 0) {
    // バリデーション: nameが文字列型かつ、空白を除いた長さが0より大きいかチェック
    // trim()は前後の空白を削除するメソッド

    console.error('エラー: 有効な名前を指定してください')
    // バリデーションエラーのメッセージを表示

    process.exit(1)
    // プログラムを終了（エラー）
  }

  console.log(`こんにちは${name}`)
  // テンプレートリテラルを使って「こんにちは」と名前を組み合わせて出力
  // ${name}の部分に変数nameの値が埋め込まれる
}

main()
// main関数を実行してプログラムを開始
