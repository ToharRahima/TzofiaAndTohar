import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link, Route,Routes } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Register from './components/Register'
import Todos from './components/Todos'
import Posts from './components/Posts'
import Photos from './components/Photos'
import Info from './components/Info'
import Comments from './components/Comments'
import Albums from './components/Albums'
import Notfound from './components/Notfound'




function App() {

  return (
    <>
    
    <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/todos' element={<Todos/>}/>
        <Route path='/posts' element={<Posts/>}/>
        <Route path='/photos' element={<Photos/>}/>
        <Route path='/info' element={<Info/>}/>
        <Route path='/comments' element={<Comments/>}/>
        <Route path='/albums' element={<Albums/>}/>
        <Route path='*' element={<Notfound/>}/>
    </Routes>

     
    </>
  )
}

export default App
