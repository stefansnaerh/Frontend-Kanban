import './editDeleteModal.scss'

import useOnClickOutside from '../../utils/useOnClickOutside'
import { BackgroundGrayContext } from '../../App'
import { useContext, useRef } from 'react'


const EditDeleteModal = ({showDeleteModal, setDisplayEditAndDelete, element, showEdit}) => {
    const {darkMode} = useContext(BackgroundGrayContext)
    const ref = useRef()

    
    useOnClickOutside(ref, () => {
        setDisplayEditAndDelete(false)
    })
    return (
        <div 
        style={darkMode ? {backgroundColor : "#2B2C37"} : {backgroundColor : "#FFFFFF"}}
        ref={ref} className='edit-delete-board-container'>
                <button onClick={showEdit} className='edit-board'>Edit {element}</button>
                <button onClick={showDeleteModal} className='delete-board'>Delete {element}</button>
        </div>
    )
}


export default EditDeleteModal