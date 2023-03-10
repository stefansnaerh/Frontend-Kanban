import './index.css';

import apiBoard from './utils/apiBoard';
import { useState, useEffect, createContext } from "react";

import MainPage from './pages/mainPage/mainPage';
import Navbar from './components/navbar/navbar';



export const BackgroundGrayContext = createContext()




function App() {
  const [loading, setLoading] = useState(true)
  const [boardData, setBoardData] = useState({})
  // setting class for App to state to be able to change to gray background onClick from other components
  const [greyBackground, setGrayBackground] = useState('App')
 
  const [boardIndex, setBoardIndex] = useState(0)
  const [taskContext, setTaskContext] = useState([])
  const [darkMode, setDarkMode] = useState(false)
  const currentBoard = boardData[boardIndex]

  useEffect(() => {
      const getBoards = async()=>{
          const b = await apiBoard.get('/')
          setBoardData(b.data)
          setLoading(false) 
      }
      getBoards()
  
  }, [])

  console.log()

  return (
    <div className={greyBackground}>
      {loading ? (<>Loading.....</>): (
      <BackgroundGrayContext.Provider 
      value={{
        greyBackground, setGrayBackground,
        boardIndex , setBoardIndex,
        taskContext, setTaskContext,
        darkMode, setDarkMode,
        }}>
        <Navbar
        boardData={boardData}
        boardIndex= {boardIndex}
        currentBoard = {currentBoard}
        taskContext = {taskContext}
        />
        <MainPage
        currentBoard={currentBoard}
        boardData={boardData}
        setBoardData={setBoardData}
        />
      </BackgroundGrayContext.Provider>
      )}
      </div>
  );
}

export default App;

