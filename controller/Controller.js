import { KEY_MAP } from '../constants.js';

export default class Controller {
  /**
   * @param {Object} calculator - Calculator 인스턴스
   * @param {HTMLElement} keypadEl - 키패드 HTML 요소
   */
  constructor(calculator, keypadEl) {
    this.calculator = calculator;
    this.keypadEl = keypadEl;
    this.initEventListeners();
  }

  /**
   * 이벤트 리스너 초기화
   */
  initEventListeners() {
    // 부모 요소에게 이벤트 위임
    this.keypadEl.addEventListener('click', (e) => this.handleClick(e));
    // 키보드 입력 처리
    window.addEventListener('keydown', (e) => this.handleKeydown(e));
  }

  /**
   * 마우스 입력 처리
   * @param {Event} e - 이벤트 객체
   */
  handleClick(e) {
    const target = e.target;

    if (!target.matches('button')) return;

    const type = target.dataset.type;
    const key = target.dataset.key;
    const content = target.innerText;

    this.handleCalculateInput(type, key, content);
  }

  /**
   * 키보드 입력 처리
   * @param {KeyboardEvent} e - 키보드 이벤트 객체
   */
  handleKeydown(e) {
    const key = e.key;
    const mappedKey = KEY_MAP[key] || key;
    const targetBtn = document.querySelector(`button[data-key="${mappedKey}"]`);

    if (!targetBtn) return;

    e.preventDefault();
    targetBtn.click();
    targetBtn.classList.add('pressed');

    setTimeout(() => {
      targetBtn.classList.remove('pressed');
    }, 150);
  }

  /**
   * 계산기 입력 처리
   * @param {string} type - 입력 타입 (number, operator, calculate)
   * @param {string} key - 입력 키
   * @param {string} content - 입력 내용
   */
  handleCalculateInput(type, key, content) {
    if (key === 'clear') {
      this.calculator.clearAll();
      return;
    }

    switch (type) {
      case 'number':
        this.calculator.appendNumber(content);
        break;
      case 'operator':
        this.calculator.appendOperator(content);
        break;
      case 'calculate':
        this.calculator.calculateResult();
        break;
      default:
        break;
    }
  }
}
