function evalulate(equation) {
  let equationAry = equationArrayify(equation)
  let isValidInput = valitateInput(equationAry)
  if (isValidInput != true) {
    return isValidInput;
  }

  let answer = calculateAS(calculateMD(equationAry))
  answer = answer.split("").includes(".") ? String(Number(answer).toFixed(3)) : answer
  
  updateEquationWithAnswer(answer)
  return answer
}


function calculateAS(input) {
  if (input.error) return input
  const asOperators = ["+", "-"]
  let total = input[0]
  for (let i = 1; i < input.length; i++) {
    let answer = operate(total, input[i], input[i+1])
    if (answer.error) return answer
    total = String(answer)
    i += 1
  }
  return total
}

function calculateMD(input) {
  const mdOperators = ["x", "÷"]
  let newAry = []
  let lastAnswer = {
    answer: 0,
    use: false
  }
  for (let i = 0; i < input.length; i++) {
    if (operators.includes(input[i])) {
      if (mdOperators.includes(input[i])) {
        let answer;
        if (lastAnswer.use === true) {
          answer = operate(lastAnswer.answer, input[i], input[i+1])
        } else {
          answer = operate(input[i-1], input[i], input[i+1])
        }
        if (answer.error) return answer
        newAry.pop()
        lastAnswer.answer = answer, lastAnswer.use = true
        newAry.push(String(answer))
        i++
      } else {
        newAry.push(input[i])
        lastAnswer.use = false
      }
    } else { 
      newAry.push(input[i]) 
    }
  }
  return newAry
}


function valitateInput(equation) {
  if (equation.length < 2) {
    return { error: true, reason: "Please enter 2 numbers and 1 operator!" }
  } else if (operators.includes(equation[equation.length - 1])) {
    return { error: true, reason: "You cannot end an equation with an operator, please delete it!"}
  } else {
    return true;
  }
}

function equationArrayify(input) {
  input += "x", input = input.split("")
  let arrifiedEquation = []
  let firstJoinIndex = 0
  for (let i = 0; i < input.length; i++) {
    if (operators.includes(input[i])) {
      arrifiedEquation.push(input.slice(firstJoinIndex, i).join(""))
      arrifiedEquation.push(input[i])
      firstJoinIndex = i + 1
    }
  }
  arrifiedEquation.pop()
  return arrifiedEquation
}



function operate(a, opperator, b) {
  if (opperator === "÷" && b == 0) { 
    return { error: true, reason: "Nice try, you thought I wouldn't notice..."}
  }
  switch (opperator) {
    case "+":
      return add(Number(a), Number(b));
    case "-":
      return subtract(Number(a), Number(b));
    case "x":
      return multiply(Number(a), Number(b));
    case "÷":
      return divide(Number(a), Number(b));
    default:
      return { error: true, reason: "Invalid Operator"} ;
  }
}


function add (a,b) { return a + b }
function subtract (a,b) { return a - b }
function multiply (a,b) { return a * b }
function divide (a,b) { return a / b }
