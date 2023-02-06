import './editDeleteModal.scss'

import useOnClickOutside from '../../utils/useOnClickOutside'
import { useRef } from 'react'


const EditDeleteModal = ({showDeleteModal, setDisplayEditAndDelete, element, showEdit}) => {
    const ref = useRef()
    
    useOnClickOutside(ref, () => {
        setDisplayEditAndDelete(false)
    })
    return (
        <div ref={ref} className='edit-delete-board-container'>
                <button onClick={showEdit} className='edit-board'>Edit {element}</button>
                <button onClick={showDeleteModal} className='delete-board'>Delete {element}</button>
        </div>
    )
}


export default EditDeleteModal