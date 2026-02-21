#!/usr/bin/env node
"use strict";

const readline = require("readline");

/**
 * 現在時刻から挨拶を決める
 * 04:00-09:59 => おはようございます
 * 10:00-17:59 => こんにちは
 * 18:00-03:59 => こんばんは
 */
function getGreetingByTime(date = new Date()) {
  const h = date.getHours(); // 0-23
  if (h >= 4 && h <= 9) return "おはようございます";
  if (h >= 10 && h <= 17) return "こんにちは";
  return "こんばんは"; // 18-23, 0-3
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Input your name: ", (answer) => {
  const name = (answer ?? "").trim();

  if (!name) {
    console.log("名前が入力されていません。");
    rl.close();
    return;
  }

  const greeting = getGreetingByTime();
  console.log(`${name}さん、${greeting}`);
  rl.close();
});
