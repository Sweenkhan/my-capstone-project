/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Footer from "../Footer/Footer";
import MainIng from "../images/home.svg";
// import SearchIcon from "@mui/icons-material/Search";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <div className="main-bg">
        <div className="left">
          <h1>Indulge yourself into the world of books.</h1>
          <p>Find and read books from your favourite authors.</p>
          <a href="">Start Reading</a>
        </div>
        <div className="right">
          <img src={MainIng} alt="main-img" />
        </div>
      </div>
      {/* <div className="searching">
        <form>
          <input
            type="search"
            id="search"
            name="gsearch"
            placeholder="Find the book!"
          />
          <label for="search">
            <SearchIcon className="searchIcon" />
          </label>
        </form>
      </div> */}

      <Footer />
    </div>
  );
}

export default Home;
