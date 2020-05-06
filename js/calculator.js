//Llamar los elementos principales
let displayBox = document.querySelector('.displayBox'),
  keyboard = document.querySelector('.keyboard'),
  status = false,
  n1,
  typeOperation

//Inicializar la calculadora en cero
displayBox.textContent = 0

//Que botón del teclado estoy presionando
function calculator() {
  //Si la operación devuelve null, no ejecute nada
  if (!keyboard) {
    return
  }
  keyboard.addEventListener('click', function (e) {
    //target, dataset
    let t = e.target,
        ds = t.dataset
    //que número estoy pulsando
    if (ds.number) {
      console.log(ds.number)
      //Escribe en pantalla
      writeBox(ds.number)
    }
    //que operación estoy pulsando
    if (ds.math) {
      console.log(ds.math)
      //Llama la operación
      getMath(t, ds.math)
    }
    //igualdad-limpiar
    if (ds.operation) {
      console.log(ds.operation)
      //Ejecuta la operación
      runMath(ds.operation)
    }
  })
}

//Imprimir los números en pantalla
function writeBox(number) {
  //Preguntamos si el valor iniciar el cero
  if (displayBox.textContent === '0' || status === true) {
    displayBox.textContent = number
  } else {
    if(number === '.' && !displayBox.textContent.includes('.')){
      displayBox.textContent += number
    }else if(number !== '.'){
      displayBox.textContent += number
    }else{
      null
    }
  }
  status = false
}

//Llamamos la operación a ejecutar
function getMath(ele, operation) {
  status = true
  //Capturamos el primer numero
  n1 = Number(displayBox.textContent)
  typeOperation = operation
  //Modificamos la pantalla con la operación
  displayBox.textContent = ele.textContent
}

//Ejecuta las operación de igual y c
function runMath(operation) {
  function getResult(n1, typeOperation) {
    let n2 = Number(displayBox.textContent),
        result = 0
    //que tipo de operación estoy ejecutando
    switch (typeOperation) {
      case 'add':
        result = n1 + n2
        break
      case 'minus':
        result = n1 - n2
        break
      case 'multiply':
        result = n1 * n2
        break
      case 'divide':
        result = n1 / n2
        break
      default:
        break
    }
    if (result === Infinity) {
      displayBox.textContent = 'Error'
    }else{
      let textResult = result.toString()
      if(textResult.includes('.') === true){
        console.log('Encontrada')
        if (textResult.length <= 10 && textResult.length >= 0) {
          displayBox.textContent = textResult.slice(0,5)
        }else{
          displayBox.textContent = textResult.slice(0,10)
        }
      }else{
        console.log('No encontrada')
        displayBox.textContent = textResult
      }
      
    }
  }
  //Limpiar la pantalla
  if (operation === 'empty') {
    displayBox.textContent = '0'
  } else {
    getResult(n1, typeOperation)
  }
  status = true
}

calculator()