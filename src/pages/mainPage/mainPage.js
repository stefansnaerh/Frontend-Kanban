import './mainPage.scss'

import TaskColumn from "../../components/taskColumn/taskColumn";
import ViewTaskModal from '../../components/viewTaskModal/viewTask';


import { BackgroundGrayContext } from '../../App';
import { useContext, useState } from 'react';
import Sidebar from '../../components/sidebar/sidebar';

const MainPage = ( {currentBoard, boardData} ) => {
    // changing column object to array
    const {taskContext, setTaskContext} = useContext(BackgroundGrayContext)
    const [displayViewTask, setDisplayViewTask] = useState(false)
    const columnsObjectToArray = Object.values(currentBoard.columns[0])
    
return (
    <main>
        <div className='sidebar'>
            <Sidebar 
            boardData={boardData}
            />
            </div>
            <div className='main-tasks'>
            {columnsObjectToArray.map(column => {
                return (
                    <div  className="column-container">
                    <TaskColumn
                    currentBoard={currentBoard}
                    taskStatus={column}
                    setDisplayViewTask={setDisplayViewTask}
                    />
                    </div>
                )
            })}
            {displayViewTask ? (
            <ViewTaskModal
            taskContext={taskContext}
            columns={columnsObjectToArray}
            setDisplayViewTask={setDisplayViewTask}
            displayViewTask={displayViewTask}
            currentBoard={currentBoard}
            /> 
            ) : null}
        </div>
    </main>
)
}

export default MainPage



