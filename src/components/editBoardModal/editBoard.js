


import '../addBoardModal/addBoardModal.scss'

import { useState, useRef, useContext } from 'react'
import apiBoard from '../../utils/apiBoard'

import useOnClickOutside from '../../utils/useOnClickOutside'
import { BackgroundGrayContext } from '../../App'

//icons
import xIcon from '../../images/x.svg' 

const EditBoardModal = ( {setDisplayEditBoard, board} ) => {
   
    const {greyBackground, setGrayBackground} = useContext(BackgroundGrayContext)
    const [columnCount, setColumnCount] = useState([])
    // object to store columns before posting
    const [columnNames, setColumnNames] = useState(board.columns[0])
    const [boardName, setBoardName] = useState(board.title)
    //initialize column count variable to mutate state
    // in createColumn, removeColumn and handleColumns functions 
    let newColumnCount

    const ref = useRef();
    console.log(board)

    // function that handles click outside of modals to close them
    useOnClickOutside(ref, () => {
        setGrayBackground('App')
        setDisplayEditBoard(false)
    });

    const handleColumns = (e, index) => {
        newColumnCount = {...columnNames}
        newColumnCount[`key${index}`] = e.target.value
        setColumnNames(newColumnCount)
        console.log(columnNames)
    } 

    const createColumn = (e) => {
        e.preventDefault()
        newColumnCount = {...columnCount}
        newColumnCount.
        setColumnCount(newColumnCount)
    }
    const removeColumn = (e, index) => {
        e.preventDefault()
        newColumnCount = [...columnCount]
        newColumnCount.splice(index, 1)
        setColumnCount(newColumnCount)
    }

    const editBoard = (e) => {
        e.preventDefault()
        const newBoard = {
            title : boardName,
            columns: columnNames
        }
        apiBoard.put(`/${board._id}`, newBoard)
        setDisplayEditBoard(false)
        setGrayBackground('App')
    }
    return (
        <div ref={ref} className='add-board-modal'>
           <h1>Edit Board</h1>
           <form>
            <label htmlFor='board-name'>Board Name</label>
            <input 
            name='board-name'
            className='board-name-input' 
            value={boardName}
            onChange={(e) => {setBoardName(e.target.value)}}>
            </input>
            <fieldset>
                <legend>Board Columns</legend>
                {Object.values(columnNames).map((input, index) => {
                    return (
                    <div key={index}>
                    <label htmlFor={`column ${index +1}`}></label>
                    <input value={input} onChange={(e) => handleColumns(e, index)}></input>
                    <button onClick={(e) => removeColumn(e, index)}>
                        <img src={xIcon}/>
                    </button>
                    </div>
                    )
                })}
                </fieldset>
            <button className='add-column-btn' onClick={createColumn}>+ Add New Column</button>
            <button className='submit-board-btn' onClick={editBoard}>Save changes</button>
           </form>
        </div>
    )
}


export default EditBoardModal