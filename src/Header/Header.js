import React from 'react'
import "./Header.css" 
import {Link} from "react-router-dom"
import SearchIcon from '@mui/icons-material/Search';
 
function Header() {
  return (
    <div className='header'>
        <div className='logo'><Link to="/">BOOK<span>SHELF </span></Link></div>
        <form  method='post' action='http://localhost:8080/search'>
        <input type="search" id="search" name="gsearch" placeholder='Find books...' />
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
           <li>
             <Link id='login' to="/login">Login</Link>
           </li>
            
        </ul>
        
    </div>
  )
}

export default Header