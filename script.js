// 3-1단계
const buttons = document.querySelectorAll('.button');

const printValue = (event) => {
    // console.log(event.target.textContent);
};

buttons.forEach((button) => button.addEventListener('click', printValue));

// 3-2단계
const displayContainer = document.querySelector('.display-container');

const changeValue = (event) => {
    // 가장 최근에 클릭한 버튼이 연산자라면 display 초기화
    if (displayContainer.textContent === '0' || isOperatorClicked || isEqualsClicked) {
        displayContainer.textContent = event.target.textContent;
        // console.log(displayContainer);
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

// 3단계 도전 과제
const point = document.querySelector('.point');

const addPoint = (event) => {
    if (displayContainer.textContent.includes('.') === false) {
        displayContainer.textContent += event.target.textContent;
    }
};

point.addEventListener('click', addPoint);

const clear = document.querySelector('.clear');

const clearDisplay = () => {
    displayContainer.textContent = 0;
    firstOperand = null;
    secondOperand = null;
    operator = null;
    isOperatorClicked = false;
    isEqualsClicked = false;
    console.log('firstOperand : ' + firstOperand, 'secondOperand : ' + secondOperand, 'operator : ' + operator);
};

clear.addEventListener('click', clearDisplay);

// 4-1 단계
let firstOperand = null;
let secondOperand = null;
let operator = null;
let isOperatorClicked = false;  // 가장 최근에 클릭한 버튼이 연산자인지 체크

const operators = document.querySelectorAll('.operator');

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

// 4-2단계
let result = 0;

const equalsBtn = document.querySelector('.equals-btn');

const calculate = (firstNum = 0, secondNum, op) => {
    console.log(firstNum, op, secondNum);
    switch (op) {
        case '+':
            result = firstNum + secondNum;
            break;
        case '-':
            result = firstNum - secondNum;
            break;
        case '*':
            result = firstNum * secondNum;
            break;
        case '/':
            result = firstNum / secondNum;
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
    let result = calculate(parseFloat(firstOperand), parseFloat(secondOperand), operator);
    displayContainer.textContent = Number(result.toFixed(2));
};

equalsBtn.addEventListener('click', saveSecAndCalc);

// 4단계 도전 미션
let isEqualsClicked = false;  // 가장 최근에 클릭한 버튼이 =인지 체크

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