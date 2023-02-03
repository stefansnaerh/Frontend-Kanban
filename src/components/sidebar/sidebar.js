
import './sidebar.scss'

import boardIcon from '../../images/boardIcon.svg'
import boardIconPurple from '../../images/boardIconPurple.svg'
import boardIconWhite from '../../images/boardIconWhite.svg'

import { useContext } from 'react'
import { BackgroundGrayContext} from '../../App'

const Sidebar = ( {boardData} ) => {
    const {boardIndex, setBoardIndex} = useContext(BackgroundGrayContext)
    const changeBoard = (index) => {
        setBoardIndex(index)
    } 
    return (
         
         <div  className='sidebar-container'>
                <>
                <h3>All boards ( {boardData.length} )</h3>
                {boardData.map((board, index) => {
                    return (
                        <>
                        {boardData.indexOf(board) === boardIndex? (
                            <div className="icon-links-container-focused">
                                <img src={boardIconWhite}/>
                                <a>{board.title}</a>
                            </div>
                            )  : (
                            <div className="icon-links-container">
                                <img src={boardIcon}/>
                                <a onClick={() => changeBoard(index)}> {board.title}</a>
                            </div>
                            )
                        }
                    </>
                    )
                })}
                <div className='create-board-container'>
                    <img src={boardIconPurple}/>
                    <button className='create-board-btn'
                     >
                        + Create New Board
                    </button>
                 </div>
                 </> 
            </div>
        
        
    )
}


export default Sidebar