import './columnHeader.scss'



const ColumnHeader = ( {taskStatus, countTasks, columnColor} ) => {

    return (
            <div className='column-header-container'>
            <span style={{backgroundColor : `${columnColor}`}} className='column-dot'></span>
            <h1 className="column-header">{taskStatus.toUpperCase()} ({countTasks})</h1>
            </div>
    )
}


export default ColumnHeader