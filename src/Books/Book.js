import React, { useState, useEffect } from "react";
import axios from "axios"; 
import "./Book.css";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
 function Book() {
  const [books, setBooks] = useState([]);
 
   
//  https://www.googleapis.com/books/v1/volumes?q=flowers&maxResults=40&orderBy=newest&key=AIzaSyC70bmYoDKsQw-cXQfH1mYdWk3sI8X2MUA
 

  useEffect(() => {
    axios.get('http://localhost:8080/book')
      .then((result) => {
         
      setBooks(result.data) 
      });

      
  }, []);

 

  return (
   
    <div className="book">
      <div className="products">
        {books.map((book, index) => {

          const letter = [0,1,2,3,4,5,6,7,8,9,"a","b","c","d", "e", "f"]; 
          let generate = "#";
       
          for(let i = 0; i < 6; i++){
             generate += letter[Math.floor(Math.random() * letter.length)]
          } 

        generate += 30; 
          return ( 
            <div key={index} className="product" style={{background: `linear-gradient(${generate}, rgba(0, 0, 0, 0))`}}> 
              <h2>{book.author}</h2>
              <p>{book.title}</p> 
                
              <img alt="bookImg"  src = {book.image}></img> 
              <div className="footers" style={{background: `linear-gradient(${generate}, rgba(0, 0, 0, 0))`}}>
                <button className="heartBtn"><FavoriteBorderIcon sx={{ fontSize: 28 }} className="heartIcon"/></button>
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
