import React from 'react'
import "./Search.css"
import { searchedContext } from '../App/App'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
 


function Search() {

    const { searchedBooks, setBookDetail, setCurrentRead, currentRead } = useContext(searchedContext);
    const navigate = useNavigate()
   

    function handleReadMore(e, book){ 
      e.preventDefault();
      setBookDetail(book);

      if(currentRead.includes(book.title)){
        console.log("book is ther")
      }else{ 
        setCurrentRead([...currentRead, book.title])
      }
     
       navigate('/bookdetail')
    }


    console.log(currentRead);
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
              <img src={book.image} alt="searchBooks" />
              </div>
              <div className='searchedCnt'>
              <h2>{book.title}</h2>
                <p>{book.author}</p>
                <p className='description'>{book.description.slice(0, 100)}</p>
                <button className="thumbBtn"><ThumbUpIcon sx={{ fontSize: 28 }} className="thumb-Icon"/></button>
                <button className='read-more' onClick={(e) => {handleReadMore(e, book)}}>Read More..</button>
              </div> 
            </div>
           })
        }
    </div>
  )
}

export default Search