
import './navlinks.scss'
// icons
import dropdownArrow from '../../images/dropdownArrow.svg'


import { useContext, useState} from 'react'
import { BackgroundGrayContext} from '../../App'

import AddBoardModal from '../addBoardModal/addBoardModal'
import NavDropdown from '../navDropdown/navDropdown'


const NavlinksMobile = ( {boardData} ) => {

    const [displayAddBoardModal, setDisplayAddBoardModal] = useState(false)
    const [displayLinks, setDisplayLinks] = useState(false)
    const { setGrayBackground} = useContext(BackgroundGrayContext)
    const {boardIndex} = useContext(BackgroundGrayContext)
    
    const handleDropdownMenu = () => {
        setDisplayLinks(prevState => !prevState)
      
    }
    const handleAddBoardModal = () => {
        setDisplayAddBoardModal(true)
        setGrayBackground('App-disabled')
        setDisplayLinks(false)
     }

     const closeAddBoardModal = () => {
        setDisplayAddBoardModal(false)
     }
     
    return (
        <>
        <nav className='nav-links-mobile'>
            <button  onClick={handleDropdownMenu}>
                <img  alt='click to see more' src={dropdownArrow}></img>
            </button>
            {displayLinks ? 
            <NavDropdown
            boardData={boardData}
            boardIndex={boardIndex}
            setDisplayLinks={setDisplayLinks}
            handleAddBoardModal={handleAddBoardModal}
            /> : null}
             {displayAddBoardModal ? 
             <AddBoardModal
             closeAddBoardModal={closeAddBoardModal}
             /> : 
             null}
         </nav>
        </>
    )
}


export default NavlinksMobile