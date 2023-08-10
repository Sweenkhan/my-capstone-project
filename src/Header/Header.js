import React, { useState } from 'react'
import "./Header.css" 
import {Link} from "react-router-dom"
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { useContext } from 'react';
import { searchedContext } from '../App/App';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../App/App';


function Header() {

  const {setSearchedBooks} = useContext(searchedContext)
  const {hasUserLoggedin, setHasUserLoggedin} = useContext(userContext)


  const [searchBook, setSearchBook] = useState("");
  const navigate = useNavigate()

  
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


  function handlLogout(e){
         e.preventDefault()

     axios.get("http://localhost:8080/logout")
     .then((result) => {
         if(result){
          console.log(result)
          console.log("user has logged out")
           setHasUserLoggedin(false)
         }
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
            (hasUserLoggedin) ? <button onClick={handlLogout}>Logout</button> : <Link id='login' to="/login">Login</Link>
           }
              
           </li>
            
        </ul>
        
    </div>
  )
}

export default Header