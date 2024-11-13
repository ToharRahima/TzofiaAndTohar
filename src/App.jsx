import React from 'react'
import './App.css'
import Register from './components/Register'
import { Routes, Route } from 'react-router-dom'
import MoreAboutUser from './components/MoreAboutUser'

function App() {

  return (
    <>
     <Routes>
      <Route path='/' element={<Register/>}></Route>
      <Route path='/moreaboutuser' element={<MoreAboutUser/>}></Route>
    </Routes> 

      
    </>
  )
}

export default App
