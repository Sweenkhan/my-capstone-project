import React from "react";
import { useContext } from "react";
import { searchedContext } from "../App/App";
import bookContent from "./BookContent";
import "./Bookdetail.css";
// import book from '../../../back/models/book'

function Bookdetail() {

  const { bookDetail} = useContext(searchedContext);
  const {paraOne, paraTwo, paraThree, paraFour} = bookContent;
   

  return (
    <div className="bookdetail">
      <div className="bookdetailCont"  >

        <div className="detail-left">
          <img src={bookDetail.image} alt="searchBooks" />
        </div>
        <div className="detail-right">
          <h2>{bookDetail.title}</h2>
          <p>{bookDetail.author}</p>
          <div className="paragraph">
        <h4 style={{marginLeft: "10px"}}>DESCRIPTION:</h4>   
        <p className="description"><span>A. </span>{bookDetail.description} </p><hr /> 
        <p><span>1. </span>{paraOne}</p><hr />
        <p style={{backgroundColor: "white"}}><span>2. </span>{paraTwo}</p><hr />
        <p><span>3. </span>{paraThree}</p><hr />
        <p style={{backgroundColor: "white"}}><span>4. </span>{paraFour}</p><hr />
        </div>
        </div>
      </div>
    </div>
  );
}

export default Bookdetail;
