#!/usr/bin/env node
"use strict";

// 標準入力を扱うためのモジュールを読み込む
const readline = require("readline");

// 入力受付の準備
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 正の整数かどうかを判定する関数
function isPositiveInteger(value) {
  // 数値に変換でき、整数で、0より大きいかを確認
  return (
    Number.isInteger(Number(value)) &&
    Number(value) > 0
  );
}

// 合計金額の入力
rl.question("合計金額を入力してください: ", (total) => {
  // 未入力チェック
  if (total.trim() === "") {
    console.log("合計金額を入力してください。");
    rl.close();
    return;
  }

  // 正の整数チェック
  if (!isPositiveInteger(total)) {
    console.log("正の整数で入力してください。");
    rl.close();
    return;
  }

  // 人数の入力
  rl.question("人数を入力してください: ", (people) => {
    // 未入力チェック
    if (people.trim() === "") {
      console.log("人数を入力してください。");
      rl.close();
      return;
    }

    // 正の整数チェック（0も不可）
    if (!isPositiveInteger(people)) {
      console.log("正の整数で入力してください。");
      rl.close();
      return;
    }

    // 割り勘の計算
    const result = Number(total) / Number(people);
    
    // 結果を小数点以下1桁まで表示
    console.log(`1人あたりの金額は${result.toFixed(1)}円です。`);


    rl.close();
  });
});
