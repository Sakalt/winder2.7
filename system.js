// スタートメニューの表示/非表示を切り替える
function toggleStartMenu() {
  const startMenu = document.getElementById('start-menu');
  startMenu.style.display = startMenu.style.display === 'block' ? 'none' : 'block';
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
