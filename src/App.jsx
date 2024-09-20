import React from 'react'
import Home from './pages/Home'
import About from './pages/About'
import {BrowserRouter ,Routes,Route} from 'react-router-dom' 
import Signin from './pages/Signin'
import Profile from './pages/Profile'
import Signout from './pages/Signout'

export default function App() {
  return <BrowserRouter>
    <Routes>
       <Route path='/' element={<Home/>}></Route>
       <Route path='/about' element={<About/>}></Route>
       <Route path='/signin' element={<Signin/>}></Route>
       <Route path='/signout' element={<Signout/>}></Route>
       <Route path='/profile' element={<Profile/>}></Route>
    </Routes>

  </BrowserRouter>
}
