import React, { useState, useEffect } from "react";
import axios from "axios";
import api_key from "../API/Api";
import "./Book.css";

function Book() {
  const [books, setBooks] = useState([]);


    //  "https://www.googleapis.com/books/v1/volumes?q=flowers&maxResults=40&orderBy=newest&key=AIzaSyBkQHuDtnYcoeAWDoX2exTnEJFau5H-YBM"

  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=flowers&maxResults=40&orderBy=newest&key=${api_key}`
      )
      .then((result) => {
        console.log(result.data.items)
        console.log(result.data.items[0].volumeInfo.imageLinks.thumbnail);
        setBooks(result.data.items);
      });
  }, []);

  return (
    <div className="book">
      <div className="products">
        {books.map((book, index) => {
          return (
            <div key={index} className="product"> 
              <p>{book.volumeInfo.title}</p>
              <h2>{book.volumeInfo.authors[0]}</h2>
              <img src={book.volumeInfo.imageLinks.smallThumbnail} alt="aaj koi hai" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Book;
