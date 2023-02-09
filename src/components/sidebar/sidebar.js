
import './sidebar.scss'

import boardIcon from '../../images/boardIcon.svg'
import boardIconPurple from '../../images/boardIconPurple.svg'
import boardIconWhite from '../../images/boardIconWhite.svg'

import AddBoardModal from '../addBoardModal/addBoardModal'

import { useContext, useState, Fragment } from 'react'
import { BackgroundGrayContext} from '../../App'

const Sidebar = ( {boardData} ) => {
    const {boardIndex, setBoardIndex, darkMode} = useContext(BackgroundGrayContext)
    const {setGrayBackground} = useContext(BackgroundGrayContext)
    const [displayAddBoardModal, setDisplayAddBoardModal] = useState(false)
    const changeBoard = (index) => {
        setBoardIndex(index)
        window.localStorage.setItem('index', JSON.stringify(index))
    } 
    const closeAddBoardModal = () => {
        setDisplayAddBoardModal(false)
     }
     
     const openAddBoardModal = () => {
        setDisplayAddBoardModal(true)
        setGrayBackground('App-disabled')
     }

    return (
         <div 
         style={darkMode ? {backgroundColor : "#2B2C37"} : {backgroundColor : "#FFFFFF"}}
         className='sidebar-container'>
                <>
                <h3>All boards ( {boardData.length} )</h3>
                {boardData.map((board, index) => {
                    return (
                        <Fragment key={index} >
                        {boardData.indexOf(board) === boardIndex? (
                            <div  className="icon-links-container-focused">
                                <img alt='board-icon-white' src={boardIconWhite}/>
                                <button>{board.title}</button>
                            </div>
                            )  : (
                            <div  className="icon-links-container">
                                <img alt='board-icon' src={boardIcon}/>
                                <button onClick={() => changeBoard(index)}> {board.title}</button>
                            </div>
                            )
                        }
                    </Fragment>
                    )
                })}
                <div className='create-board-container'>
                    <img alt='board-icon-pruple' src={boardIconPurple}/>
                    <button onClick={openAddBoardModal} className='create-board-btn'
                     >
                        + Create New Board
                    </button>
                 </div>
                 </> 
                 {displayAddBoardModal ? (
                    <>
                    <AddBoardModal
                    closeAddBoardModal={closeAddBoardModal}/>
                    </>
                 ) : null}
            </div>
        
        
    )
}


export default Sidebar