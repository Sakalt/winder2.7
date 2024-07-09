// 電卓ウィンドウを開く関数
function openCalculator() {
  createWindow('電卓', calculatorContent());
}

// 電卓のコンテンツを設定する関数
function calculatorContent() {
  return `
    <input type="text" id="calc-display" disabled>
    <br>
    <button onclick="inputCalc('1')">1</button>
    <button onclick="inputCalc('2')">2</button>
    <button onclick="inputCalc('3')">3</button>
    <button onclick="inputCalc('+')">+</button>
    <br>
    <button onclick="inputCalc('4')">4</button>
    <button onclick="inputCalc('5')">5</button>
    <button onclick="inputCalc('6')">6</button>
    <button onclick="inputCalc('-')">-</button>
    <br>
    <button onclick="inputCalc('7')">7</button>
    <button onclick="inputCalc('8')">8</button>
    <button onclick="inputCalc('9')">9</button>
    <button onclick="inputCalc('*')">*</button>
    <br>
    <button onclick="inputCalc('0')">0</button>
    <button onclick="inputCalc('/')">/</button>
    <button onclick="inputCalc('=')">=</button>
    <button onclick="inputCalc('C')">C</button>
  `;
}

function inputCalc(value) {
  const display = document.getElementById('calc-display');
  if (value === 'C') {
    display.value = '';
  } else if (value === '=') {
    display.value = eval(display.value);
  } else {
    display.value += value;
  }
}

// タスクマネージャーウィンドウを開く関数
function openTaskManager() {
  createWindow('タスクマネージャー', taskManagerContent());
}

function taskManagerContent() {
  return '<div id="task-list">タスク一覧をここに表示</div>';
}

// ブラウザウィンドウを開く関数
function openBrowser() {
  createWindow('windbrowser', browserContent());
}

function browserContent() {
  return `
    <input type="text" id="browser-url" placeholder="URLを入力">
    <button onclick="loadUrl()">移動</button>
    <iframe id="browser-frame" style="width: 100%; height: calc(100% - 30px);"></iframe>
  `;
}

function loadUrl() {
  const url = document.getElementById('browser-url').value;
  document.getElementById('browser-frame').src = url;
}
// 設定ウィンドウを開く関数
function openSettings() {
  createWindow('設定', settingsContent());
}

function settingsContent() {
  return `
    <h2>設定</h2>
    <p>ここに設定内容を記述します。</p>
  `;
}
// 電卓を開く関数
function openCalculator() {
  createWindow('電卓', calculatorContent());
}

// ブラウザを開く関数
function openBrowser() {
  createWindow('ブラウザ', browserContent());
}

// ウィンドウを作成する関数
function createWindow(title, content) {
  const newWindow = document.createElement('div');
  newWindow.className = 'window';
  newWindow.innerHTML = `
    <div class="title-bar">
      ${title}
      <div>
        <button onclick="minimizeWindow(this)">−</button>
        <button onclick="maximizeWindow(this)">□</button>
        <button onclick="closeWindow(this)">×</button>
      </div>
    </div>
    <div class="content">${content}</div>
  `;
  document.getElementById('desktop').appendChild(newWindow);
  makeDraggable(newWindow);
}

// ペイントアプリのコンテンツを設定する関数
function paintAppContent() {
  return `
    <canvas id="paint-canvas" width="800" height="600"></canvas>
    <div>
      <input type="color" id="color-picker" value="#000000">
      <button onclick="clearCanvas()">クリア</button>
      <button onclick="exportCanvas()">エクスポート</button>
    </div>
  `;
}

// 時計アプリのコンテンツを設定する関数
function clockAppContent() {
  return `<div id="clock"></div>`;
}

// タイマーアプリのコンテンツを設定する関数
function timerAppContent() {
  return `
    <div>
      <input type="number" id="timer-minutes" placeholder="分" min="0">
      <input type="number" id="timer-seconds" placeholder="秒" min="0">
      <button onclick="startTimer()">スタート</button>
      <button onclick="resetTimer()">リセット</button>
    </div>
    <div id="timer-display">00:00</div>
  `;
}

// セットアップアプリのコンテンツを設定する関数
function setupAppContent() {
  return `<div>セットアップ機能はここに表示されます。</div>`;
}

// キャンバスを取得
const canvas = document.getElementById('paint-canvas');
const ctx = canvas.getContext('2d');
let isPainting = false;
let currentColor = '#000000'; // 初期色

// マウスイベントの設定
canvas.addEventListener('mousedown', startPaint);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', endPaint);
canvas.addEventListener('mouseleave', endPaint);

// 描画を開始する関数
function startPaint(e) {
  isPainting = true;
  draw(e);
}

// 描画する関数
function draw(e) {
  if (!isPainting) return;

  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.strokeStyle = currentColor;

  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}

// 描画を終了する関数
function endPaint() {
  isPainting = false;
  ctx.beginPath();
}

// キャンバスをクリアする関数
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// キャンバスをエクスポートする関数
function exportCanvas() {
  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = 'painting.png';
  link.click();
}

// 色選択UIの設定
function setupColorPicker() {
  const colorPicker = document.getElementById('color-picker');
  colorPicker.addEventListener('input', function() {
    currentColor = colorPicker.value;
  });
}

// 時計の表示を開始する関数
function startClock() {
  const clock = document.getElementById('clock');
  setInterval(() => {
    const now = new Date();
    clock.innerText = now.toLocaleTimeString();
  }, 1000);
}

// タイマーの開始関数
function startTimer() {
  const minutes = parseInt(document.getElementById('timer-minutes').value) || 0;
  const seconds = parseInt(document.getElementById('timer-seconds').value) || 0;
  let totalTime = minutes * 60 + seconds;
  const timerDisplay = document.getElementById('timer-display');

  const interval = setInterval(() => {
    const min = Math.floor(totalTime / 60);
    const sec = totalTime % 60;
    timerDisplay.innerText = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    totalTime--;

    if (totalTime < 0) {
      clearInterval(interval);
      timerDisplay.innerText = '00:00';
    }
  }, 1000);
}

// タイマーのリセット関数
function resetTimer() {
  document.getElementById('timer-display').innerText = '00:00';
  document.getElementById('timer-minutes').value = '';
  document.getElementById('timer-seconds').value = '';
}

// ウィンドウをドラッグ可能にする関数
function makeDraggable(element) {
  let isMouseDown = false;
  let offsetX, offsetY;

  element.querySelector('.title-bar').addEventListener('mousedown', function(e) {
    isMouseDown = true;
    offsetX = e.clientX - element.offsetLeft;
    offsetY = e.clientY - element.offsetTop;
  });

  document.addEventListener('mousemove', function(e) {
    if (isMouseDown) {
      element.style.left = `${e.clientX - offsetX}px`;
      element.style.top = `${e.clientY - offsetY}px`;
    }
  });

  document.addEventListener('mouseup', function() {
    isMouseDown = false;
  });
}

function closeWindow(button) {
  button.parentElement.parentElement.parentElement.remove();
}

function minimizeWindow(button) {
  const window = button.parentElement.parentElement.parentElement;
  window.style.display = 'none';
}

function maximizeWindow(button) {
  const window = button.parentElement.parentElement.parentElement;
  window.style.width = '100%';
  window.style.height = '100%';
}
