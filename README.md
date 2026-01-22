# iOS Calculator Clone

직무 부트캠프 '코멘토' 과제물의 일환으로 애플(iOS) 계산기를 웹으로 구현한 프로젝트입니다. <br/>
단순한 UI 구현을 넘어, MVC 패턴을 적용하여 비즈니스 로직과 뷰 제어를 분리하고 Vanilla Javascript를 활용해 실제 계산 기능을 구현하는 데 주력했습니다.

## Preview

<img src="./assets/preview.png" alt="ios-calculator-preview" width="300" />

<br/>

## Tech Stack

- Core: HTML5, CSS3, Javascript
- Architecture: MVC Pattern (Model-View-Controller)
- SCSS: SCSS (Dart Sass)
- Package Manager: NPM (Sass 컴파일 환경 구축)

<br/>

## Folder Structre

```
ios-calculator/
├── 📂 assets/                 # 이미지 및 정적 리소스
├── 📂 controller/
│   └── Controller.js            # 이벤트 핸들링 컨트롤러
├── 📂 model/
│   └── Calculator.js            # 핵심 계산 로직 및 상태 관리
├── 📂 styles/
│   ├── 📂 base/
│   │   ├── _reset.scss        # 브라우저 기본 스타일 초기화
│   │   └── _variables.scss    # 색상 팔레트, 테마, 폰트 변수 정의
│   ├── 📂 mixins/
│   │   └── _mixins.scss       # 유틸리티 함수 (Flexbox)
│   ├── main.scss              # SCSS entry point
│   └── style.scss             # 컴포넌트 스타일링
├── app.js                     # 애플리케이션 진입점 (의존성 주입)
├── constants.js               # 상수 관리
├── index.html                 # 메인 마크업
└── style.css                  # 컴파일된 CSS
└── package.json
```

<br/>

## Key Features & Technical Decisions

**1. JavaScript Architecture (MVC Pattern)**

> 유지보수성과 확장성을 고려하여 코드의 역할을 명확히 분리했습니다.

- Model (`Calculator.js`): 계산기 데이터(history, currOperand)와 순수 연산 로직을 담당합니다. 화면(DOM)을 직접 제어하지 않고 상태 관리 및 관련 로직에 집중합니다.

- Controller (`Controller.js`): 사용자 입력(클릭, 키보드)을 감지하고, Model에게 명령을 내리며, 그 결과를 View에 반영하는 중재자 역할을 합니다.

- Entry Point (`app.js`): Calculator와 Controller 인스턴스를 생성하고 의존성을 주입하여 애플리케이션을 초기화합니다.

**2. Core Logic & Algorithm**

- 연산자 우선순위 처리: 단순 순차 계산이 아닌, 사칙연산 우선순위를 준수하기 위해 history 배열을 활용했습니다. <br/>
  `constants.js`에 정의된 우선순위(HIGH: ×, ÷, %, LOW: +, -)에 따라 고순위 연산을 먼저 처리하고 `splice` 메서드를 활용하여 배열을 재구성하는 알고리즘을 구현했습니다.

- 상수 관리 (`constants.js`): 초기값, 연산자 목록, 키보드 매핑 정보 등을 별도 파일로 분리하여 하드코딩을 방지하고 관리 편의성을 높였습니다.

**3. User Interaction (UX)**

- 키보드 지원 (Keyboard Support): 마우스뿐만 아니라 키보드로도 계산기를 사용할 수 있습니다. <br/>
  keydown 이벤트를 전역으로 감지하고, 실제 버튼을 클릭한 것과 동일한 **시각적 피드백**을 제공하여 사용자 경험을 향상시켰습니다.

- 이벤트 위임 (Event Delegation): 각 버튼마다 리스너를 등록하는 대신, 상위 요소인 keypad에 하나의 이벤트를 등록하여 성능을 최적화하고 메모리 누수를 방지했습니다.

**4. SCSS & Styling**

- `@use` 모듈 시스템: 변수와 믹스인을 모듈화하여 네임스페이스 오염을 방지했습니다.

- Layout: CSS Grid를 활용하여 5행 4열의 키패드 레이아웃을 구성하고, 0번 버튼(span 2)과 같은 불규칙한 그리드를 깔끔하게 처리했습니다.

<br/>

## Getting Started

**1. Installation**

프로젝트를 클론하고 필요한 의존성(Sass)을 설치합니다.

```bash
git clone https://github.com/vlmbuyd/ios-calculator.git
npm install
```

**2. Run(Compile SCSS)**

실시간으로 SCSS 변경 사항을 감지하여 CSS로 컴파일합니다.

```bash
npm run sass
```

**3. Open Project**

`index.html` 파일을 Live Server 등을 활용하여 브라우저에서 실행합니다.

<br/>
<br/>

## 기능 명세

### UI 및 기본 구조

- [x] HTML/SCSS 기반 iOS 스타일 UI 구현
- [x] MVC 패턴 기반의 디렉토리 구조 설계
- [x] DOM 이벤트 위임 및 컨트롤러 연결

### 숫자 입력 및 디스플레이

- [x] 입력된 숫자/연산자를 화면 상단에 업데이트
  - [x] 마우스 클릭 입력 처리
  - [x] 키보드 입력 지원 (숫자, 연산자, Enter, Backspace, ESC 매핑)
- [x] 연산자 버튼(+, -, ×, ÷) 클릭 시 시각적 활성화 처리
  - [x] 키보드 입력 시 버튼 눌림(active) 애니메이션 동기화
- [x] [예외]' 0'이 맨 앞에 연속으로 입력되는 것을 방지

### 연산 로직

- [x] 사칙연산(+, -, ×, ÷) 및 나머지(%) 연산 구현
- [x] 연산자 우선순위 알고리즘 적용 (곱셈/나눗셈 우선 처리)
- [x] 계산 히스토리 관리 및 등호(=) 버튼 클릭 시 결과 출력
- [x] 초기화(AC) 기능
- [x] [예외] 연속된 연산자 입력 시 교체 로직

### 추후 개선 사항 (TODO)

- [ ] 천 단위 콤마(,) 포맷팅 적용
- [ ] 입력 길이에 따른 폰트 사이즈 자동 조절
- [ ] 소수점(.) 중복 입력 방지 로직
- [ ] 소수점 자리 표시 제한
- [ ] 부호 반전(+/-) 기능
- [ ] AC/C 토글 기능 구현
