/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react"; 
import MainIng from "../images/home.svg";
import { useNavigate } from "react-router-dom"; 
import "./Home.css";
import Footer from "../Footer/Footer";

function Home() {

  const navigate = useNavigate()

  function startReading(e){
          e.preventDefault() 
          navigate("/book")
  }

  return (
    <>
    <div className="home">
      <div className="main-bg">
        <div className="left">
          <h1>Indulge yourself into the world of books.</h1>
          <p>Find and read books from your favourite authors.</p>
          <button onClick={startReading}>Start Reading</button>
        </div>
        <div className="right">
          <img src={MainIng} alt="main-img" />
        </div>
      </div> 
    </div>
     <Footer />
      </>
  );
}

export default Home;
