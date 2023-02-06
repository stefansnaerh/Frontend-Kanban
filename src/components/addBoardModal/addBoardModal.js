
import './addBoardModal.scss'

import { useState, useRef, useContext } from 'react'
import apiBoard from '../../utils/apiBoard'

import useOnClickOutside from '../../utils/useOnClickOutside'
import { BackgroundGrayContext } from '../../App'

//icons
import xIcon from '../../images/x.svg' 


const AddBoardModal = ( {closeAddBoardModal} ) => {
    const {setGrayBackground} = useContext(BackgroundGrayContext)
    const [columnCount, setColumnCount] = useState(["e.g Todo" , "e.g Doing"])
    // object to store columns before posting
    const [columnNames, setColumnNames] = useState({ })
    const [boardName, setBoardName] = useState("")
    //initialize column count variable to mutate state
    // in createColumn, removeColumn and handleColumns functions 
    let newColumnCount

    const ref = useRef();

    // function that handles click outside of modals to close them
    useOnClickOutside(ref, () => {
        setGrayBackground('App')
        closeAddBoardModal()
    });

    const handleColumns = (e, index) => {
        newColumnCount = {...columnNames}
        newColumnCount[`key${index}`] = e.target.value
        setColumnNames(newColumnCount)
    } 

    const createColumn = (e) => {
        e.preventDefault()
        newColumnCount = [...columnCount]
        newColumnCount.push("")
        setColumnCount(newColumnCount)
    }
    const removeColumn = (e, index) => {
        e.preventDefault()
        newColumnCount = [...columnCount]
        newColumnCount.splice(index, 1)
        setColumnCount(newColumnCount)
    }

    const addNewBoard = (e) => {
        e.preventDefault()
        const newBoard = {
            title : boardName,
            columns: columnNames
        }
        apiBoard.post('/', newBoard)
        closeAddBoardModal()
        setGrayBackground('App')
    }
    return (
        <div ref={ref} className='add-board-modal'>
           <h1>Add new board</h1>
           <form>
            <label htmlFor='board-name'>Board Name</label>
            <input 
            name='board-name'
            className='board-name-input' 
            placeholder='e.g Web Design'
            onChange={(e) => {setBoardName(e.target.value)}}>
            </input>
            <fieldset>
                <legend>Board Columns</legend>
                {columnCount.map((input, index) => {
                    return (
                    <div key={index}>
                    <label htmlFor={`column ${index +1}`}></label>
                    <input placeholder={input} onChange={(e) => handleColumns(e, index)}></input>
                    <button onClick={(e) => removeColumn(e, index)}>
                        <img alt='X icon' src={xIcon}/>
                    </button>
                    </div>
                    )
                })}
                </fieldset>
            <button className='add-column-btn' onClick={createColumn}>+ Add New Column</button>
            <button className='submit-board-btn' onClick={addNewBoard}>Create New Board</button>
           </form>
        </div>
    )
}


export default AddBoardModal