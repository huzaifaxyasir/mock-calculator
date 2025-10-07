const display = document.querySelector('.display .value');
const keys = document.querySelectorAll('.key');

let current = '';
let previous = '';
let operator = '';

keys.forEach(key => {
  key.addEventListener('click', () => {
    const value = key.textContent;

    // Ignore if clicked on memory or placeholder keys
    if (key.classList.contains('memory')) return;

    // Clear
    if (value === 'C') {
      current = '';
      previous = '';
      operator = '';
      display.textContent = '0';
      return;
    }

    // Operators
    if (['+', '−', '×', '÷'].includes(value)) {
      if (current === '' && previous === '') return;
      if (previous && current) calculate();
      operator = value;
      previous = current || previous;
      current = '';
      return;
    }

    // Equal
    if (value === '=') {
      calculate();
      return;
    }

    // Decimal
    if (value === '.') {
      if (!current.includes('.')) current += '.';
      display.textContent = current;
      return;
    }

    // Numbers
    if (!isNaN(value)) {
      current += value;
      display.textContent = current;
    }
  });
});

function calculate() {
  if (!previous || !operator || !current) return;
  let a = parseFloat(previous);
  let b = parseFloat(current);
  let result = 0;

  switch (operator) {
    case '+': result = a + b; break;
    case '−': result = a - b; break;
    case '×': result = a * b; break;
    case '÷': 
      result = b === 0 ? '∞' : a / b;
      break;
  }

  display.textContent = result;
  previous = result.toString();
  current = '';
  operator = '';
}
