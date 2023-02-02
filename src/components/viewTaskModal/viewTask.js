import './viewTask.scss'
import threeDots from '../../images/threeDots.svg'
import apiTask from '../../utils/apiTask'
import { useContext, useState, useRef } from 'react'
import { BackgroundGrayContext } from '../../App'
import useOnClickOutside from '../../utils/useOnClickOutside'
import EditDeleteBoard from '../editDeleteBoard/editDeleteBoard'
import DeleteModal from '../deleteModal/deleteModal'


const ViewTaskModal = ({taskContext, columns, setDisplayViewTask, currentBoard}) => {
    const [getStatus, setGetStatus] = useState(taskContext.status)
    const [taskId, setTaskId] = useState(taskContext._id)
    const [subtasks, setSubtasks] = useState(taskContext.subtasks)
    const {greyBackgorund, setGrayBackground} = useContext(BackgroundGrayContext)
    const [displayEditDelete, setDisplayEditDelete] = useState(false)
    const [displayDeleteModal, setDisplayDeleteModal] = useState(false)
    const ref = useRef()

    useOnClickOutside(ref, () => {
        setDisplayViewTask(false)
        setGrayBackground('App')
        handleChangedTask()
    })

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
    const showDeleteModal = () => {
        setDisplayDeleteModal(true)
        setDisplayEditDelete(false)
    }

    const taskToChange = `${currentBoard._id}/tasks/${taskId}`
    return (
        <div ref={ref} className='view-task-container'>
            <div className='button-text-container'>
            <h1>{taskContext.name}</h1>
            <button onClick={() => setDisplayEditDelete(prev => !prev)}>
                <img src={threeDots}></img>
            </button>
            </div>
            <p>{taskContext.description}</p>
            <form>
                <fieldset>
                    <legend>Subtasks</legend>
                    {taskContext.subtasks.map((subtask, index) => {
                        console.log(subtasks[index].done)
                        return (
                            <div className='checkbox-label-container'>
                                {subtask.done === true ?  (
                                <>
                                    <input 
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
                        )
                    })}
                </fieldset>
                <label htmlFor='pick-status' className='status-label'>Current Status</label>
                    <select name='pick-status' onChange={(e) => setGetStatus(e.target.value)}>
                        {columns.map((column, key) => {
                            return (
                                <>
                                <option key={key} value={column}>{column}</option>
                                </>
                            )
                        })}
                    </select>
            </form>
            {displayEditDelete ? 
            <EditDeleteBoard
            showDeleteModal={showDeleteModal}
            element={'task'}
            setDisplayViewTask={setDisplayViewTask}
            /> : null}
            {displayDeleteModal ? 
            <DeleteModal
            setDisplayDeleteModal={setDisplayDeleteModal}
            boardToDelete={taskToChange}
            itemName={taskContext.name}
            element={'task'}
            setDisplayViewTask={setDisplayViewTask}
            /> : null}
            
        </div>

    )
}


export default ViewTaskModal