import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { searchedContext } from "../App/App";
import bookContent from "./BookContent";
import "./Bookdetail.css";
import axios from "axios";
// import book from '../../../back/models/book'

function Bookdetail() {

  const { bookDetail } = useContext(searchedContext);
  const { paraOne, paraTwo, paraThree, paraFour, paraFive } = bookContent;

  const [rating, setRating] = useState(0);
  const [clickRating, setClickRating] = useState(false);
  const [read, setRead] = useState(false);
  const session = localStorage.getItem("session");
 



  function handleRate(stars) {
    setRating(stars);
    setClickRating(true) 
  };


//---------------------------CURRENT READ-------------------------//

function currentRead(e){
  e.preventDefault();
  setRead(true);

  let currentReadBook = bookDetail._id
       axios.patch("http://localhost:8080/currentRead", {currentReadBook, session})
          .then((result) =>{  
              console.log(result.data)
          }).catch((err) =>{
            console.log(err)
         })

}


//---------------------------COMPLETED BOOK------------------------
  function completeBook(e){
    setRead(false)
    let completedBook = bookDetail._id
             e.preventDefault();
       axios.patch("http://localhost:8080/completed", {completedBook, session})
          .then((result) =>{  
              console.log(result.data)
          }).catch((err) =>{
            console.log(err)
         })
  }
 

  //----------------------------------RATING TO BOOKS--------------------
  useEffect(() =>{
    let ratingBook = bookDetail._id; 
    if(clickRating){ 
    axios.patch('http://localhost:8080/rating',{ratingBook, rating, session})
    .then((result) =>{
        if(result.status === 200){
          console.log(result.data)
        }
    }).catch((err) =>{
       console.log(err)
    })
  }

  console.log(rating); 
  },[rating])







  return (
    <div className="bookdetail"> 
      <div className="bookdetailCont">
        <div className="detail-left">

          <div className="detail-left-img">
            <img src={bookDetail.image} alt="searchBooks" />
          </div>

          <div className="rating-section">
            <p>Rate this book:</p>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${rating >= star ? "active" : ""}`}
                  onClick={() => handleRate(star)} >
                  &#9733;
                </span>
              ))}
            </div>
            <p>{rating > 0 ? `Thank you for rating ${rating} stars!` : ""}</p>
          </div>
        </div>

        <div className="detail-right">
          <h2>{bookDetail.title}</h2>
          <p>{bookDetail.author}</p>
          <div className="paragraph">
            <h4 style={{ marginLeft: "10px" }}>DESCRIPTION:</h4>
            <p className="description"> <span>A. </span> {bookDetail.description}{" "}<span onClick={currentRead}>Read More...</span> </p> <hr />
            {(read) ? <div>
            <p> <span>1. </span>  {paraOne}  </p> <hr />
            <p style={{ backgroundColor: "white" }}> <span>2. </span> {paraTwo}  </p>  <hr />
            <p> <span>3. </span> {paraThree} </p> <hr />
            <p style={{ backgroundColor: "white" }}><span>4. </span> {paraFour}</p> <hr />
            <p> <span>5. </span> {paraFive} </p> <hr />
            <button onClick={(e) => {completeBook(e)}}>COMPLETE </button>
            </div> : ""}
            
          </div>
        </div>

      </div>
    </div>
  );
}

export default Bookdetail;
