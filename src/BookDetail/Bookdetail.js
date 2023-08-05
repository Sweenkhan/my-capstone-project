 
import React from 'react'
import { useContext } from 'react'
import { searchedContext } from '../App/App'
import "./Bookdetail.css"
// import book from '../../../back/models/book'


function Bookdetail() {

    const {bookDetail, currentRead } = useContext(searchedContext);
    
   
    function colorGenrate(){ 
        const letter = [0,1,2,3,4,5,6,7,8,9,"a","b","c","d", "e", "f"]; 
          let generate = "#";
       
       for(let i = 0; i < 6; i++){
           generate += letter[Math.floor(Math.random() * letter.length)]
       } 
       return  generate += 60;
    } 
  let generate = colorGenrate()


  console.log(currentRead);

  
 
  return (
    <div className='bookdetail'> 
        <div className='row-img'  style={{background: `linear-gradient(${generate}, rgba(0, 0, 0, 0))`}}>
              <div className='searced-img'>
              <img src={bookDetail.image} alt="searchBooks" />
              </div>
              <div className='searchedCnt'>
              <h2>{bookDetail.title}</h2>
                <p>{bookDetail.author}</p>
              </div> 
            </div>
                <p className='description'>{bookDetail.description}</p> 
            </div>
  )
}



export default Bookdetail