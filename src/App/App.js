import React from "react";
import About from "../About/About";
import Home from "../Home/Home";
import Book from "../Books/Book";
import Header from "../Header/Header";
import Login from "../FORM/Login";
import Register from "../FORM/Register";
import Dashboard from "../Dashboard/Dashboard.js";
// import Footer from "../Footer/Footer.js";
import "../Books/Book.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app"> 
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}>
        </Route>
        <Route path="/dashboard" element={<Dashboard />}>
        </Route>
        <Route path="/about" element={<About />}>
        </Route>
        <Route path="/book" element={<Book />}>
        </Route>
        <Route path="/login" element={<Login />}>
        </Route>
        <Route path="/register" element={<Register />}>
        </Route>
      </Routes>
       
    </BrowserRouter>
    </div>
  );
}

export default App;
