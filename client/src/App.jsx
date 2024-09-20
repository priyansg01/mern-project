import React from 'react'
import Home from './pages/Home'
import About from './pages/About'
import {BrowserRouter ,Routes,Route} from 'react-router-dom' 
import Signin from './pages/Signin'
import Profile from './pages/Profile'

import Header from './component/Header'
import Signup from './pages/Signup'

export default function App() {
  return <BrowserRouter>
  <Header/>
    <Routes>
       <Route path='/' element={<Home/>}></Route>
       <Route path='/about' element={<About/>}></Route>
       <Route path='/signin' element={<Signin/>}></Route>
       <Route path='/signup' element={<Signup/>}></Route>
       <Route path='/profile' element={<Profile/>}></Route>
    </Routes>

  </BrowserRouter>
}
