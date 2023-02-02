

import { set } from "mongoose";
import { useState, useEffect } from "react";
import "./login.scss";

import api from "../../utils/api";


const Login = () => {

const [password, setPassword] = useState("")
const [email, setEmail] = useState("")
const [boardData, setBoardData] = useState({})

useEffect(() => {
    const getBoards = async()=>{
        const b = await api.get('/')
        setBoardData(b.data)
     
    }
    getBoards()
    console.log(boardData)
}, [])
console.log(boardData)

const handleLogin = () => {
    
}

    return (
        <>
        <section className="login-section">
            <form onSubmit={handleLogin}>
            <div className="welcome-container">   
                <h1>Welcome back</h1>
                <h2>Please enter your details</h2>
            </div>
            <div className="login-container">
                <label for="email">Email</label>
                <input 
                placeholder="Please enter your email" 
                name="email" 
                type="email" 
                onChange={(e) => setEmail(e.target.value)}
                ></input>
                <label for="password">Password</label>
                <input 
                placeholder="Please enter your password" 
                name="password" 
                type="password" 
                onChange={(e) => setPassword(e.target.value) }
                ></input>
                <button>Sign in</button>
            </div>    
            </form>
        </section>
        </>
    )
}


export default Login