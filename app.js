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
    document.body.appendChild(newWindow);
    makeDraggable(newWindow);
    return newWindow; // ウィンドウ要素を返す
}

// ウィンドウをドラッグ可能にする関数
function makeDraggable(element) {
    let isMouseDown = false;
    let offsetX, offsetY;

    element.querySelector('.title-bar').addEventListener('mousedown', function (e) {
        isMouseDown = true;
        offsetX = e.clientX - element.offsetLeft;
        offsetY = e.clientY - element.offsetTop;
        e.stopPropagation();
        e.preventDefault();
    });

    document.addEventListener('mousemove', function (e) {
        if (isMouseDown) {
            element.style.left = `${e.clientX - offsetX}px`;
            element.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', function () {
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
        <p>ここに設定内容を記述</p>
    `;
}

// スタートメニューの表示切替関数
function toggleStartMenu() {
    const menu = document.getElementById('start-menu-items');
    menu.classList.toggle('hidden');
}
function openPaintApp() {
    createWindow('ペイント', paintAppContent());
}

function paintAppContent() {
    return `
        <canvas id="paint-canvas" width="400" height="300"></canvas>
        <br>
        <button onclick="clearCanvas()">クリア</button>
    `;
}

let isPainting = false;
let lastX = 0;
let lastY = 0;

function startPainting(e) {
    isPainting = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function paint(e) {
    if (!isPainting) return;
    const canvas = document.getElementById('paint-canvas');
    const ctx = canvas.getContext('2d');

    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function clearCanvas() {
    const canvas = document.getElementById('paint-canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    isPainting = false;
}
function openCamera() {
    createWindow('カメラ', cameraAppContent());
}

function cameraAppContent() {
    return `
        <video id="camera-stream" width="400" height="300" autoplay></video>
        <br>
        <button onclick="takeSnapshot()">スナップショット</button>
        <canvas id="camera-canvas" width="400" height="300" style="display: none;"></canvas>
    `;
}

function takeSnapshot() {
    const video = document.getElementById('camera-stream');
    const canvas = document.getElementById('camera-canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const image = canvas.toDataURL('image/png');
    window.open(image);
}

navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
        const video = document.getElementById('camera-stream');
        video.srcObject = stream;
    })
    .catch(function (error) {
        console.error('カメラの使用が許可されていません。', error);
    });
function openFileExplorer() {
    createWindow('ファイルエクスプローラー', fileExplorerContent());
}

function fileExplorerContent() {
    return `
        <div id="file-explorer">
            <ul id="file-list">
                <li>ファイル1.txt</li>
                <li>ファイル2.jpg</li>
                <li>フォルダ1
                    <ul>
                        <li>サブファイル1.txt</li>
                        <li>サブファイル2.jpg</li>
                    </ul>
                </li>
            </ul>
        </div>
    `;
}
function openNotepad() {
    createWindow('ノートパッド', notepadContent());
}

function notepadContent() {
    return `
        <textarea id="notepad-text" style="width: 100%; height: calc(100% - 40px);"></textarea>
    `;
}
