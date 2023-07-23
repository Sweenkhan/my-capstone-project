import React, { useState, useEffect } from "react";
import axios from "axios";
import api_key from "../API/Api";
import "./Book.css";

 function Book() {
  const [books, setBooks] = useState([]);
 
   
//  https://www.googleapis.com/books/v1/volumes?q=flowers&maxResults=40&orderBy=newest&key=AIzaSyC70bmYoDKsQw-cXQfH1mYdWk3sI8X2MUA
 

  useEffect(() => {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=mostpopular&maxResults=40&orderBy=newest&key=${api_key}`)
      .then((result) => {
        console.log((result.data.items[0].volumeInfo.description.length > 300)
         ? result.data.items[0].volumeInfo.description.slice(0, 300) : result.data.items[0].volumeInfo.description) 
         console.log(result.data.items)
        setBooks(result.data.items.slice(33, 40));
      });

      
  }, []);

 

  return (
  
    <div className="book">
      <div className="products">
        {books.map((book, index) => {
          return (
            <div key={index} className="product"> 
              <h2>{book.volumeInfo.authors[0].length > 20 ? book.volumeInfo.authors[0].slice(0, 18) : book.volumeInfo.authors[0]}</h2>
              <p>{(book.volumeInfo.title.length > 25) ?  book.volumeInfo.title.slice(0, 25) :  book.volumeInfo.title}</p> 
                
              <img alt="bookImg"  src = {(book.volumeInfo.imageLinks?.thumbnail) ? book.volumeInfo.imageLinks.thumbnail : " "}></img>
             
 
              <div className="footers"></div>
 
            </div>
          );
        })}
      </div>
    </div> 
  );
}

export default Book;
