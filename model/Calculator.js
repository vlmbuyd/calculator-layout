import {
  INITIAL_DISPLAY_VALUE,
  OPERATROS,
  OPERATROS_PRIORITES,
} from '../constants.js';

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

  /**
   * 단일 연산 수행
   * @param {Array<'+' | '−' | '×' | '÷' | '%'>} operator - 연산자
   * @param {number} prev - 이전 피연산자
   * @param {number} next - 다음 피연산자
   * @returns {number} - 연산 결과
   */
  calculateOperation(operator, prev, next) {
    switch (operator) {
      case '×':
        return prev * next;
      case '÷':
        return prev / next;
      case '+':
        return prev + next;
      case '−':
        return prev - next;
      case '%':
        return prev % next;
    }
  }

  /**
   * 연산자 우선순위에 따른 계산 수행
   * @param {Array<string>} expression - 계산식 배열
   * @param {Array<'+' | '−' | '×' | '÷' | '%'>} targetOperators - 타겟 연산자 배열
   */
  calculateByPriority(expression, targetOperators) {
    for (let i = 0; i < expression.length; i++) {
      const currValue = expression[i];

      if (targetOperators.includes(currValue)) {
        // 연산자 양옆의 피연산자
        const prev = Number(expression[i - 1]);
        const next = Number(expression[i + 1]);

        // 단일 연산 수행
        const result = this.calculateOperation(currValue, prev, next);

        // 배열 업데이트: prev, operator, next -> result로 교체
        expression.splice(i - 1, 3, result);
        i--; // 배열 길이 변경에 따른 인덱스 조정
      }
    }
  }

  /**
   * 최종 결과 계산
   */
  calculateResult() {
    const expression = [...this.history, this.currOperand];

    // [연산자 우선순위] 곱셈/나눗셈 -> 덧셈/뺄셈/나머지 순으로 순회하여 계산
    this.calculateByPriority(expression, OPERATROS_PRIORITES.HIGH);
    this.calculateByPriority(expression, OPERATROS_PRIORITES.LOW);

    // 계산결과 화면에 표시
    const result = expression[0];
    this.displayEl.innerText = result;
  }

  /**
   * 모든 값 초기화 (AC)
   */
  clearAll() {
    this.history = [];
    this.prevOperand = '';
    this.operator = '';
    this.currOperand = INITIAL_DISPLAY_VALUE;

    this.updateDisplay();
  }

  /**
   * 화면 업데이트
   */
  updateDisplay() {
    const historyStr = this.history.join('');
    this.displayEl.innerText = `${historyStr}${this.currOperand}`;
  }
}
