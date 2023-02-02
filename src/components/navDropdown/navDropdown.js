import boardIcon from '../../images/boardIcon.svg'
import boardIconPurple from '../../images/boardIconPurple.svg'
import boardIconWhite from '../../images/boardIconWhite.svg'
import { useContext } from 'react'
import { BackgroundGrayContext} from '../../App'
import useComponentVisible from '../../utils/useComponentVisible'


const NavDropdown =  ({ boardData,  setDisplayLinks, handleAddBoardModal}) =>  {
    const {greyBackground, setGrayBackground} = useContext(BackgroundGrayContext)
    const {boardIndex, setBoardIndex} = useContext(BackgroundGrayContext)
    const { ref, isComponentVisible } = useComponentVisible(true);
    
    const closeOnClick = (index) => {
        setBoardIndex(index)
        setDisplayLinks(false)
        setGrayBackground('App')
    }
    if (isComponentVisible === true) {
        setGrayBackground('App-disabled')
    } else {
        setGrayBackground('App')
    }
   
    return (
        <>
         <div ref={ref} className='links-container'>
            {isComponentVisible && (
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
                                <a onClick={()=> closeOnClick(index)}>{board.title}</a>
                            </div>
                            )
                        }
                    </>
                    )
                })}
                <div className='create-board-container'>
                    <img src={boardIconPurple}/>
                    <button className='create-board-btn'
                     onClick={handleAddBoardModal}>
                        + Create New Board
                    </button>
                 </div>
                 </>
                 )}
            </div>
        </>
    )
}


export default NavDropdown