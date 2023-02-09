// icons 
import boardIcon from '../../images/boardIcon.svg'
import boardIconPurple from '../../images/boardIconPurple.svg'
import boardIconWhite from '../../images/boardIconWhite.svg'
import moonIcon from '../../images/moonIcon.svg'
import sunIcon from '../../images/sunIcon.svg'


import { useContext } from 'react'
import { BackgroundGrayContext} from '../../App'
import useComponentVisible from '../../utils/useComponentVisible'


const NavDropdown =  ({ boardData,  setDisplayLinks, handleAddBoardModal}) =>  {
    const {setGrayBackground, setDarkMode, darkMode} = useContext(BackgroundGrayContext)
    const {boardIndex, setBoardIndex} = useContext(BackgroundGrayContext)
    const { ref, isComponentVisible } = useComponentVisible(true);
    
    const closeOnClick = (index) => {
        setBoardIndex(index)
        window.localStorage.setItem('index', JSON.stringify(index))
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
         <div
            style={darkMode ? {backgroundColor : "#2B2C37"} : {backgroundColor : "#FFFFFF"}}
            ref={ref} className='links-container'>
            {isComponentVisible && (
                <>
                <h3>All boards ( {boardData.length} )</h3>
                {boardData.map((board, index) => {
                    return (
                        <>
                        {boardData.indexOf(board) === boardIndex? (
                            <div key={index} className="icon-links-container-focused">
                                <img  alt='board icon white' src={boardIconWhite}/>
                                <button>{board.title}</button>
                            </div>
                            )  : (
                            <div key={index} className="icon-links-container">
                                <img alt='board icon' src={boardIcon}/>
                                <button onClick={()=> closeOnClick(index)}>{board.title}</button>
                            </div>
                            )
                        }
                    </>
                    )
                })}
                <div className='create-board-container'>
                    <img alt='board icon purple' src={boardIconPurple}/>
                    <button className='create-board-btn'
                     onClick={handleAddBoardModal}>
                        + Create New Board
                    </button>
                 </div>
                <div className='darkmode-container'>
                    <img alt='sun' src={sunIcon}/>
                    <button onClick={() => setDarkMode(prev => !prev)}>
                        toggle darkmode
                    </button>
                    <img alt='moon' src={moonIcon}/>
                </div>
                 </>
                 )}
            </div>
        </>
    )
}


export default NavDropdown