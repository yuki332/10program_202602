##　実験レポート

### 実験1: メッセージを追加する
**方法**
"Hello, world!", "This is a test.", "Day6"の3つのメッセージを順に追加した．

**結果**
    F12 Console に表示されたログ: 
index.html:60 [CLIENT] messages: ['Hello, world!']
index.html:60 [CLIENT] messages: (2) ['Hello, world!', 'This is a test.']
index.html:60 [CLIENT] messages: (3) ['Hello, world!', 'This is a test.', 'Day6']

    画面の変化:
メッセージボックスの下に，箇条書きで
Hello, world!
This is a test.
Day6
という文字が追加されていった．

### 実験2: F5キーを押してページを更新する
    予想：
ページを更新するとコンソールが一度破棄されて，データは消える．

    結果: 
画面，コンソールともに，何も書かれていないものに切り替わった．

    分かったこと:
画面を更新したことでindex.htmlが読み直されて，JavaScriptの配列の中に追加したデータが，追加される前の状態，つまり空の状態になったと考えられる．実際，index.htmlの
    <div class="row">
      <input id="messageInput" type="text" placeholder="メッセージを入力" />
      <button id="addButton" type="button">追加</button>
    </div>
の部分を書き換え，
    <div class="row">
      <input id="messageInput" type="text" placeholder="メッセージを入力 ex:aaaa" />
      <button id="addButton" type="button">追加</button>
    </div>
としてページを更新すると，メッセージ入力欄の文字も変化したからである．