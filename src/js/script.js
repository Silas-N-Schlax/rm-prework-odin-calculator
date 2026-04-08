
let buttons = document.querySelectorAll('.btn')
buttons.forEach((button) => {
  button.addEventListener('click', (e) => { updateDisplayWithUserInput(e.target.id)})
})




function updateDisplayWithUserInput(input) {
  let display = document.querySelector('.display')
  if (display.textContent === "0") {
    display.textContent = input
  } else {
    display.textContent += ` ${input} `
  }
}



function operate(a, opperator, b) {
  switch (opperator) {
    case ("+"): {
      return add(a,b) 
    } case ("-"): {
      return subtract(a,b)
    } case ("x"): {
      return multiply(a,b)
    } case ("÷"): {
      return divide(a,b)
    }
  }
}


function add (a,b) { return a + b }
function subtract (a,b) { return a - b }
function multiply (a,b) { return a * b }
function divide (a,b) { return a / b }
