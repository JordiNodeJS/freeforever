import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { startUploadFile } from '../actions'

/**
 * It returns an array of functions that are used to handle the upload of a file.
 * 
 * The first function is used to handle the click of the upload button.
 * 
 * The second function is used to handle the change of the input file.
 * 
 * The third function is used to get a reference to the input file.
 * 
 * @returns An array of functions.
 */
export const useHandleUpload = () => {
  const dispatch = useDispatch()
  const inputUploadRef = useRef()
  
  const handleButtonUploadClick = _ => inputUploadRef.current.click()
  const handleInputFileChange = e => {
    const { files } = e.target
    const file = files[0]
    file && dispatch(startUploadFile(file)) 
  }
  return [handleButtonUploadClick, handleInputFileChange, inputUploadRef]
}
