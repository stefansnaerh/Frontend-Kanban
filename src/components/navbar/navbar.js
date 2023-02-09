
import './navbar.scss'
import { useState, useContext} from 'react'
// icons
import plusSign from '../../images/+.svg'
import threeDots from '../../images/threeDots.svg'
import threeDotsDark from '../../images/threeDotsDark.svg'
// components
import NavlinksMobile from '../navlinksMobile/navlinksMobile'
import AddTaskModal from '../addTaskModal/addTaskModal'
import DeleteModal from '../deleteModal/deleteModal'
import EditDeleteModal from '../editDeleteModal/editDeleteModal'
import EditBoardModal from '../editBoardModal/editBoard'
//functions
import { BackgroundGrayContext } from '../../App'


const Navbar = ({boardData, boardIndex}) => {
    const [displayEditAndDelete, setDisplayEditAndDelete] = useState(false)
    const [displayAddTaskModal, setDisplayAddTaskModal] = useState(false)
    const [displayDeleteModal, setDisplayDeletekModal] = useState(false)
    const [displayEditBoard, setDisplayEditBoard] = useState(false)
    const {setGrayBackground, darkMode} = useContext(BackgroundGrayContext)
  
   
    const displayEditAndDeleteModal = () => {
        setDisplayEditAndDelete(prev => !prev)
    }

    const handleAddTask = () => {
        setDisplayAddTaskModal(true)
        setGrayBackground('App-disabled')
    }
    const closeAddTaskdModal = () => {
        setDisplayAddTaskModal(false)
        setGrayBackground('App')
    }
    const showDeleteModal = () => {
        setDisplayDeletekModal(true)
        setDisplayEditAndDelete(false)
        setGrayBackground('App-disabled')
    }
    const showEditModal = () => {
        setDisplayEditBoard(true)
        setGrayBackground('App-disabled')
    }
    

    return (
        <header style={darkMode ? {backgroundColor: "#2B2C37"} : {backgroundColor: "#FFFFFF"}}>
            <div className='logo-container'>
                <span className='line1'></span>
                <span className='line2'></span>
                <span className='line3'></span>
            </div>
            <h1 style={darkMode ? {color: "#FFFFFF"} : {color : "#000000"}}>kanban</h1>
            <span className='sidebar-line'></span>
            <h2 style={darkMode ? {color: "#FFFFFF"} : {color : "#000000"}} >{boardData[boardIndex].title}</h2> 
           <NavlinksMobile
           boardData={boardData}
           />
            <div className='add-task-see-more-container'>
                <button onClick={handleAddTask} className='add-task-button-mobile'>
                    <img alt='plus sign' src={plusSign}></img>
                </button>
                <button onClick={handleAddTask} className='add-task-button-ipad'>
                    + Add New Task
                </button>
                <button  className='three-dots-button' onClick={displayEditAndDeleteModal}>
                <img  alt='three dots' className='three-dots' src={darkMode ? threeDotsDark : threeDots  }></img>
                </button>
            </div>
            {displayEditAndDelete ? (
            <EditDeleteModal
            showDeleteModal={showDeleteModal}
            setDisplayEditAndDelete={setDisplayEditAndDelete}
            element={'board'}
            showEdit={showEditModal}
            />
            ): null}
            {displayEditBoard ? (
                <EditBoardModal
                setDisplayEditBoard={setDisplayEditBoard}
                board={boardData[boardIndex]}
                />
            ): null}
            {displayDeleteModal ? (
              <DeleteModal
              itemName={boardData[boardIndex].title}
              boardToDelete={boardData[boardIndex]._id}
              setDisplayDeleteModal={setDisplayDeletekModal}
              element={'board'}
              />  
            ): null}
             
            {displayAddTaskModal ? (
            <AddTaskModal
            boardData = {boardData}
            closeAddTaskModal = {closeAddTaskdModal}
            />) : null }
        
        </header>
    )
}


export default Navbar