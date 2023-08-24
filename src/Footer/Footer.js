import React from 'react';
import { Link } from 'react-router-dom'
import "./Footer.css"
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';


function Footer() {
  return (
    <div className='footer'>
    <div className='container'>
    <ul>
        <li>
            <Link to="https://www.instagram.com/sweenkhan97/"><InstagramIcon sx={{ fontSize: 40 }} /></Link>
        </li>
        <li>
            <Link to="https://github.com/Sweenkhan"><GitHubIcon sx={{ fontSize: 40 }} /></Link>
        </li>
        <li>
            <Link to="https://www.linkedin.com/in/sween-khan-834024182/"><LinkedInIcon sx={{ fontSize: 40 }} /></Link>
        </li>
    </ul>
     </div>
     </div>
  )
}

export default Footer