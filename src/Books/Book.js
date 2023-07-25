import React, { useState, useEffect } from "react";
import axios from "axios"; 
import "./Book.css";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
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
          return (
            <div key={index} className="product"> 
              <h2>{book.author}</h2>
              <p>{book.title}</p> 
                
              <img alt="bookImg"  src = {book.image}></img> 
              <div className="footers">
                <button className="heartBtn"><ThumbUpIcon sx={{ fontSize: 28 }} className="heartIcon"/></button>
              </div>
 
            </div>
          );
        })}
      </div>
    </div> 
  );
}

export default Book;
