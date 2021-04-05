/**
 * Test if the form passed as parametere are valid or no
 *
 * @param form EventTarget & HTMLFormElement
 * @return boolean
 */
export const formIsValid = (
  form: EventTarget & HTMLFormElement
): boolean => {
  const input = form.getElementsByTagName('input')
  const textarea = form.getElementsByTagName('textarea')
  const validInput = form.getElementsByClassName(
    'validInput'
  )
  const formLenght = input.length + textarea.length

  return validInput.length === formLenght
}

/**
 * Test if the input passed as parametere follow the criteria
 *
 * @param input EventTarget & (HTMLInputElement | HTMLTextAreaElement)
 * @param type Type of the input to test
 * @param length Object to know the size of the text
 * @return boolean
 */
export const isValidInput = (
  input: EventTarget &
    (HTMLInputElement | HTMLTextAreaElement),
  type: 'text' | 'email',
  length: {
    min: number
    max: number
  }
): boolean => {
  switch (type) {
    case 'text':
      if (
        _lenghtIsValid({ ...length }, input.value) &&
        _textIsValid(input.value)
      ) {
        input.classList.remove('invalidInput')
        input.classList.add('validInput')
        return true
      }
      input.classList.remove('validInput')
      input.classList.add('invalidInput')
      return false
    case 'email':
      if (
        _lenghtIsValid({ ...length }, input.value) &&
        _emailIsValid(input.value)
      ) {
        input.classList.remove('invalidInput')
        input.classList.add('validInput')
        return true
      }
      input.classList.remove('validInput')
      input.classList.add('invalidInput')
      return false
    default:
      break
  }
  return false
}

export const isValidAntispam = (
  input: EventTarget & HTMLInputElement,
  value: number
) => {
  if (+input.value !== value) {
    input.classList.remove('validInput')
    input.classList.add('invalidInput')
    return false
  } else {
    input.classList.remove('invalidInput')
    input.classList.add('validInput')
    return true
  }
}

const _emailIsValid = (string: string) => {
  const regexp = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )

  return regexp.test(string)
}

const _lenghtIsValid = (
  { max = 0, min = 0 },
  string: string
) => {
  if (string.length < min || string.length > max) {
    return false
  }
  return true
}

const _textIsValid = (string: string) => {
  const regexp = new RegExp(/[(<>/;:+.$£*`'"#~?)]/)
  return !regexp.test(string)
}
