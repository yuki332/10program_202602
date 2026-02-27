/**
 * Base CRUD App - フロントエンドロジック
 * 
 * ユーザーUIとサーバーAPI間のやり取りを管理
 */

// グローバル変数
let currentEditingItemId = null;

// =====================================================
// 初期化（ページ読み込み時）
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('[FRONTEND] ページ読み込み完了');
    
    // イベントリスナー登録
    setupEventListeners();
    
    // アイテム一覧を読み込み
    loadItems();
});

// =====================================================
// イベントリスナー設定
// =====================================================
function setupEventListeners() {
    // 追加ボタン
    document.getElementById('addButton').addEventListener('click', addItem);
    
    // Enterキーで追加
    document.getElementById('titleInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addItem();
        }
    });
    
    // 完了ボタン
    document.getElementById('saveButton').addEventListener('click', saveEdit);
    
    // キャンセルボタン
    document.getElementById('cancelButton').addEventListener('click', closeEditModal);
    
    // Escキーでモーダルを閉じる
    document.getElementById('editModal').addEventListener('keypress', (e) => {
        if (e.key === 'Escape') {
            closeEditModal();
        }
    });
}

// =====================================================
// API: アイテム一覧取得
// =====================================================
async function loadItems() {
    try {
        console.log('[FRONTEND] アイテム一覧を取得中...');
        
        const response = await fetch('/api/items');
        const items = await response.json();
        
        console.log('[FRONTEND] アイテム一覧取得完了:', items.length, '件');
        
        // UI更新
        displayItems(items);
    } catch (error) {
        console.error('[FRONTEND] エラー:', error);
        alert('アイテム一覧の取得に失敗しました');
    }
}

// =====================================================
// API: アイテム作成
// =====================================================
async function addItem() {
    const titleInput = document.getElementById('titleInput');
    const title = titleInput.value.trim();
    
    if (!title) {
        alert('アイテム名を入力してください');
        return;
    }
    
    try {
        console.log('[FRONTEND] アイテム作成中:', title);
        
        const response = await fetch('/api/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title })
        });
        
        const newItem = await response.json();
        console.log('[FRONTEND] アイテム作成完了:', newItem);
        
        // 入力をクリア
        titleInput.value = '';
        
        // 一覧を更新
        loadItems();
    } catch (error) {
        console.error('[FRONTEND] エラー:', error);
        alert('アイテムの作成に失敗しました');
    }
}

// =====================================================
// API: アイテム削除
// =====================================================
async function deleteItem(id) {
    if (!confirm('このアイテムを削除してもよろしいですか?')) {
        return;
    }
    
    try {
        console.log('[FRONTEND] アイテム削除中: ID =', id);
        
        const response = await fetch(`/api/items/${id}`, {
            method: 'DELETE'
        });
        
        const result = await response.json();
        console.log('[FRONTEND] アイテム削除完了:', result);
        
        // 一覧を更新
        loadItems();
    } catch (error) {
        console.error('[FRONTEND] エラー:', error);
        alert('アイテムの削除に失敗しました');
    }
}

// =====================================================
// API: アイテム編集
// =====================================================
async function updateItem(id, newTitle) {
    if (!newTitle.trim()) {
        alert('アイテム名を入力してください');
        return;
    }
    
    try {
        console.log('[FRONTEND] アイテム更新中: ID =', id, 'Title =', newTitle);
        
        const response = await fetch(`/api/items/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: newTitle.trim() })
        });
        
        const result = await response.json();
        console.log('[FRONTEND] アイテム更新完了:', result);
        
        // 一覧を更新
        loadItems();
    } catch (error) {
        console.error('[FRONTEND] エラー:', error);
        alert('アイテムの更新に失敗しました');
    }
}

// =====================================================
// UI: アイテム一覧表示
// =====================================================
function displayItems(items) {
    const itemsList = document.getElementById('itemsList');
    
    // リストをクリア
    itemsList.innerHTML = '';
    
    if (items.length === 0) {
        itemsList.innerHTML = '<li style="text-align: center; color: #999; padding: 20px;">アイテムがありません</li>';
        return;
    }
    
    // 各アイテムをリスト表示
    items.forEach(item => {
        const li = document.createElement('li');
        li.className = 'item';
        li.innerHTML = `
            <span class="item-title">${escapeHtml(item.title)}</span>
            <div class="item-actions">
                <button class="btn btn-edit" onclick="openEditModal(${item.id})">編集</button>
                <button class="btn btn-delete" onclick="deleteItem(${item.id})">削除</button>
            </div>
        `;
        itemsList.appendChild(li);
    });
}

// =====================================================
// UI: 編集モーダル操作
// =====================================================
function openEditModal(id) {
    currentEditingItemId = id;
    
    // 現在のタイトルを取得
    const itemElement = event.target.closest('.item');
    const currentTitle = itemElement.querySelector('.item-title').textContent;
    
    // 入力フィールドに現在のタイトルを入力
    const editInput = document.getElementById('editInput');
    editInput.value = currentTitle;
    
    // モーダルを表示
    const modal = document.getElementById('editModal');
    modal.classList.remove('hidden');
    
    // フォーカスを入力フィールドに
    editInput.focus();
    editInput.select();
}

function closeEditModal() {
    const modal = document.getElementById('editModal');
    modal.classList.add('hidden');
    currentEditingItemId = null;
}

function saveEdit() {
    if (currentEditingItemId === null) {
        return;
    }
    
    const newTitle = document.getElementById('editInput').value;
    
    // モーダルを閉じる
    closeEditModal();
    
    // サーバーに更新を送信
    updateItem(currentEditingItemId, newTitle);
}

// =====================================================
// ユーティリティ: HTML エスケープ
// =====================================================
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}
