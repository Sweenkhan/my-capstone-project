import React from 'react' 
import MainIng from "../images/home.svg"
 
import "./Home.css"

function Home() {
  return (
     <div className='home'>
     <div className='main-bg' > 
     <img src={MainIng} alt="main-img" />
     </div>
       
     </div>
  )
}

export default Home