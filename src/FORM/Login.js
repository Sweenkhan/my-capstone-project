import React, { useState} from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import "./Login.css"
import {useNavigate} from "react-router-dom"; 
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


function Login() {
  
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
   const navigate = useNavigate()

  function handleSubmit(e) {

    e.preventDefault() 
         axios.post("https://bookshelf-server-1lpi.onrender.com/login", {username, password})
         .then((result) => {
          console.log(result)
            if(result.data.status === 200){ 
              localStorage.setItem("session", result.data.savedToken); 

              toast.success("You have succesfully logged in")
              setTimeout(() =>{
                navigate("/book")
              }, 3000)
                
            } else {
              toast.error("You have put wrong password and username!") 
            }
            // toast.error("You have put wrong password and username!")
         }).catch((err) =>{
          toast.error("Request failed!")
             console.log(err)
         })
  }
  
  return (
    <div className='login'>
    <div className='container'>
    <div className='loginLeft'></div>
    <div className='loginRight'>
    <h2>Login</h2>
        <form method='post' onSubmit={handleSubmit}>
        <input 
        required
        type='text' 
        name='username' 
        placeholder='Username'
        value={username}
        onChange={(e) => {setUsername(e.target.value)}}
         />  <br />
        <input 
        required
        type='password'
        name='password'
        placeholder='Password'
        value={password}
        onChange={(e) => {setPassword(e.target.value)}}
         /><br />
         <div className='btns'> 
        <button type="submit" name='login'>Submit</button>
        <p>Don't have an account? <Link to="/register">Create</Link></p>
        </div>
        <ToastContainer position='top-center' autoClose={3000} theme='dark'/>
    </form>
    </div> 
      
    </div>
    </div>
  )
}

export default Login