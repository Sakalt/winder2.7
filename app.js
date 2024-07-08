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

// 画像を含むコンテンツを返す関数
function calculatorContent() {
  return `
    <h2>電卓</h2>
    <p>ここに電卓の機能を実装します。</p>
  `;
}

function browserContent() {
  return `
    <h2>ブラウザ</h2>
    <p>ここにブラウザの機能を実装します。</p>
  `;
}
