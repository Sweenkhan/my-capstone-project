import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { searchedContext } from "../App/App";
import bookContent from "./BookContent";
import "./Bookdetail.css";
import axios from "axios"; 
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import book from '../../../back/models/book'

function Bookdetail() {

  const { bookDetail } = useContext(searchedContext);
  const { paraOne, paraTwo, paraThree, paraFour, paraFive } = bookContent;

  const [rating, setRating] = useState(0);
  const [clickRating, setClickRating] = useState(false);
  const [read, setRead] = useState(false);
  const [comment, setComment] = useState("")
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
       axios.patch("https://bookshelf-server-1lpi.onrender.com/currentRead", {currentReadBook, session})
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
       axios.patch("https://bookshelf-server-1lpi.onrender.com/completed", {completedBook, session})
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
    axios.patch('https://bookshelf-server-1lpi.onrender.com/rating',{ratingBook, rating, session})
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


//------------------------------------COMMENTS ON BOOKS-------------------------- 
function commentBook(e){
  e.preventDefault()
  // console.log(comment)
  let commentedBook = bookDetail._id;
 
  axios.patch('https://bookshelf-server-1lpi.onrender.com/comment',{commentedBook, comment, session})
    .then((result) =>{
        if(result.status === 200){
          console.log(result.data)
        }
    }).catch((err) =>{
       console.log(err)
    })
    setComment("")
  }

//----------------------------------LIKED ON BOOKS--------------------------------
function handlelikedBook(e, like) {
  e.preventDefault();
  let likedBook = like;

  if (session) {
    axios
      .patch("https://bookshelf-server-1lpi.onrender.com/liked", { likedBook, session })
      .then((result) => {
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    alert("You can't like this book,Firs you have to logged in");
  }
} 



  return (
    <div className="bookdetail"> 
      <div className="bookdetailCont">
        <div className="detail-left">

          <div className="detail-left-img">
            <img src={bookDetail.image} alt="searchBooks" />
            <button
                  className="heartBtn dashboard"
                  onClick={(e) => handlelikedBook(e, bookDetail._id)}
                >
                  <FavoriteBorderIcon
                    sx={{ fontSize: 28 }}
                    className="heartIcon"
                  />
                </button>
          </div>
{/* RATING SECTION */}
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

{/* COMMENT SECTION */}
           <div className="comment-section">
           <h4>Reviews</h4>
            <form onSubmit={commentBook}>
              <textarea placeholder="write...." value={comment} onChange={e => {setComment(e.target.value)}} required minlength="10" maxlength="80"></textarea>
              <button type="submit" className="saveBtn">save</button>
            </form>
           </div>



        </div> 
        <div className="detail-right">
          <h4>Book Title: {bookDetail.title}</h4>
          <p>Author Name : {bookDetail.author}</p>
          <div className="paragraph">
            <h4 style={{ marginLeft: "10px" }}>DESCRIPTION:</h4>
            <p className="description"> <span>A. </span> {bookDetail.description}{" "}<span onClick={currentRead} className="current-read">{(!read) ? "Read More..." : ""} </span> </p> <hr />
            {(read) ? <div>
            <p> <span>1. </span>  {paraOne}  </p> <hr />
            <p style={{ backgroundColor: "white" }}> <span>2. </span> {paraTwo}  </p>  <hr />
            <p> <span>3. </span> {paraThree} </p> <hr />
            <p style={{ backgroundColor: "white" }}><span>4. </span> {paraFour}</p> <hr />
            <p> <span>5. </span> {paraFive} </p> <hr />
            <button onClick={(e) => {completeBook(e)}} className="complete-book">COMPLETE </button>
            </div> : ""}
            
          </div>
        </div>

      </div>
    </div>
  );
}

export default Bookdetail;
