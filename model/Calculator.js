import { INITIAL_DISPLAY_VALUE, OPERATROS } from '../constants.js';

export default class Calculator {
  /**
   * @param {HTMLElement} displayEl - 계산 중인 값을 보여주는 HTML 요소
   */
  constructor(displayEl) {
    this.displayEl = displayEl;
    this.history = []; // 화면에 보여 줄 계산 기록  e.g. ['1', '+', '2']

    this.prevOperand = ''; // 이전 피연산자
    this.operator = ''; // 현재 연산자
    this.currOperand = INITIAL_DISPLAY_VALUE; // 현재 피연산자

    this.updateDisplay(); // 초기 화면 업데이트
  }

  /**
   * 숫자를 추가
   * @param {string} number - 추가할 숫자
   */
  appendNumber(number) {
    // 초기값이면서 0을 추가할 경우
    if (
      number === INITIAL_DISPLAY_VALUE &&
      this.currOperand === INITIAL_DISPLAY_VALUE
    )
      return;

    // 초기값이면 교체, 아니면 이어 붙이기
    if (this.currOperand === INITIAL_DISPLAY_VALUE) {
      this.currOperand = number;
    } else {
      this.currOperand += number;
    }

    this.updateDisplay();
  }

  /**
   * 연산자를 추가
   * @param {operator} number - 추가할 연산자
   */
  appendOperator(operator) {
    // 마지막 요소가 연산자이고 아직 피연산자가 입력되지 않은 경우 연산자 교체
    const lastValue = this.history[this.history.length - 1];

    if (OPERATROS.includes(lastValue) && this.currOperand === '') {
      this.operator = operator;
      this.history[this.history.length - 1] = this.operator;
      this.updateDisplay();
      return;
    }

    // 연산자가 없으면 추가
    this.operator = operator;

    this.prevOperand = this.currOperand; // 확정된 피연산자 저장
    this.currOperand = ''; // 다음 입력을 위해 초기화

    this.history.push(this.prevOperand, this.operator);

    this.updateDisplay();
  }

  compute() {}

  updateDisplay() {
    const historyStr = this.history.join('');
    this.displayEl.innerText = `${historyStr}${this.currOperand}`;
  }
}
