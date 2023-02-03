
import './taskColumn.scss'
import { useRef, useEffect, useState, useContext, Fragment } from "react";
import ColumnHeader from '../columnHeader/columnHeader';

import { BackgroundGrayContext } from '../../App';

const TaskColumn = ( {currentBoard, taskStatus, setDisplayViewTask} ) => {

    const testing = useRef(null)
    const [countTasks, setCountTasks] = useState(0)
    const {setTaskContext} = useContext(BackgroundGrayContext)
    const {setGrayBackground} = useContext(BackgroundGrayContext)
    
    useEffect(() => {
        // get number of tasks under each column
        const list = testing.current.children
        setCountTasks(list.length)
    }, [])

    const handleClickOnColumn = (task) => {
        setTaskContext(task) 
        setDisplayViewTask(true)
        setGrayBackground('App-disabled')
    }
    
    return (
        <>
        <ColumnHeader
        taskStatus={taskStatus}
        countTasks={countTasks}
        />
        <div ref={testing} className='tasks-column-container'>
        {currentBoard.tasks.map((task, index) => {
          return (
            <Fragment key={index}>
            {taskStatus === task.status ? (
                <div onClick={() => handleClickOnColumn(task)} className="task-card-collapsed-container">
                <h2>{task.name}</h2>
                <h3>0 of {task.subtasks.length} subtasks</h3>
            </div>
            
            ) :( <></>) }
            </Fragment>
            ) 
        })}
        </div>
        </>
    )
}


export default TaskColumn