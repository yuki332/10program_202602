#!/usr/bin/env node

// コマンドライン引数から名前を取得（未入力の場合は「ゲスト」）
const name = process.argv[2] || 'ゲスト';

// 現在時刻を取得
const now = new Date();
const hour = now.getHours();

// 時間帯に応じて挨拶を決定
let greeting;
if (hour >= 5 && hour <= 11) {
  greeting = 'おはよう';
} else if (hour >= 12 && hour <= 17) {
  greeting = 'こんにちは';
} else {
  greeting = 'こんばんは';
}

// 挨拶を出力
console.log(`${greeting} ${name}さん`);
