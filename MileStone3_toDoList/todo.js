#!/usr/bin/env node
"use strict";

const readline = require("readline");

// ====== In-memory storage (DBなし / ファイル保存なし) ======
/**
 * tasks: { name: string, done: boolean }[]
 */
const tasks = [];

// ====== Helpers ======
function findTaskByName(name) {
  return tasks.find(t => t.name === name);
}

function addTask(name) {
  // Process: 入力されたタスク名を受け取り、未完了で保存。保存タスクをすべて読み込む（= tasksを見る）
  if (findTaskByName(name)) {
    console.log("同名のタスクがあります。タスク名を変更してください。");
    return;
  }
  tasks.push({ name, done: false });
  console.log("タスクが追加されました");
}

function listTasks() {
  // Process: 保存しているタスクをすべて読み込む（= tasks を走査）
  if (tasks.length === 0) {
    // 空のときに表示
    console.log("(タスクはありません)");
    return;
  }

  for (const t of tasks) {
    // Output: 未完了はタスク名のみ、完了は先頭に「*」
    if (t.done) {
      console.log(`*${t.name}`);
    } else {
      console.log(t.name);
    }
  }
}

function doneTask(name) {
  // Process: 保存タスクから同名を探し、*をつけて保存（= done=true にする）
  const task = findTaskByName(name);
  if (!task) {
    console.log("リストの中にそのようなタスクはありません。");
    return;
  }
  task.done = true;
  console.log("正常に処理されました。");
}
// ヘルプ表示
function printHelp() {
  console.log("使い方:");
  console.log('タスクを追加:  add (タスクの名称)');
  console.log("リストを表示:  list");
  console.log('タスクを完了:  done (タスクの名称)');
  console.log("終了する:  exit");
}

// ====== CLI loop ======
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

printHelp();
rl.prompt();

rl.on("line", (line) => {
  const input = line.trim();

  if (input === "") {
    rl.prompt();
    return;
  }

  if (input === "exit" || input === "quit") {
    rl.close();
    return;
  }

  if (input === "help") {
    printHelp();
    rl.prompt();
    return;
  }

  // コマンド + 引数（タスク名はスペースを含む可能性があるので、先頭だけコマンドとして切る）
  const [cmd, ...rest] = input.split(" ");
  const arg = rest.join(" ").trim(); // タスク名

  if (cmd === "add") {
    if (!arg) {
      console.log("タスク名を入力してください。例: add レポートを書く");
    } else {
      addTask(arg);
    }
  } else if (cmd === "list") {
    listTasks();
  } else if (cmd === "done") {
    if (!arg) {
      console.log("タスク名を入力してください。例: done レポートを書く");
    } else {
      doneTask(arg);
    }
  } else {
    console.log("不明なコマンドです。help を参照してください。");
  }

  rl.prompt();
});

rl.on("close", () => {
  console.log("終了します。");
  process.exit(0);
});