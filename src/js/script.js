
let equation = ""
const operators = ['+', '-', 'x', '÷']


let buttons = document.querySelectorAll('.btn')
buttons.forEach((button) => {
  button.addEventListener('click', (e) => { 
    sortUserInput(e.target.id)
  })
})


document.addEventListener('keydown', (e) => {
  let keyList = [
    "1", "2", "3", "4", 
    "5", "6", "7", "8", 
    "9", "0", "-", "+", 
    ".", "=", "x"
  ]
  if (keyList.includes(e.key)) {
    document.getElementById(`${e.key}`).click()
  } else if (e.key === "*") {
    document.getElementById("x").click()
  } else if (e.key === "/") {
    document.getElementById("÷").click()
  } else if (e.key === "Enter") {
    document.getElementById("=").click()
  } else if (e.key === "Escape") {
    document.getElementById("clear").click()
  } else if (e.key === "Backspace" || e.key === "Delete") {
    document.getElementById("delete").click()
  }
})



function sortUserInput(input) {
  const buttons = ['=', 'clear', ".", "delete"]
  if (operators.includes(input)) {
    if (
      !operators.includes(getLastInput()) &&
      equation.length > 0
    ) {
      updateEquation(input)
    }
  } else if (buttons.includes(input)) {
    let hasError = manageButtons(input)
    if (hasError) return displayError(hasError.reason)
  } else {
    updateEquation(input)
  }
}


function manageButtons(input) {
  switch (input) {
    case "=":
      let data = evalulate(equation)
      if (data.error) {
        return displayError(data.reason) 
      } else {
        return updateEquationWithAnswer(data.answer)
      } 
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

function updateEquationWithAnswer(input) {
  equation = input
  updateDisplayWithUserInput()
}

function updateDisplayWithUserInput(reset = false) {
  let display = document.querySelector('.display')
  display.textContent = reset ? "0" : equation
}


function displayError(error) {
  alert(`There has been an error: ${error}`)
}

