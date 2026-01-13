"use strict";
let allCount = 0;
let completedCount = 0;
let uncompletedCount = 0;

// 要素を捕まえる
const todoInput = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");
const allCountElement = document.getElementById("all-count");
const completedCountElement = document.getElementById("completed-count");
const uncompletedCountElement = document.getElementById("uncompleted-count");

// ボタンをクリックしたときの動きを決める
addButton.addEventListener("click", () => {
  // 1. 空チェック
  if (todoInput.value.trim() === "") return;

  // 2. カウント更新
  allCount++;
  uncompletedCount++;
  allCountElement.innerText = allCount;
  uncompletedCountElement.innerText = uncompletedCount;

  // 3. 要素を作る
  const li = document.createElement("li");
  const todoText = document.createElement("span");
  todoText.innerText = todoInput.value;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const editButton = document.createElement("button");
  editButton.innerText = "編集";
  let editInput = null;

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";

  // 4. イベントをつける
  // チェックボックスのイベント
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      completedCount++;
      uncompletedCount--;
    } else {
      completedCount--;
      uncompletedCount++;
    }
    completedCountElement.innerText = completedCount;
    uncompletedCountElement.innerText = uncompletedCount;
  });

  // 編集ボタンのイベント
  editButton.addEventListener("click", () => {
    if (editButton.innerText === "編集") {
      editInput = document.createElement("input");
      editInput.type = "text";
      editInput.value = todoText.innerText;
      todoText.style.display = "none";
      li.insertBefore(editInput, editButton);
      editButton.innerText = "保存";
    } else if (editButton.innerText === "保存") {
      todoText.innerText = editInput.value;
      todoText.style.display = "";
      editInput.remove();
      editButton.innerText = "編集";
    }
  });

  // 削除ボタンのイベント
  deleteButton.addEventListener("click", () => {
    if (confirm("本当によろしいですか？")) {
      allCount--;
      if (checkbox.checked) {
        completedCount--;
      } else {
        uncompletedCount--;
      }
      allCountElement.innerText = allCount;
      completedCountElement.innerText = completedCount;
      uncompletedCountElement.innerText = uncompletedCount;
      li.remove();
    }
  });

  // 5. li に全部追加
  li.appendChild(checkbox);
  li.appendChild(todoText);
  li.appendChild(editButton);
  li.appendChild(deleteButton);

  // 6. todoList に追加
  const todoList = document.getElementById("todo-list");
  todoList.appendChild(li);

  // 7. 入力欄クリア
  todoInput.value = "";
});
