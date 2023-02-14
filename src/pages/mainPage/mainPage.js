import './mainPage.scss'

import TaskColumn from "../../components/taskColumn/taskColumn";
import ViewTaskModal from '../../components/viewTaskModal/viewTask';


import { BackgroundGrayContext } from '../../App';
import { Fragment, useContext, useState, useEffect } from 'react';
import apiBoard from '../../utils/apiBoard';

import Sidebar from '../../components/sidebar/sidebar';
import DeleteModal from '../../components/deleteModal/deleteModal'

import EditTaskModal from '../../components/editTaskModal/editTaskModal';

const MainPage = ( {currentBoard, boardData, setBoardData} ) => {
    // changing column object to array
    const {taskContext, darkMode} = useContext(BackgroundGrayContext)
    const [displayViewTask, setDisplayViewTask] = useState(false)
    const [setDisplayEditDelete] = useState(false)
    const [displayDeleteModal, setDisplayDeleteModal] = useState(false)
    const [displayEditTask, setDisplayEditTask] = useState(false)
    const [taskIndex, setTaskIndex] = useState()
  
    const columnsObjectToArray = Object.values(currentBoard.columns[0])

     const showDeleteModal = () => {
        setDisplayDeleteModal(true)
        setDisplayEditDelete(false)
        setDisplayViewTask(false)
    }

    

    const showEdit = () => {
        setDisplayViewTask(false)
        setDisplayEditTask(true)
    }
    const columnColors = ["#49C4E5", "#67E2AE", "#8471F2", "#6DE8F0", "#78EE7D", "2500FC" ]


    const taskToChange = `${currentBoard._id}/tasks/${taskContext._id}`
return (
    <main style={darkMode ? {backgroundColor :" #20212C"} : {backgroundColor : "#F4F7FD"}}>
        <div className='sidebar'>
            <Sidebar 
            boardData={boardData}
            />
            </div>
            <div className='main-tasks'>
            {columnsObjectToArray.map((column, index) => {
                
                return (
                    <Fragment key={index}>
                    <div key={column} className="column-container">
                    <TaskColumn   
                    columnColor = {columnColors[index]}
                    currentBoard={currentBoard}
                    taskStatus={column}
                    setDisplayViewTask={setDisplayViewTask}
                    taskIndex = {taskIndex}
                    setTaskIndex = {setTaskIndex}
                    />
                    </div>
                    </Fragment>
                )
            })}
            {displayViewTask ? (
            <ViewTaskModal
            taskContext={taskContext}
            columns={columnsObjectToArray}
            setDisplayViewTask={setDisplayViewTask}
            displayViewTask={displayViewTask}
            currentBoard={currentBoard}
            showDeleteModal={showDeleteModal}
            showEdit={showEdit}
            /> 
            ) : null}
            {displayDeleteModal ? 
            <DeleteModal
            setDisplayDeleteModal={setDisplayDeleteModal}
            boardToDelete={taskToChange}
            itemName={taskContext.name}
            element={'task'}
            setDisplayViewTask={setDisplayViewTask}
            taskIndex = {taskIndex}
            currentBoard = {currentBoard}
            /> : null}
            {displayEditTask ? 
             <EditTaskModal
             currentBoard={currentBoard}
             boardData={boardData}
             taskContext={taskContext}
             taskToChange={taskToChange}
             setDisplayEditTask={setDisplayEditTask}
             taskIndex = {taskIndex}
             /> : null}
        </div>
    </main>
)
}

export default MainPage



