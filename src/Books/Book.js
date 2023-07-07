import React, { useState, useEffect } from "react";
import axios from "axios";
import api_key from "../API/Api";
import "./Book.css";

function Book() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=flowers&orderBy=newest&key=${api_key}`
      )
      .then((result) => {
        // console.log(result.data.items)
        console.log(result.data.items[1].volumeInfo.title);
        setBooks(result.data.items);
      });
  }, []);

  return (
    <div className="book">
      <div className="products">
        {books.map((book, index) => {
          return (
            <div key={index} className="product">
              {/* <h2>{book}</h2> */}
              <p>{book.volumeInfo.title}</p>
              <img src={book.volumeInfo.imageLinks.thumbnail} alt="uima hai" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Book;
