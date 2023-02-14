import './viewTask.scss'
import threeDots from '../../images/threeDots.svg'
import threeDotsDark from '../../images/threeDotsDark.svg'
import apiTask from '../../utils/apiTask'
import { useContext, useState, useRef, Fragment } from 'react'
import { BackgroundGrayContext } from '../../App'
import useOnClickOutside from '../../utils/useOnClickOutside'
import EditDeleteModal from '../editDeleteModal/editDeleteModal'


const ViewTaskModal = ({taskContext, columns, setDisplayViewTask, currentBoard, showDeleteModal, showEdit}) => {
    const [getStatus, setGetStatus] = useState(taskContext.status)
    const [taskId] = useState(taskContext._id)
    const [subtasks, setSubtasks] = useState(taskContext.subtasks)
    const {setGrayBackground, darkMode} = useContext(BackgroundGrayContext)
    const [displayEditDelete, setDisplayEditDelete] = useState(false)
    const ref = useRef()

    useOnClickOutside(ref, () => {
        setDisplayViewTask(false)
        setGrayBackground('App')
        handleChangedTask()
    })
    console.log(subtasks)



    const handleSubtasks = (index) => {
        const newSubtasks = [...subtasks]
        if (newSubtasks[index].done === false){
            newSubtasks[index].done = true
        } else {
            newSubtasks[index].done = false
        }
        setSubtasks(newSubtasks)
    }
    const handleChangedTask = () => {
        const updatedTask = {
            status: getStatus,
            subtasks : subtasks
        }
        apiTask.put(`/${currentBoard._id}/tasks/${taskId}`, updatedTask)
    }
    console.log(taskContext)

    return (
        <div 
        style={darkMode ? {backgroundColor : "#2B2C37"} : {backgroundColor : "#FFFFFF"}} 
        ref={ref} className='view-task-container'>
            <div className='button-text-container'>
            <h1 style={darkMode ? {color : "#FFFFFF"} : {color : "#000000"}}  >{taskContext.name}</h1>
            <button onClick={() => setDisplayEditDelete(prev => !prev)}>
                <img alt='three dots' src={darkMode ? threeDotsDark : threeDots}></img>
            </button>
            </div>
            <p>{taskContext.description}</p>
            <form>
                <fieldset>
                    <legend>Subtasks</legend>
                    {taskContext.subtasks.map((subtask, index) => {
                        return (
                            <Fragment key={index}>
                            <div 
                            style={darkMode ? {backgroundColor : "#20212C"} : null }
                            className='checkbox-label-container'>
                                {subtask.done === true ?  (
                                <>
                                    <input
                                    style={darkMode ? {color : "#2B2C37"} : {color : "#FFFFFF"}}
                                    value={subtasks[index].done} 
                                    name={subtask.name} type="checkbox" 
                                    onChange={() => handleSubtasks(index)} 
                                    checked>
                                    </input>
                                    <label className='label-line-through' 
                                    htmlFor={subtask.name}>{subtask.name}
                                    </label>  
                                </>
                                ) : (
                                <>
                                    <input 
                                    value={subtasks[index].done} 
                                    name={subtask.name} type="checkbox" 
                                    onChange={() => handleSubtasks(index)}>
                                    </input>
                                    <label 
                                    htmlFor={subtask.name}>{subtask.name}
                                    </label>
                                </>
                                )}
                            </div>
                            </Fragment>
                        )
                    })}
                </fieldset>
                <label htmlFor='pick-status' className='status-label'>Current Status</label>
                    <select 
                    style={darkMode ? {backgroundColor : "#20212C", color: "#ffffff"} : {backgroundColor : "#FFFFFF"}} 
                    name='pick-status' 
                    onChange={(e) => setGetStatus(e.target.value)}>
                        {columns.map((column, index) => {
                            return (
                                <Fragment key={index}>
                                <option value={column}>{column}</option>
                                </Fragment>
                            )
                        })}
                    </select>
            </form>
            {displayEditDelete ? 
            <EditDeleteModal
            showDeleteModal={showDeleteModal}
            element={'task'}
            setDisplayViewTask={setDisplayViewTask}
            showEdit={showEdit}
            /> : null}
        </div>
    )
}

export default ViewTaskModal