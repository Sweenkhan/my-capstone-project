import React, { useState } from "react"; 
import AboutPage from "../About/AboutPage"
import Home from "../Home/Home";
import Book from "../Books/Book";
import Header from "../Header/Header";
import Login from "../FORM/Login";
import Register from "../FORM/Register";
import Dashboard from "../Dashboard/Dashboard.js";
import Search from "../Search/Search";
import Bookdetail from "../BookDetail/Bookdetail";
import "./App.css"
import "../Books/Book.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext } from "react"; 

export const searchedContext = createContext({})
export const userContext = createContext({})

function App() { 
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [bookDetail, setBookDetail] = useState({}) 

  return (
    <> 
    <div className="app"> 
    <searchedContext.Provider value={{searchedBooks, setSearchedBooks, bookDetail, setBookDetail}}> 
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}>
        </Route>
        <Route path="/dashboard" element={<Dashboard />}>
        </Route> 
        <Route path="/about" element={<AboutPage />}>
        </Route>
        <Route path="/book" element={<Book />}>
        </Route>
        <Route path="/login" element={<Login />}>
        </Route>
        <Route path="/register" element={<Register />}>
        </Route>
        <Route path="/search" element={<Search />}>
        </Route>
        <Route path="/bookdetail" element={<Bookdetail />}>
        </Route>
      </Routes> 
    </BrowserRouter> 
    </searchedContext.Provider>
    </div>
    </>
  );
}

export default App;
