// object calculltor yang akan menyimpan data dari kalkulator
const calculator = {
  displayNumber: "0",
  operator: null,
  firstNumber: null,
  waitingForSecondNumber: false,
};

// function untuk mengapupdate tampilan display tampilan layar kalkulator number dengan memilih by id displayNumber
function updateDisplay() {
  document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

// function untuk memberishkan calculators
function clearCalculator() {
  calculator.displayNumber = "0";
  calculator.operator = null;
  calculator.firstNumber = null;
  calculator.waitingForSecondNumber = false;
}

// function untuk menampilkan data ke displayNumber
function inputDigit(digit) {
  if (calculator.displayNumber === "0") {
    calculator.displayNumber = digit;
  } else {
    calculator.displayNumber += digit;
  }
}
// function untuk ketika user mengklik button untuk negative case
function inverseNumber() {
  if (calculator.displayNumber === "0") {
    return;
  }
  calculator.displayNumber = calculator.displayNumber * -1;
}
// function untuk operator tambah dan kurang
function handlerOperator(operator) {
  if (!calculator.waitingForSecondNumber) {
    calculator.operator = operator;
    calculator.waitingForSecondNumber = true;
    calculator.firstNumber = calculator.displayNumber;

    // mangatur ulang nilai display number supaya tombol selanjutnya dimulai dari angka pertama lagi
    calculator.displayNumber = "0";
  } else {
    alert("Operator sudah ditetapkan");
  }
}
// function untuk equals
function performCalculation() {
  if (calculator.firstNumber == null || calculator.operator == null) {
    alert("Anda Belum menetapkan operator");
    return;
  }
  let result = 0;
  if (calculator.operator === "+") {
    result =
      parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
  } else {
    result =
      parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
  }
  const history = {
    firstNumber: calculator.firstNumber,
    secondNumber: calculator.displayNumber,
    operator: calculator.operator,
    result: result,
  };
  putHistory(history);
  calculator.displayNumber = result;
  renderHistory();
}
// variable untuk memilih class button menggunakan query selector all
const buttons = document.querySelectorAll(".button");

// looping for of button untuk mendapatkan nilai event target dan untuk mendapatkan nilaiketika object di klik
for (let button of buttons) {
  button.addEventListener("click", function (event) {
    // mendapatkan object element yang di klik
    const target = event.target;
    if (target.classList.contains("clear")) {
      clearCalculator();
      updateDisplay();
      return;
    }

    if (target.classList.contains("negative")) {
      inverseNumber();
      updateDisplay();
      return;
    }
    if (target.classList.contains("equals")) {
      performCalculation();
      updateDisplay();
      return;
    }

    if (target.classList.contains("operator")) {
      handlerOperator(target.innerText);
      return;
    }

    inputDigit(target.innerText);
    updateDisplay();
  });
}
