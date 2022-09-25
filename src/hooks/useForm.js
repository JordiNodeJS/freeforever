import { useState } from 'react'

/**
 * It returns an array with three elements: the values of the form, a function to handle the change of
 * the inputs, and a function to reset the form
 * @param [initialState] - The initial state of the form.
 * @returns An array with 3 elements.
 */
export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState)

  const reset = (newState = initialState) => {
    setValues(newState)
  }

  const handleInputChange = ({ target }) => {
    setValues({
      ...values,
      [target.name]: target.value,
    })
  }

  return [values, handleInputChange, reset]
}
