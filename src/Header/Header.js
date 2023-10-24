import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useContext } from "react";
import { searchedContext } from "../App/App";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UserProfile from "./UserProfile";
import { porturl } from "../url/porturl";  
import MenuIcon from '@mui/icons-material/Menu';


function Header() {
  const { setSearchedBooks} = useContext(searchedContext);
 
    // const [allUsers, setAllUsers] = useState([])
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [searchBook, setSearchBook] = useState("");
  const [bookType, setBookType] = useState("")
  const [showMenuIcon, setShowMenuIcon] = useState(false)
  
  const menuIcon  = window.screen.width < 500 
  // console.log(menuIcon)
   
  const navigate = useNavigate();
  const session = localStorage.getItem("session");


  //----------------------------GET SEARCH BOOKS----------------------------//
  function handleGsearch(e) {
    e.preventDefault();
    axios
      .post(porturl + "/search", { searchBook })
      .then((result) => {  

        setSearchedBooks(result.data.results); 
        if(result.data.results.length === 0){
          alert("Sorry didn't match with any title.  Try Again ")
        } else {
          navigate("/search");
        }
        setSearchBook("");
      })
      .catch((err) => {
        console.log("error to bta do", err);
      });
  }


  //------------------------------GET SEARCH BY BOOKTYPE------------------------------------//

  useEffect(() =>{
    console.log(bookType) 
    axios.post(porturl + "/searchBookByType", {bookType })
    .then((result) => {  

      setSearchedBooks(result.data.results); 
      if(result.data.results.length === 0){ 
        console.log("not found")
      } else {
        navigate("/search"); 
      }
      setSearchBook("");
    })
    .catch((err) => {
      console.log("error to bta do", err);
    });

  },[bookType])
    

  console.log(showMenuIcon)
  return (
 
    <div className="header">
    <div className="combine"> 
      <div className="main-logo">
        <Link to="/">
          {" "}
          <h2 className="text-light">
            BOOK<span style={{ color: "black" }}>SHELF </span>
          </h2>{" "}
        </Link>
      </div>
        
      <form 
        onSubmit={handleGsearch} >
        <select className="searchByType" onChange={e => setBookType(e.target.value)} defaultValue="placeholder"> 
        <option value="placeholder"  disabled ></option>
        <option disabled>Type</option>
        <option value="poetry">Poetry</option>
        <option value="flower">Flower</option>
        <option value="romance">Romance</option>
        <option value="fantasy">Fantasy</option>
        <option value="mostpopular">Popular</option>
        </select>

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
        <button className="searchIcon"> 
          <SearchIcon sx={{ fontSize: 32 }}/>
          </button>
      </form>
      </div>
{( menuIcon) && <span><MenuIcon sx={{ fontSize: 44 }} className="menuIcon" onClick={() => {(!showMenuIcon) ? setShowMenuIcon(true) : setShowMenuIcon(false) }} /></span>}
      <ul style={{top: (showMenuIcon) ? "94px" : "-150px" }}>
        <li>
          <Link to="/about" onClick={() =>{menuIcon && setShowMenuIcon(false)}} > About </Link>
        </li>
        <li>
          <Link to="/dashboard" onClick={() =>{menuIcon && setShowMenuIcon(false)}}>Dashboard</Link>
        </li>
        <li>
          <Link to="/book" onClick={() =>{menuIcon && setShowMenuIcon(false)}}>Books</Link>
        </li>
        <li>
          {session ? (
            <span
            className="main-user"
              onClick={(e) => {
                (showUserProfile)
                  ? setShowUserProfile(false)
                  : setShowUserProfile(true);
              }}
            >
              {" "}
              <AccountCircleIcon sx={{ fontSize: 40 }} className="text-light logo" />
            </span>
          ) : (
            <Link id="login" to="/login" onClick={() =>{menuIcon && setShowMenuIcon(false)}} >
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
