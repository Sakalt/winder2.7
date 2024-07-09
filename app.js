// ウィンドウを作成する関数
function createWindow(title, content) {
  const newWindow = document.createElement('div');
  newWindow.className = 'window';
  newWindow.innerHTML = `
    <div class="title-bar">
      ${title}
      <div>
        <button class="window-button minimize-button" onclick="minimizeWindow(this)">−</button>
        <button class="window-button maximize-button" onclick="maximizeWindow(this)">□</button>
        <button class="window-button close-button" onclick="closeWindow(this)">×</button>
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

// 電卓アプリを開く関数
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

// タスクマネージャーアプリを開く関数
function openTaskManager() {
  createWindow('タスクマネージャー', taskManagerContent());
}

function taskManagerContent() {
  return '<div id="task-list">タスク一覧をここに表示</div>';
}

// ブラウザアプリを開く関数
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

// 設定アプリを開く関数
function openSettings() {
  createWindow('設定', settingsContent());
}

function settingsContent() {
  return `
    <h2>設定</h2>
    <p>ここに設定内容を記述します。</p>
  `;
}

// 天気アプリを開く関数
function openWeatherApp() {
  createWindow('天気アプリ', weatherAppContent());
}

function weatherAppContent() {
  return `
    <div>
      <input type="text" id="city-name" placeholder="都市名を入力">
      <button onclick="getWeather()">天気を取得</button>
    </div>
    <div id="weather-result"></div>
  `;
}

// 天気情報を取得する関数
async function getWeather() {
  const cityName = document.getElementById('city-name').value;
  const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // ここに自分のAPIキーを入力
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=ja`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      const weatherResult = document.getElementById('weather-result');
      weatherResult.innerHTML = `
        <h3>${data.name}</h3>
        <p>${data.weather[0].description}</p>
        <p>温度: ${data.main.temp}℃</p>
        <p>湿度: ${data.main.humidity}%</p>
        <p>風速: ${data.wind.speed}m/s</p>
      `;
    } else {
      document.getElementById('weather-result').innerText = '天気情報を取得できませんでした。';
    }
  } catch (error) {
    console.error('天気情報の取得中にエラーが発生しました:', error);
    document.getElementById('weather-result').innerText = '天気情報を取得できませんでした。';
  }
}

// ペイントアプリを開く関数
function openPaintApp() {
  createWindow('ペイントアプリ', paintAppContent());
}

function paintAppContent() {
  return `
    <canvas id="paint-canvas" width="800" height="600"></canvas>
      <input type="color" id="color-picker" value="#000000">
      <button onclick="clearCanvas()">クリア</button>
      <button onclick="exportCanvas()">エクスポート</button>
    </div>
  `;
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

// 時計アプリを開く関数
function openClockApp() {
  createWindow('時計アプリ', clockAppContent());
  startClock();
}

function clockAppContent() {
  return `<div id="clock"></div>`;
}

// 時計を表示する関数
function startClock() {
  const clockElement = document.getElementById('clock');

  function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

// 初期設定
document.addEventListener('DOMContentLoaded', function() {
  // 初期ウィンドウを開く
  openClockApp();
  openPaintApp();
});
