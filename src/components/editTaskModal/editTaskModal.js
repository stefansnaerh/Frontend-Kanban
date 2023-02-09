import '../addTaskModal/addTaskModal.scss'

import { useContext, useState, useRef, Fragment } from 'react'

import apiTask from '../../utils/apiTask'
import { BackgroundGrayContext } from '../../App'
import useOnClickOutside from '../../utils/useOnClickOutside'

//icons
import xIcon from '../../images/x.svg' 



const EditTaskModal = ( {boardData,  taskContext,  setDisplayEditTask} ) => {

    const {setGrayBackground, darkMode} = useContext(BackgroundGrayContext)
    const {boardIndex} = useContext(BackgroundGrayContext)
    const [subTaskNames, setSubTaskNames] = useState(taskContext.subtasks)
    const [taskName, setTaskName] = useState(taskContext.name)
    const [taskDescription, setTaskDescription] = useState(taskContext.description)
   // getStatus wasnt posting the status if you didnt choose anything because of the onchange
   // So I needed to store the first element in columns array to state
    const correctBoard = boardData[boardIndex]
    const columnsObjectToArray = Object.values(correctBoard.columns[0])
    const [getStatus, setGetStatus] = useState(taskContext.status)
    const ref = useRef();

    // function that handles click outside of modals to close them
    useOnClickOutside(ref, () => {
        setGrayBackground('App')
        setDisplayEditTask(false)
    });

    const boardId = boardData[boardIndex]._id
     //initialize column count variable to mutate state
    // in createColumn, removeColumn and handleColumns functions 
    let newColumnCount = taskContext.subtasks
    
    const handleColumns = (e, index) => {
        newColumnCount = [...subTaskNames]
        newColumnCount[index].name = e.target.value
        setSubTaskNames(newColumnCount)
    } 

    // create input under <fieldset/>
    const createColumn = (e) => {
        e.preventDefault()
        newColumnCount = [...subTaskNames]
        const newSubtask = {
            name: "",
            done : false
        }
        newColumnCount.push(newSubtask)
        setSubTaskNames(newColumnCount)
    }
     // remove input under <fieldset/>
    const removeColumn = (e, index) => {
        e.preventDefault()
        newColumnCount = [...subTaskNames]
        newColumnCount.splice(index, 1)
        setSubTaskNames(newColumnCount)
    }

 
    const editTask = (e) => {
        e.preventDefault()
        const newBoard = {
            name : taskName,
            status: getStatus,
            description: taskDescription,
            subtasks: subTaskNames
        }

        apiTask.put(`/${boardId}/tasks/${taskContext._id}`, newBoard)
        setDisplayEditTask(false)
        setGrayBackground('App')
    }   
    return (
        <>
        <div 
        style={darkMode ? {backgroundColor : "#2B2C37"} : {backgroundColor : "#FFFFFF"}}
        ref={ref} className='add-task-modal'>
           <h1
            style={darkMode ? {color : "#FFFFFF"} : {color : "#000000"}}
           >Edit Task</h1>
           <form>
            <label htmlFor='task-name'>Title</label>
            <input 
            className={darkMode ? "input-dark" : null}
            name='task-name'
            value={taskName}
            onChange={(e) => {setTaskName(e.target.value)}}>
            </input>
            <label htmlFor='description'>Description</label>
            <textarea 
            className={darkMode ? "input-dark" : null}
            name='description'
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            ></textarea>
            <fieldset>
                <legend>Subtasks</legend>
                {subTaskNames.map((subtask, index) => {
                    return (
                    <div key={index}>
                    <label htmlFor={`column ${index +1}`}></label>
                    <input 
                    className={darkMode ? "input-dark" : null}
                    value={subtask.name} onChange={(e) => handleColumns(e, index)}></input>
                    <button onClick={(e) => removeColumn(e, index)}>
                        <img alt='x-icon' src={xIcon}/>
                    </button>
                    </div>
                    )
                })}
                 <button 
                 style={darkMode ? {backgroundColor : "#FFFFFF"} : null}
                 className='add-column-btn' onClick={createColumn}>+ Add New Subtask</button>
                </fieldset>
            <label htmlFor='pick-status' className='status-label'>Status</label>
                    <select 
                    style={darkMode ? {backgroundColor : "#20212C", color: "#ffffff"} : {backgroundColor : "#FFFFFF"}}
                    value={taskContext.status} name='pick-status' onChange={(e) => setGetStatus(e.target.value)}>
                        {columnsObjectToArray.map((column, index) => {
                            return (
                                <Fragment key={index}>
                                <option  value={column}>{column}</option>
                                </Fragment>
                            )
                        })}
                    </select>
                    <button className='submit-task-btn' onClick={editTask}>Save Changes</button>
           </form>
        </div>
        </>
    )
}



export default EditTaskModal