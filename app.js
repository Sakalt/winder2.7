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

// ウィンドウをドラッグ可能にする関数
function makeDraggable(element) {
  let isMouseDown = false;
  let offsetX, offsetY;

  element.querySelector('.title-bar').addEventListener('mousedown', function(e) {
    isMouseDown = true;
    offsetX = e.clientX - element.offsetLeft;
    offsetY = e.clientY - element.offsetTop;

    // ドラッグ中に他の要素がマウス操作を奪わないようにするために、イベントをキャプチャリングモードで処理します。
    e.stopPropagation();
    e.preventDefault();
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

// ウィンドウを閉じる関数
function closeWindow(button) {
  button.closest('.window').remove();
}

// ウィンドウを最小化する関数
function minimizeWindow(button) {
  const window = button.closest('.window');
  window.style.display = 'none';
}

// ウィンドウを最大化する関数
function maximizeWindow(button) {
  const window = button.closest('.window');
  window.style.width = '100%';
  window.style.height = '100%';
}

// 電卓を開く関数
function openCalculator() {
  createWindow('電卓', calculatorContent());
}

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

// タイマーアプリを開く関数
function openTimerApp() {
  createWindow('タイマーアプリ', timerAppContent());
}

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

// ブラウザを開く関数
function openBrowser() {
  createWindow('ブラウザ', browserContent());
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

// セットアップアプリを開く関数
function openSetupApp() {
  createWindow('セットアップアプリ', setupAppContent());
}

function setupAppContent() {
  return `<div>セットアップ機能はここに表示されます。</div>`;
}

// 時計アプリを開く関数
function openClockApp() {
  createWindow('時計アプリ', clockAppContent());
  startClock();
}

function clockAppContent() {
  return `<div id="clock"></div>`;
}

function startClock() {
  const clock = document.getElementById('clock');
  setInterval(() => {
    const now = new Date();
    clock.innerText = now.toLocaleTimeString();
  }, 1000);
}

// ペイントアプリを開く関数
function openPaintApp() {
  createWindow('ペイントアプリ', paintAppContent());
}

function paintAppContent() {
  return `
    <canvas id="paint-canvas" width="800" height="600"></canvas>
    <br>
    <button onclick="clearCanvas()">クリア</button>
  `;
}

function clearCanvas() {
  const canvas = document.getElementById('paint-canvas');
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
}

// タスクマネージャーアプリを開く関数
function openTaskManager() {
  createWindow('タスクマネージャーアプリ', taskManagerContent());
}

function taskManagerContent() {
  return `<div>タスクマネージャー機能はここに表示されます。</div>`;
}

// 設定アプリを開く関数
function openSettings() {
  createWindow('設定アプリ', settingsContent());
}

function settingsContent() {
  return `<div>設定機能はここに表示されます。</div>`;
}

// 他のアプリの関数（例：写真アプリ、カメラアプリ）を追加できます
