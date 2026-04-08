
let equation = "0"


let buttons = document.querySelectorAll('.btn')
buttons.forEach((button) => {
  button.addEventListener('click', (e) => { 
    sortUserInput(e.target.id)
  })
})


function sortUserInput(input) {
  const operators = ['+', '-', 'x', '÷']
  const buttons = ['=', 'clear', ".", "delete"]
  const lastInput = equation.split("")
  if (operators.includes(input)) {
    if (
      !operators.includes(lastInput[lastInput.length - 1]) &&
      lastInput[lastInput.length - 1] != "0"
    ) {
      updateEquation(input)
    }
  } else if (buttons.includes(input)) {
    manageButtons(input)
  } else {
    updateEquation(input)
  }
}


function updateEquation(input) {
  if (equation === "0") {
    equation = input
  } else {
    equation += input
  }
  updateDisplayWithUserInput()
}

function updateDisplayWithUserInput() {
  let display = document.querySelector('.display')
  display.textContent = equation
}


