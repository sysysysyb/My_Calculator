const buttons = document.querySelectorAll('.button');
const displayContainer = document.querySelector('.display-container');
const point = document.querySelector('.point');
const clear = document.querySelector('.clear');
const operators = document.querySelectorAll('.operator');
const equalsBtn = document.querySelector('.equals-btn');
const sign = document.querySelector('.sign');

let firstOperand = null;
let secondOperand = null;
let operator = null;
let result = 0;
let isOperatorClicked = false;  // 가장 최근에 클릭한 버튼이 연산자인지 체크
let isEqualsClicked = false;    // 가장 최근에 클릭한 버튼이 =인지 체크 

/* -------------------- 기능 관련 -------------------- */
// 버튼 클릭 잘 되는지 확인
const printValue = (event) => {
    console.log(event.target.textContent);
};

buttons.forEach((button) => button.addEventListener('click', printValue));

// 계산기 버튼 클릭했을 때 화면의 숫자 변경하기
const changeValue = (event) => {
    // 아직 아무 숫자도 입력하지 않았다면 or 가장 최근에 클릭한 버튼이 연산자 또는 = 라면 display 초기화
    if (displayContainer.textContent === '0' || isOperatorClicked || isEqualsClicked) {
        displayContainer.textContent = event.target.textContent;
        isOperatorClicked = false;
        isEqualsClicked = false;
    } else {
        displayContainer.textContent += event.target.textContent;
    }
};

buttons.forEach((button) => {
    if (button.classList.contains('number')) {
        button.addEventListener('click', changeValue);
    }
});

// . 버튼 클릭하면 화면의 숫자에 소수점 추가
const addPoint = (event) => {
    if (displayContainer.textContent.includes('.') === false) {
        displayContainer.textContent += event.target.textContent;
    }
};

point.addEventListener('click', addPoint);

// C 버튼 누르면 화면의 숫자 및 선언된 변수들의 값 모두 초기화
const clearDisplay = () => {
    displayContainer.textContent = 0;
    firstOperand = null;
    secondOperand = null;
    operator = null;
    isOperatorClicked = false;
    isEqualsClicked = false;
};

clear.addEventListener('click', clearDisplay);

// 연산자 버튼을 눌렀을 때 화면의 숫자와 연산자를 변수에 저장
/* 연산자를 이미 클릭한 상태에서 또 클릭한다면 이전에 저장한 숫자와 현재 화면의 숫자를 계산하고
그것을 다시 첫번째 피연산자 변수에 저장해서 이어서 계산하기*/
const clickOperator = (event) => {
    if (firstOperand === null) {
        firstOperand = displayContainer.textContent;
    }

    if (operator !== null) {
        saveSecAndCalc();
        firstOperand = displayContainer.textContent;
    }

    operator = event.target.textContent;

    console.log('First Operator : ' + firstOperand + '\nOperator : ' + operator);

    isOperatorClicked = true;
}

operators.forEach((element) => {
    element.addEventListener('click', clickOperator);
});

// = 버튼을 눌렀을 때 저장된 피연산자들과 연산자 값으로 계산
const calculate = (firstNum = 0, secondNum, op) => {
    console.log(firstNum, op, secondNum);
    switch (op) {
        case '+':
            result = firstNum + secondNum;
            break;
        case '-':
            result = firstNum - secondNum;
            break;
        case 'x':
            result = firstNum * secondNum;
            break;
        case '÷':
            result = firstNum / secondNum;
            break;
        case '%':
            result = firstNum % secondNum;
            break;
        default:
            return 'ERROR';
    }

    displayContainer.textContent = result;
    firstOperand = null;
    operator = null;
    
    return result;
};

const saveSecAndCalc = () => {
    secondOperand = displayContainer.textContent;
    let result = calculate(Number(firstOperand), Number(secondOperand), operator);
    displayContainer.textContent = Number(result.toFixed(2));
};

equalsBtn.addEventListener('click', saveSecAndCalc);

// ± 버튼을 눌렀을 때 부호 변경
const changeSign = () => {
    displayContainer.textContent *= -1;
};

sign.addEventListener('click', changeSign);

/* -------------------- 스타일 관련 -------------------- */
// 계산기에 3D 느낌 추가하기
const frame = document.querySelector('.frame');
const calculatorContainer = document.querySelector('.calculator-container');
const light = document.querySelector('.light');

let { x, y, width, height } = frame.getBoundingClientRect();

const mouseMove = (e) => {
    const left = e.clientX - x;
    const top = e.clientY - y;
    const centerX = left - width / 2;
    const centerY = top - height / 2;
    const d = Math.sqrt(centerX**2 + centerY**2);

    calculatorContainer.style.boxShadow = `
        ${-centerX / 10}px ${-centerY / 10}px 10px rgba(0, 0, 0, 0.1)
    `;

    calculatorContainer.style.transform = `
        rotate3d(
            ${-centerY / 100}, ${centerX / 100}, 0, ${d / 10}deg
        )
    `;

    light.style.backgroundImage = `
        radial-gradient(
            circle at ${left}px ${top}px, #00000012, #ffffff00, #ffffff70
        )
    `;
};

frame.addEventListener('mousedown', (e) => {
    if (e.target.closest('.button')) return;
    frame.addEventListener('mousemove', mouseMove);
});

document.addEventListener('mouseup', () => {
    frame.removeEventListener('mousemove', mouseMove);
    calculatorContainer.style.boxShadow = '';
    calculatorContainer.style.transform = '';
    calculatorContainer.style.backgroundImage = '';
});

window.addEventListener('resize', () => {
    let rect = frame.getBoundingClientRect();
    x = rect.x;
    y = rect.y;
    width = rect.width;
    height = rect.height;
});