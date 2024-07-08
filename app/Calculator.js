<!-- 前述のHTMLに追加 -->
<button onclick="openCalculator()">電卓を開く</button>

<script>
  function openCalculator() {
    const calculatorWindow = document.createElement('div');
    calculatorWindow.className = 'window';
    calculatorWindow.innerHTML = `
      <div class="title-bar">
        電卓
        <button onclick="closeWindow(this)">×</button>
        <button onclick="minimizeWindow(this)">−</button>
        <button onclick="maximizeWindow(this)">□</button>
      </div>
      <div class="content">
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
      </div>
    `;
    document.getElementById('desktop').appendChild(calculatorWindow);
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

  function closeWindow(button) {
    button.parentElement.parentElement.remove();
  }

  function minimizeWindow(button) {
    const window = button.parentElement.parentElement;
    window.style.display = 'none';
  }

  function maximizeWindow(button) {
    const window = button.parentElement.parentElement;
    window.style.width = '100%';
    window.style.height = '100%';
  }
</script>
