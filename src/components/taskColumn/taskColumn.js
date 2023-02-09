
import './taskColumn.scss'
import { useRef, useEffect, useState, useContext, Fragment } from "react";
import ColumnHeader from '../columnHeader/columnHeader';

import { BackgroundGrayContext } from '../../App';

const TaskColumn = ( {currentBoard, taskStatus, setDisplayViewTask, columnColor} ) => {

    const childLength = useRef(null)
    const [countTasks, setCountTasks] = useState(0)
    const {setTaskContext} = useContext(BackgroundGrayContext)
    const {setGrayBackground, darkMode} = useContext(BackgroundGrayContext)


    useEffect(() => {
        // get number of tasks under each column
        const list = childLength.current.children
        setCountTasks(list.length)
    }, [{currentBoard}])

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
        columnColor={columnColor}
        />
        <div ref={childLength} className='tasks-column-container'>
        {currentBoard.tasks.map((task, index) => { 
            let number = 0
            task.subtasks.map(subtask => {
                if (subtask.done === true){
                    number++
                }
                return number
            })
          return (
            <Fragment key={index}>
            {taskStatus === task.status ? (
                <div 
                style={darkMode ? {backgroundColor : "#2B2C37"} : {backgroundColor : "#FFFFFF"}}
                onClick={() => handleClickOnColumn(task)} 
                className="task-card-collapsed-container">
                <h2 style={darkMode ? {color : "#FFFFFF"} : {color : "#000000"}}
                >{task.name}</h2>
                <h3>{number} of {task.subtasks.length} subtasks</h3>
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