
import React from 'react'
import Home from './Home/Home'
import Cart from "./Cart/Cart"
import Books from "./Books/Books"
import About from "./Books/Books"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './Header/Header'
import Login from './Login/Login'

function App() {
  return (
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path='/'element={<Home />}> </Route>
          <Route path='/about'element={<About />}> </Route>
          <Route path='/books'element={<Books />}> </Route>
          <Route path='/cart'element={<Cart />}> </Route>
          <Route path='/login'element={<Login />}> </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
