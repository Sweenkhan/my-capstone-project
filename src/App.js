
import React from 'react'
import Home from './Home/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
      <BrowserRouter>
      <Home />
        <Routes>
          {/* <Route path='./Home'element={<Home/>}> </Route> */}
          <Route></Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
