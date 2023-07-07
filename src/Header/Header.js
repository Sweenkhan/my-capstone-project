import React from 'react'
import "./Header.css"
import {Link} from "react-router-dom"
 
function Header() {
  return (
    <div className='header'>
        <div className='logo'>BOOK<span>SHELF</span></div>
        <ul>
           <li>
             <Link to="/about">About</Link>
           </li>
           <li>
             <Link to="/cart">Cart</Link>
           </li>
           <li>
             <Link to="/book">Books</Link>
           </li>
           <li>
             <Link to="/login">Login</Link>
           </li>
            
        </ul>
        
    </div>
  )
}

export default Header