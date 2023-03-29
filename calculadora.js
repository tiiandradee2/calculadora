// Seleciona os elementos HTML
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

let currentNumber = '';
let firstOperand = null;
let operator = null;

// Função para limpar a calculadora
function clear() {
  currentNumber = '';
  firstOperand = null;
  operator = null;
  display.textContent = '';
}

// Função para definir o operador
function setOperator(newOperator) {
  if (operator !== null) {
    calculate();
  }
  firstOperand = parseFloat(currentNumber);
  operator = newOperator;
  currentNumber = '';
}

// Função para realizar o cálculo
function calculate() {
  if (operator === '+') {
    currentNumber = (firstOperand + parseFloat(currentNumber)).toString();
  } else if (operator === '-') {
    currentNumber = (firstOperand - parseFloat(currentNumber)).toString();
  } else if (operator === '*') {
    currentNumber = (firstOperand * parseFloat(currentNumber)).toString();
  } else if (operator === '/') {
    currentNumber = (firstOperand / parseFloat(currentNumber)).toString();
  }
  display.textContent = currentNumber;
  firstOperand = null;
  operator = null;
}

// Adiciona um ouvinte de evento para cada botão
buttons.forEach(button => {
  button.addEventListener('click', () => {
    handleButton(button.getAttribute('value'));
  });
});

// Adiciona um ouvinte de evento para o teclado
document.addEventListener('keydown', event => {
  const key = event.key;

  // Verifica se a tecla pressionada é um número ou um ponto
  if (!isNaN(key) || key === '.') {
    handleButton(key);
  }

    // Verifica se a tecla pressionada é um operador, a tecla Enter ou a tecla =
    if (key === '+' || key === '-' || key === '*' || key === '/' || key === 'Enter' || key === '=') {
      if (key === 'Enter') {
        handleButton('=');
      } else {
        handleButton(key);
      }
    }

  // Verifica se a tecla pressionada é a tecla Backspace
  if (key === 'Backspace') {
    handleButton('clear');
  }
});

// Função para lidar com as entradas do usuário
function handleButton(buttonValue) {
  if (!isNaN(buttonValue) || buttonValue === '.') {
    currentNumber += buttonValue;
    display.textContent = currentNumber;
  } else if (buttonValue === 'clear') {
    clear();
  } else if (buttonValue === '=') {
    calculate();
  } else {
    setOperator(buttonValue);
  }
}
