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

  useEffect(() => {
      const getBoards = async()=>{
          const b = await apiBoard.get('/')
          setBoardData(b.data)
          setLoading(false) 
      }
      getBoards()
  
  }, [])


  return (
    <div className={greyBackground}>

      {loading ? (<>Loading.....</>): 
      (
      <BackgroundGrayContext.Provider 
      value={{
        greyBackground, setGrayBackground,
        boardIndex , setBoardIndex,
        taskContext, setTaskContext
        }}>
        <Navbar
        boardData={boardData}
        boardIndex= {boardIndex}
        />
        <MainPage
        currentBoard={boardData[boardIndex]}
        boardData={boardData}
        />
      </BackgroundGrayContext.Provider>
      )}
      </div>
  );
}

export default App;

