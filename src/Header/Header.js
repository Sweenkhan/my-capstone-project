import React, { useState } from 'react'
import "./Header.css" 
import {Link} from "react-router-dom"
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { useContext } from 'react';
import { searchedContext } from '../App/App';
import { useNavigate } from 'react-router-dom';  

function Header() {

  const {setSearchedBooks} = useContext(searchedContext); 

  const [hasfriend, setHasFriend] = useState(false)
  const [allUsers, setAllUsers] = useState([])
  const [searchBook, setSearchBook] = useState("");
  const navigate = useNavigate()
  const session = localStorage.getItem("session")

  const headers = {
    "Content-Type": "application/json",
    authorization: session,
  };

//----------------------------GET SEARCH BOOKS----------------------------//
  function handleGsearch(e) { 
    e.preventDefault()
      axios.post("http://localhost:8080/search", {searchBook})
      .then((result) =>{

        console.log("data to aa gya")
        console.log(result.data)

        setSearchedBooks(result.data)
         setSearchBook('')
         navigate("/search")

      }).catch((err) => {
        console.log("error to bta do",err)
      })
    
  }

//----------------------------HANDLE LOGOUT REQUEST------------------------------//
  function handlLogout(e){
         e.preventDefault()
          
          localStorage.setItem("session", "") 
          navigate("/")
          console.log("user has logged out")
  }

//-------------------------GET ALL USERS-----------------------------------------//
  function getUsers(e){
        e.preventDefault()
        console.log(session)
        axios.get("http://localhost:8080/allusers", {headers})
           .then((result)=>{
            setAllUsers(result.data)
            console.log(result.data)
            setHasFriend(true)
           })
  }


//--------------------SENDING FRIEND REQUES------------------------------------//

function sendRequest(e, friendUsername){
   e.preventDefault(); 
   axios.patch("http://localhost:8080/frienRequest", {session, friendUsername})
     .then((result) => {
         console.log(result.data)
     })
}


  return (
    <div className='header'>
        <div className='logo'><Link to="/">BOOK<span>SHELF </span></Link></div>
        <form  method='post' action='http://localhost:8080/search' onSubmit={handleGsearch}>
        <input type="search" id="search" name="gsearch" value={searchBook}
        placeholder='Find books...' onChange={e => {setSearchBook(e.target.value)}}/>
        <label for="search"><SearchIcon /></label>
      
        </form>
        <ul>
           <li>
             <Link to="/about">About</Link>
           </li>
           <li>
             <Link to="/dashboard">Dashboard</Link>
           </li>
           <li>
             <Link to="/book">Books</Link>
           </li>
           <li>{
            (localStorage.getItem("session")) ? <button onClick={handlLogout}>Logout</button> : <Link id='login' to="/login">Login</Link>
           }
           </li>
           <li onClick={getUsers} className='friends'>Friends </li>
            {
              (hasfriend && localStorage.getItem("session")) ? <ul className='drop-down-friendlist'><li onClick={e => setHasFriend(false)}>X</li>{
              allUsers.map((usr, index) => {
              return <li key={index} >{usr.username}<span style={{backgroundColor: "red", fontSize: "8px"}} onClick={e => sendRequest(e, usr.username)}> sending</span></li>
            })}
            </ul>: ""}
             
            
        </ul>
        
    </div>
  )
}

export default Header