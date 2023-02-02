import './addTaskModal.scss'
import { useContext, useState, useRef } from 'react'

import apiTask from '../../utils/apiTask'
import { BackgroundGrayContext } from '../../App'
import useOnClickOutside from '../../utils/useOnClickOutside'

//icons
import xIcon from '../../images/x.svg' 

const AddTaskModal = ({closeAddTaskModal, boardData}) => {
    const {greyBackground, setGrayBackground} = useContext(BackgroundGrayContext)
    const {boardIndex , setBoardIndex} = useContext(BackgroundGrayContext)
    const [columnCount, setColumnCount] = useState(["e.g Make Coffee" , "e.g Drink Coffee and smile"])
    const [subTaskNames, setSubTaskNames] = useState([])
    const [taskName, setTaskName] = useState("")
    const [taskDescription, setTaskDescription] = useState("")
   // getStatus wasnt posting the status if you didnt choose anything because of the onchange
   // So I needed to store the first element in columns array to state
    const correctBoard = boardData[boardIndex]
    const columnsObjectToArray = Object.values(correctBoard.columns[0])
    const [getStatus, setGetStatus] = useState(columnsObjectToArray[0])
    const ref = useRef();

    // function that handles click outside of modals to close them
    useOnClickOutside(ref, () => {
        setGrayBackground('App')
        closeAddTaskModal()
    });

    const boardId = boardData[boardIndex]._id
     //initialize column count variable to mutate state
    // in createColumn, removeColumn and handleColumns functions 
    let newColumnCount
    
    const handleColumns = (e, index) => {
        newColumnCount = [...subTaskNames]
        const newSubtask = {
            name : e.target.value,
            done : false
        }
        newColumnCount.splice(index, 1 ,newSubtask)
        setSubTaskNames(newColumnCount)
    } 
    console.log(subTaskNames)
    // create input under <fieldset/>
    const createColumn = (e) => {
        e.preventDefault()
        newColumnCount = [...columnCount]
        newColumnCount.push("")
        setColumnCount(newColumnCount)
    }
     // remove input under <fieldset/>
    const removeColumn = (e, index) => {
        e.preventDefault()
        newColumnCount = [...columnCount]
        newColumnCount.splice(index, 1)
        setColumnCount(newColumnCount)
    }
    console.log(getStatus)
    const addNewTask = (e) => {
        e.preventDefault()
        const newBoard = {
            name : taskName,
            status: getStatus,
            description: taskDescription,
            subtasks: subTaskNames
        }
        apiTask.post(`/${boardId}`, newBoard)
        closeAddTaskModal()
    }    
    return (
        <>
        <div ref={ref} className='add-task-modal'>
           <h1>Add New Task</h1>
           <form>
            <label htmlFor='task-name'>Title</label>
            <input 
            name='task-name'
            className='task-name-input' 
            placeholder='e.g Take coffee break'
            onChange={(e) => {setTaskName(e.target.value)}}>
            </input>
            <label htmlFor='description'>Description</label>
            <textarea 
            name='description'
            placeholder='e.g. It’s always good to take a break. This 
            15 minute break will  recharge the batteries 
            a little.'
            onChange={(e) => setTaskDescription(e.target.value)}
            ></textarea>
            <fieldset>
                <legend>Subtasks</legend>
                {columnCount.map((input, index) => {
                    return (
                    <div>
                    <label htmlFor={`column ${index +1}`}></label>
                    <input placeholder={input} onChange={(e) => handleColumns(e, index)}></input>
                    <button onClick={(e) => removeColumn(e, index)}>
                        <img alt='x-icon' src={xIcon}/>
                    </button>
                    </div>
                    )
                })}
                 <button className='add-column-btn' onClick={createColumn}>+ Add New Subtask</button>
                </fieldset>
            <label htmlFor='pick-status' className='status-label'>Status</label>
                    <select name='pick-status' onChange={(e) => setGetStatus(e.target.value)}>
                        {columnsObjectToArray.map((column, key) => {
                            return (
                                <>
                                <option key={key} value={column}>{column}</option>
                                </>
                            )
                        })}
                    </select>
                    <button className='submit-task-btn' onClick={addNewTask}>Create Task</button>
           </form>
        </div>
        </>
    )
}

export default AddTaskModal