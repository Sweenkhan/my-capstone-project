import React from "react";
import About from "../About/About";
import Home from "../Home/Home";
import Book from "../Books/Book";
import Header from "../Header/Header";
import Login from "../Login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}>
        </Route>
        <Route path="/about" element={<About />}>
        </Route>
        <Route path="/books" element={<Book />}>
        </Route>
        <Route path="/login" element={<Login />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
