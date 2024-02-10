import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Book.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import { searchedContext } from "../App/App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { porturl } from "../url/porturl";
import { toast, ToastContainer } from "react-toastify";
import FavoriteIcon from '@mui/icons-material/Favorite';


function Book() {
  const { setBookDetail, userLikedBooks, setUserLikedBooks } = useContext(searchedContext);
  const [books, setBooks] = useState([]);
  const [likeBook, setLikeBook] = useState("")
  const navigate = useNavigate();

  const session = localStorage.getItem("session");
  // console.log(userLikedBooks)


  //---------------------------------GET ALL BOOKS------------------------------------
  useEffect(() => {
    axios.get(porturl + "/book").then((result) => {
      setBooks(result.data.results);
    });
  }, []);



  //----------------------------------------------START READING---------------------------------  
  function handleReadMore(e, book) {
    e.preventDefault();
    if (session) {
      setBookDetail(book);
      navigate("/bookdetail");
    } else {
      toast.info("You can't read this book, Because you are not logged in");
    }
  }


  //--------------------------------------------LIKED BOOKS------------------------------------- 
  function handlelikedBook(e, like) {
    e.preventDefault();
    setLikeBook(like)

    let likedBook = like
    if (session) {
      axios
        .patch(`${porturl}/liked/${session}`, { likedBook })
        .then((result) => {
          toast.success(result.data.message)
          console.log(result.data.message)
          setLikeBook("")
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // alert("You can't like this book,First you have to logged in");
      toast.info("You can't like this book,First you have to logged in")
    }

  }


  //-----------------------------------GETTING ALL LIKED BOOKS------------------------- 
  useEffect(() => {


    if (session) {
      axios
        .get(`${porturl}/dashboard/${session}`)
        .then((result) => {
          if (result.data.status === 200) {
            if (result.data.userdata.likedBooks.length > 1) {
              setUserLikedBooks(result.data.userdata.likedBooks.slice(1))
            } else {
              console.log("dont have any liked book now")
            }

          } 
        })
    } else {
      console.log("user is'not logged in")
    }

  }, [likeBook])



  return (
    <div className="book">
      <div className="products">
        {books.map((book, index) => {
          const letter = [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            "a",
            "b",
            "c",
            "d",
            "e",
            "f",
          ];
          let generate = "#";

          for (let i = 0; i < 6; i++) {
            generate += letter[Math.floor(Math.random() * letter.length)];
          }

          generate += 70;
          return (
            <div
              key={index}
              className="product"
              style={{
                background: `linear-gradient(${generate}, rgba(0, 0, 0, 0))`,
              }}
            >
              <div className="book-gap">
                <h2>{book.author}</h2>
                <p>{book.title}</p>
                <img
                  alt="bookImg"
                  src={book.image}
                  onClick={(e) => {
                    handleReadMore(e, book);
                  }}
                />
              </div>

              <div
                className="footers"
                style={{
                  background: `linear-gradient(${generate}, rgba(0, 0, 0, 0))`,
                }}
              >
                <button
                  className="heartBtn"
                  onClick={(e) => handlelikedBook(e, book._id)} >
                  {(userLikedBooks.includes(book._id)) ? <FavoriteIcon sx={{ fontSize: 28 }} className="redHeartIcon" /> : <FavoriteBorderIcon sx={{ fontSize: 28 }} className="heartIcon" />}
                </button>
                <button className="shareBtn">
                  <ShareIcon sx={{ fontSize: 28 }} className="shareIcon" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        theme="dark"
      />
    </div>
  );
}

export default Book;
