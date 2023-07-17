import React from 'react'
import "./Header.css" 
import {Link} from "react-router-dom"
import SearchIcon from '@mui/icons-material/Search';
 
function Header() {
  return (
    <div className='header'>
        <div className='logo'>BOOK<span>SHELF</span></div>
        <form>
        <input type="search" id="search" name="gsearch" />
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
           <li id='login'>
             <Link to="/login">Login</Link>
           </li>
            
        </ul>
        
    </div>
  )
}

export default Header