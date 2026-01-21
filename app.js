import Calculator from './model/Calculator.js';

const keypad = document.querySelector('.calculator__keypad');
const displayEl = document.querySelector('.calculator__value');

const calculator = new Calculator(displayEl);

// 부모 요소에게 이벤트 위임
keypad.addEventListener('click', (e) => {
  const target = e.target;

  if (!target.matches('button')) return;

  const type = target.dataset.type;
  const content = target.innerText;

  handleCalculateInput(type, content);
});

const handleCalculateInput = (type, content) => {
  switch (type) {
    case 'number':
      calculator.appendNumber(content);
      break;
    case 'operator':
      calculator.appendOperator(content);
      break;
    case 'calculate':
      calculator.calculateResult();
      break;
  }
};
