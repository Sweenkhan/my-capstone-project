import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useContext } from "react";
import { searchedContext } from "../App/App";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UserProfile from "./UserProfile";

function Header() {
  const { setSearchedBooks } = useContext(searchedContext);

  // const [hasfriend, setHasFriend] = useState(false)
  // const [allUsers, setAllUsers] = useState([])
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [searchBook, setSearchBook] = useState("");
  const navigate = useNavigate();
  const session = localStorage.getItem("session");

  //----------------------------GET SEARCH BOOKS----------------------------//
  function handleGsearch(e) {
    e.preventDefault();
    axios
      .post("https://bookshelf-server-1lpi.onrender.com/search", { searchBook })
      .then((result) => {
        console.log("data to aa gya");
        console.log(result.data.message);

        setSearchedBooks(result.data);
        setSearchBook("");
        navigate("/search");
      })
      .catch((err) => {
        console.log("error to bta do", err);
      });
  }

  return (
    <div className="header">
      <div className="logo">
        <Link to="/">
          {" "}
          <h2 className="text-light">
            BOOK<span style={{ color: "black" }}>SHELF </span>
          </h2>{" "}
        </Link>
      </div>
      <form
        method="post"
        action="https://bookshelf-server-1lpi.onrender.com/search"
        onSubmit={handleGsearch}
      >
        <input
          type="search"
          id="search"
          name="gsearch"
          value={searchBook}
          placeholder="Find books..."
          onChange={(e) => {
            setSearchBook(e.target.value);
          }}
        />
        <button> 
          <SearchIcon sx={{ fontSize: 32 }}/>
          </button>
      </form>
      <ul>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/book">Books</Link>
        </li>
        <li>
          {session ? (
            <span
              onClick={(e) => {
                showUserProfile
                  ? setShowUserProfile(false)
                  : setShowUserProfile(true);
              }}
            >
              {" "}
              <AccountCircleIcon sx={{ fontSize: 40 }} className="text-light logo" />
            </span>
          ) : (
            <Link id="login" to="/login">
              Login
            </Link>
          )}
          {showUserProfile ? (
            <UserProfile
              show={(e) => {
                setShowUserProfile();
              }}
            />
          ) : (
            ""
          )}
        </li>
      </ul>
    </div>
  );
}

export default Header;
