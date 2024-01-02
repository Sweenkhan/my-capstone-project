import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./Register.css"
import axios from 'axios'
import registerImg from "../images/register.jpg"
import { useNavigate } from 'react-router-dom'
import { porturl } from '../url/porturl' 
import {ToastContainer, toast } from 'react-toastify'


function Register() {

  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")



  function handleRegister(e){
    e.preventDefault()
         axios.post(porturl + '/register', {name, email, phone, username, password})
         .then((result) =>{ 
          if(result.data.status === 200){ 
            toast.success("Successfully create account ")
            setTimeout(() => { 
              navigate('/login')
            }, 3000);
             } else {
              let message = result.data.message
              toast.error(`${message}! choose another username`)
             console.log(result.data.message)
              navigate('/register')
             }
         })
  }
  

  return (
    <div className='register'>
    
    <div className='container'> 
    <div className='left'><img src={registerImg} alt="register -img"></img></div>
    <div className='right'> 
      <h2>Register</h2>
      <form method='post' onSubmit={handleRegister}>
        <input type='text' name='name' placeholder='Name' value={name} onChange={e => setName(e.target.value)} required/><br />
        <input type='email' name='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} required/><br />
        <input type='number' id='mobile' name='phone' placeholder='Phone' value={phone} onChange={e => setPhone(e.target.value)} required/><br />
        <input type='text' name='username' placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} required/><br />
        <input type='password' name='password' placeholder='Password'value={password} onChange={e => setPassword(e.target.value)} required/><br />
        <div className='btns'> <button type='submit' name='register'>Submit</button>
        <p>Already have an account?  <Link to="/login">Login</Link></p>
        </div>
      </form>
      </div>
    </div>
    <ToastContainer
    position="top-center"
    autoClose={3000}  
    theme="light"
    />
    </div>
  )
}

export default Register