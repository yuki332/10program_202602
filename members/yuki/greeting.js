// コマンドライン引数から名前を取得
// process.argv[2] で、実行時に指定した1番目の引数を取得
const name = process.argv[2];

// 名前が指定されていない場合はエラーメッセージを表示して終了
if (!name) {
  console.error("使い方: node greeting.js <名前>");
  process.exit(1);
}

// 現在の時刻を取得（0〜23の数値）
const hour = new Date().getHours();

// 時間帯に応じて挨拶を選択
let greeting;
if (hour >= 5 && hour < 11) {
  // 5時〜10時: 朝
  greeting = "おはようございます";
} else if (hour >= 11 && hour < 18) {
  // 11時〜17時: 昼
  greeting = "こんにちは";
} else {
  // 18時〜4時: 夜
  greeting = "こんばんは";
}

// 結果を出力（`${変数}`で変数を文字列に埋め込める）
console.log(`${name}さん、${greeting}`);
