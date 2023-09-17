import React from 'react'
import "./Search.css"
import { searchedContext } from '../App/App'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom' 
 


function Search() {

    const { searchedBooks, setBookDetail} = useContext(searchedContext);
    const navigate = useNavigate()
    const session = localStorage.getItem("session")

    function handleReadMore(e, book){ 
      e.preventDefault();
      if(session){ 
      setBookDetail(book);  
      navigate('/bookdetail')
      } else {
        alert("You can't read this book. You have loggedin first")
      }
    }

 
  return (
    <div className='searchInside'>  
        {
           searchedBooks.map((book, index) => {

          const letter = [0,1,2,3,4,5,6,7,8,9,"a","b","c","d", "e", "f"]; 
          let generate = "#";
       
       for(let i = 0; i < 6; i++){
           generate += letter[Math.floor(Math.random() * letter.length)]
       } 

        generate += 60; 
      
            return <div className='row-img' key={index} style={{background: `linear-gradient(${generate}, rgba(0, 0, 0, 0))`}}>
              <div className='searced-img'>
             <img onClick={(e) => {handleReadMore(e, book)}} src={book.image} alt="searchBooks" />   
              </div>
              <div className='searchedCnt'>
              <h2>{book.title}</h2>
                <p>{book.author}</p>
                <p className='description'>{book.description.slice(0, 100)}<span onClick={(e) => {handleReadMore(e, book)}}><Link to="/">Read More...</Link></span> </p>
                 
              </div> 
            </div>
           })
        }
    </div>
  )
}

export default Search