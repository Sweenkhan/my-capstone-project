import React from 'react'
// import axios from 'axios'


function Dashboard() {

  

    function handleClick(){
         localStorage.setItem("bookLike", "ravi")
         console.log()
    }

    function takeClick(){
    let data =   localStorage.getItem("session")
    console.log(data)
    }
   
  return (
    <div className='dashboard' style={{marginTop: "200px"}}> 
     <button onClick={handleClick}>set data</button>
     <button onClick={takeClick}>take data</button>
    </div>
  )
}

export default Dashboard