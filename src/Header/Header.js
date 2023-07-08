import React from 'react'
import "./Header.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import {Link} from "react-router-dom"
 
function Header() {
  return (
    <div className='header'>
        <div className='logo'>BOOK<span>SHELF</span></div>
        <form>
        <label for="search">Search</label>
        <input type="search" id="search" name="gsearch" />
        <FontAwesomeIcon icon="fa-light fa-magnifying-glass" beatFade size="2xs" />
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
             <Link to="/login" >Login</Link>
           </li>
            
        </ul>
        
    </div>
  )
}

export default Header