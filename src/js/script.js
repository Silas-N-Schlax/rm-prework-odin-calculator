
let equation = ""


let buttons = document.querySelectorAll('.btn')
buttons.forEach((button) => {
  button.addEventListener('click', (e) => { 
    sortUserInput(e.target.id)
  })
})


function sortUserInput(input) {
  const operators = ['+', '-', 'x', '÷']
  const buttons = ['=', 'clear', ".", "delete"]
  if (operators.includes(input)) {
    if (
      !operators.includes(getLastInput()) &&
      equation.length > 0
    ) {
      updateEquation(input)
    }
  } else if (buttons.includes(input)) {
    manageButtons(input)
  } else {
    updateEquation(input)
  }
}


function manageButtons(input) {
  console.log(input)
  switch (input) {
    case "=":
      return evalulate(equation)
    case ".":
      return addDecimal()
    case "clear": 
      return clearEquation()
    case "delete": 
      return deleteLastInput()
    default:
      return { error: true, reason: "Invalid Button ID" }
  }
}

function addDecimal() {
  if (getLastInput() != '.') {
    let input = equation.length === 0 ? "0." : "."
    console.log("adding decimal")
    updateEquation(input)
  }
}

function clearEquation() {
  equation = ""
  updateDisplayWithUserInput(true)
}

function deleteLastInput() {
  equation = equation.split("")
  equation.pop()
  equation = equation.join("")
  equation.length === 0 ? clearEquation() : updateDisplayWithUserInput()
}

function getLastInput() {
  return equation.length > 0 ? equation.split("")[equation.length - 1] : ""
}


function updateEquation(input) {
  equation += input
  updateDisplayWithUserInput()
}

function updateDisplayWithUserInput(reset = false) {
  let display = document.querySelector('.display')
  display.textContent = reset ? "0" : equation
}


