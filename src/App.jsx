import React from 'react'
import './App.css'
<<<<<<< HEAD
import Register from './components/Register'
import { Routes, Route } from 'react-router-dom'
import MoreAboutUser from './components/MoreAboutUser'
=======
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



>>>>>>> 8f1ffb165ffa48c516f798962200ba262afaf64a

function App() {

  return (
    <>
<<<<<<< HEAD
     <Routes>
      <Route path='/' element={<Register/>}></Route>
      <Route path='/moreaboutuser' element={<MoreAboutUser/>}></Route>
    </Routes> 

      
=======
    
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

     
>>>>>>> 8f1ffb165ffa48c516f798962200ba262afaf64a
    </>
  )
}

export default App
