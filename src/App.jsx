import React from 'react'
import './App.css'
import MoreAboutUser from './components/MoreAboutUser'
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
        <Route path='/:id/home' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/:id/todos' element={<Todos/>}/>
        <Route path='/:id/posts' element={<Posts/>}/>
        <Route path='/:id/photos' element={<Photos/>}/>
        <Route path='/:id/info' element={<Info/>}/>
        <Route path='/comments' element={<Comments/>}/>
        <Route path='/:id/albums' element={<Albums/>}/>
        <Route path='/:id/moreaboutuser' element={<MoreAboutUser/>}></Route>
        <Route path='*' element={<Notfound/>}/>
    </Routes>

     
    </>
  )
}

export default App
