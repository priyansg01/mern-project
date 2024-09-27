import React from 'react'
import Home from './pages/Home'
import About from './pages/About'
import {BrowserRouter ,Routes,Route} from 'react-router-dom' 
import Signin from './pages/Signin'
import Profile from './pages/Profile'

import Header from './component/Header'
import Signup from './pages/Signup'
import PrivateRoute from './component/PrivateRoute'
import CreateListing from './pages/CreateListing'
import UpdateListing from './pages/UpdateListing'


export default function App() {
  return <BrowserRouter>
  <Header/>
    <Routes>
       <Route path='/' element={<Home/>}></Route>
       <Route path='/about' element={<About/>}></Route>
       <Route path='/signin' element={<Signin/>}></Route>
       <Route path='/signup' element={<Signup/>}></Route>

       <Route element={<PrivateRoute/>}>
          <Route path='/profile' element={<Profile/>}></Route>
          <Route path='/create-listing' element={<CreateListing/>}></Route>
          <Route path='/update-listing/:listingId' element={<UpdateListing/>}></Route>
       </Route>
    </Routes>

  </BrowserRouter>
}
