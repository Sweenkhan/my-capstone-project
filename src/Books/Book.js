import React, { useState, useEffect } from "react";
import axios from "axios"; 
import "./Book.css";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import { searchedContext } from '../App/App'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'


 function Book() {

  const { setBookDetail } = useContext(searchedContext);
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();


  const session = localStorage.getItem("session");
 
   
  useEffect(() => {
    axios.get('http://localhost:8080/book')
      .then((result) => { 
      setBooks(result.data) 
      });
 
  }, []);


  function handleReadMore(e, book){ 
    e.preventDefault();
    setBookDetail(book);  
     navigate('/bookdetail')
  }


  function handlelikedBook(e, like){
    e.preventDefault(); 
    let likedBook = like;
        axios.patch('http://localhost:8080/liked',{likedBook, session})
              .then((result) => {
                    console.log(result.data)
              }).catch((err) =>{
                console.log(err)
              })
  }
 

  return (
   
    <div className="book">
      <div className="products">
        {books.map((book, index) => {

          const letter = [0,1,2,3,4,5,6,7,8,9,"a","b","c","d", "e", "f"]; 
          let generate = "#";
       
          for(let i = 0; i < 6; i++){
             generate += letter[Math.floor(Math.random() * letter.length)]
          } 

        generate += 90; 
          return ( 
            <div key={index} className="product" style={{background: `linear-gradient(${generate}, rgba(0, 0, 0, 0))`}}> 
              <h2>{book.author}</h2>
              <p>{book.title}</p> 
                
              <img alt="bookImg"  src = {book.image} onClick={(e) => {handleReadMore(e, book)}}/>
              <div className="footers" style={{background: `linear-gradient(${generate}, rgba(0, 0, 0, 0))`}}>
                <button className="heartBtn" onClick={(e) => handlelikedBook(e, book._id)}><FavoriteBorderIcon sx={{ fontSize: 28 }} className="heartIcon"/></button>
                <button className="shareBtn"><ShareIcon sx={{ fontSize: 28 }} className="shareIcon"/></button>
              </div>
 
            </div>
          );
        })}
      </div>
    </div> 
  );
}

export default Book;
