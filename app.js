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
  const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // ここにAPIキーを入力
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
  `;
}

const canvas = document.getElementById('paint-canvas');
const ctx = canvas.getContext('2d');
let isPainting = false;
let currentColor = '#000000';

canvas.addEventListener('mousedown', startPaint);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', endPaint);
canvas.addEventListener('mouseleave', endPaint);

function startPaint(e) {
  isPainting = true;
  draw(e);
}

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

function endPaint() {
  isPainting = false;
  ctx.beginPath();
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

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

function startClock() {
  const clock = document.getElementById('clock');
  setInterval(() => {
    const now = new Date();
    clock.innerText = now.toLocaleTimeString();
  }, 1000);
}

// タイマーアプリを開く関数
function openTimerApp() {
  createWindow('タイマーアプリ', timerAppContent());
}

function timerAppContent() {
  return `
    <div>
      <input type="number" id="timer-minutes" placeholder="分" min="0">
      <input type="number" id="timer-seconds" placeholder="秒" min="0" max="59">
      <button onclick="startTimer()">スタート</button>
      <button onclick="stopTimer()">ストップ</button>
    </div>
    <div id="timer-display">00:00</div>
  `;
}

let timerInterval;
let startTime;
let timerDuration;

function startTimer() {
  const minutes = parseInt(document.getElementById('timer-minutes').value);
  const seconds = parseInt(document.getElementById('timer-seconds').value);
  if (isNaN(minutes) || isNaN(seconds)) {
    alert('正しい時間を入力してください。');
    return;
  }
  timerDuration = minutes * 60 + seconds;
  startTime = Date.now();
  timerInterval = setInterval(updateTimerDisplay, 1000);
}

function updateTimerDisplay() {
  const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  const remainingTime = timerDuration - elapsedTime;
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  document.getElementById('timer-display').innerText = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  if (remainingTime <= 0) {
    clearInterval(timerInterval);
    document.getElementById('timer-display').innerText = '終了';
  }
}

function stopTimer() {
  clearInterval(timerInterval);
}

// カメラアプリを開く関数
function openCamera() {
  createWindow('カメラ', cameraContent());
}

function cameraContent() {
  return `
    <video id="camera-stream" autoplay></video>
    <button onclick="takePhoto()">写真を撮影</button>
    <canvas id="photo-canvas" style="display: none;"></canvas>
    <div id="photo-gallery"></div>
  `;
}

let photoGallery = document.getElementById('photo-gallery');
let photoIndex = 0;

async function takePhoto() {
  const video = document.getElementById('camera-stream');
  const canvas = document.getElementById('photo-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  const photoUrl = canvas.toDataURL('image/png');
  const photoElement = document.createElement('img');
  photoElement.src = photoUrl;
  photoElement.className = 'photo';
  photoElement.onclick = () => openImage(photoElement.src);
  photoGallery.appendChild(photoElement);
  photoIndex++;
}

function openImage(url) {
  const newWindow = createWindow('写真', `<img src="${url}" style="max-width: 100%; max-height: 100%;">`);
  newWindow.style.width = 'auto';
  newWindow.style.height = 'auto';
}

// メインのスタートメニューの要素
const startMenuItems = [
  { name: '電卓', action: openCalculator },
  { name: 'タスクマネージャー', action: openTaskManager },
  { name: 'ブラウザ', action: openBrowser },
  { name: '設定', action: openSettings },
  { name: '天気アプリ', action: openWeatherApp },
  { name: 'ペイントアプリ', action: openPaintApp },
  { name: '時計アプリ', action: openClockApp },
  { name: 'タイマーアプリ', action: openTimerApp },
  { name: 'カメラ', action: openCamera },
];

// スタートメニューを生成する関数
function generateStartMenu() {
  const startMenu = document.getElementById('start-menu');
  startMenuItems.forEach(item => {
    const menuItem = document.createElement('div');
    menuItem.className = 'start-menu-item';
    menuItem.innerText = item.name;
    menuItem.onclick = item.action;
    startMenu.appendChild(menuItem);
  });
}

// スタートメニューを開く関数
function openStartMenu() {
  const startMenu = document.getElementById('start-menu');
  startMenu.style.display = 'block';
}

// スタートメニューを閉じる関数
function closeStartMenu() {
  const startMenu = document.getElementById('start-menu');
  startMenu.style.display = 'none';
}

// 起動時にスタートメニューを生成
generateStartMenu();
