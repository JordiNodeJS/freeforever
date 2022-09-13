import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { startUploadFile } from '../actions'

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
