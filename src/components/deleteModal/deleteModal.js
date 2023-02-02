import './deleteModal.scss'
import apiBoard from '../../utils/apiBoard'

import useOnClickOutside from '../../utils/useOnClickOutside'
import { BackgroundGrayContext } from '../../App'
import { useRef, useContext } from 'react'


const DeleteModal = ( {itemName, boardToDelete, setDisplayDeleteModal, element, setDisplayViewTask} ) => {
    const {greyBackground, setGrayBackground} = useContext(BackgroundGrayContext)
    const ref = useRef()
    useOnClickOutside(ref, () => {
        setGrayBackground('App')
        setDisplayDeleteModal(false)
    })
    
    const handleDelete= (e) => {
        e.preventDefault()
        apiBoard.delete(`/${boardToDelete}`)
        setDisplayDeleteModal(false)
        if(setDisplayViewTask !== undefined){
            setDisplayViewTask(false)
        }
        setGrayBackground('App')
    }
    return (
        <>
        <div ref={ref} className='delete-modal'>
            <h1>Delete this {element}?</h1>
            <p>Are you sure you want to delete the '{itemName}'? This action cannot be reversed.</p>
            <button onClick={handleDelete} className='delete-btn'>Delete</button>
            <button onClick={() => setDisplayDeleteModal(false)} className='cancel-btn'>Cancel</button>
        </div>
        </>
    )
}


export default DeleteModal