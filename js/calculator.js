(function () {
  const getClass = document.querySelector.bind(document)

  let displayBox = getClass('.displayBox'),
    keyboard = getClass('.keyboard'),
    status = false,
    n1 = 0,
    typeOperation = ''

  displayBox.textContent = 0

  let calculator = () => {
    if (!keyboard) {
      return
    }
    keyboard.addEventListener('click', e => {
      let t = e.target,
        ds = t.dataset

      if (ds.number) {
        writeBox(ds.number)
      }
      if (ds.math) {
        getMath(t, ds.math)
      }
      if (ds.operation) {
        runMath(ds.operation)
      }
      if (ds.symbol) {
        displayBox.textContent = -(displayBox.textContent)
      }
    })
  }

  let writeBox = (number) => {
    if (displayBox.textContent === '0' || status === true) {
      displayBox.textContent = number
    } else {
      if (number === '.' && !displayBox.textContent.includes('.')) {
        displayBox.textContent += number
      } else if (number !== '.') {
        displayBox.textContent += number
      } else {
        null
      }
    }
    status = false
  }

  let getMath = (ele, operation) => {
    status = true
    n1 = Number(displayBox.textContent)
    typeOperation = operation
    displayBox.textContent = ele.textContent
  }

  let runMath = operation => {
    let getResult = (n1, typeOperation) => {
      let n2 = Number(displayBox.textContent),
        result = 0

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
        case 'percnt':
          result = (n1 / 100) * n2
          break
        default:
          break
      }

      if (result === Infinity) {
        displayBox.textContent = 'Error'
      } else {
        let textResult = result.toString()
        if (textResult.includes('.') === true) {
          if (textResult.length <= 10 && textResult.length >= 0) {
            displayBox.textContent = textResult.slice(0, 5)
          } else {
            displayBox.textContent = textResult.slice(0, 10)
          }
        } else {
          displayBox.textContent = textResult
        }
      }
    }

    if (operation === 'empty') {
      displayBox.textContent = '0'
      result = 0
    } else {
      getResult(n1, typeOperation)
    }

    status = true
  }

  calculator()
}(c = e => { console.log(e) }))