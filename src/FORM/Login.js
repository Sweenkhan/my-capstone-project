import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import "./Login.css"
import {useNavigate} from "react-router-dom";
import { userContext } from '../App/App';


function Login() {

  const {setHasUserLoggedin, hasUserLoggedin} = useContext(userContext);

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
   const navigate = useNavigate()

  function handleSubmit(e) {

    e.preventDefault() 
         axios.post("http://localhost:8080/login", {username, password})
         .then((result) => {
            if(result.data === "success"){
              console.log("succes ho gya") 
              setHasUserLoggedin(true)  
               navigate("/dashboard")
            } else {
              alert("wrong credential")
            }
         })
  }


console.log(hasUserLoggedin)
  return (
    <div className='login'>
    <div className='container'>
    <div className='loginLeft'></div>
    <div className='loginRight'>
    <h2>Login</h2>
        <form method='post' onSubmit={handleSubmit}>
        <input 
        type='text' 
        name='username' 
        placeholder='Username'
        value={username}
        onChange={(e) => {setUsername(e.target.value)}}
         />  <br />
        <input 
        type='password'
        name='password'
        placeholder='Password'
        value={password}
        onChange={(e) => {setPassword(e.target.value)}}
         /><br />
         <div className='btns'> 
        <button type="submit" name='login'>Submit</button>
        <Link to="/register">Create</Link>
        </div>
    </form>
    </div> 
     
    </div>
    </div>
  )
}

export default Login