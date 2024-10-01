import React, { useEffect, useState } from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link ,useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'

export default function Header() {
  const {currentUser} = useSelector(state=>state.user)
  const [searchTerm,setsearchTerm]=useState('')
  //console.log(currentuser)

   const Navigate=useNavigate();
   const handleSubmit=(e)=>{
     e.preventDefault();
     const urlParams=new URLSearchParams(window.location.search);

     //window.location gives the current window all properties in object
     //in window.location has the search in which all the search parameters and gets the parmaters from the url after the ? mark   these is called query parameters  or url parameters or urls variables  so there is a function in js called  URLSearchParams
 
    urlParams.set('searchTerm',searchTerm)
    //URLSearchParams.set() Sets the value associated with a given search parameter to the given value. If there are several values, the others are deleted.

    const searchQuery=urlParams.toString();  //because some is string and some is number
    Navigate(`/search?${searchQuery}`)
   }
    

   useEffect(()=>{
    const urlParams=new URLSearchParams(window.location.search);
     const searchTermFromurl=urlParams.get('searchTerm')

     if(searchTermFromurl)
     {
      setsearchTerm(searchTermFromurl)
     }
   },[location.search])




  return (
    <header className='bg-slate-200 shadow-md'>
        
        <div className='flex justify-between items-center max-w-6xl mx-auto  p-3' >
          <Link to='/'>
           <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
             <span className='text-slate-500'>Dream</span>
             <span className='text-slate-700'>Aashiyana</span>
           </h1>
          </Link>

        <form  onSubmit={handleSubmit} className='bg-slate-100 p-3 rounded-lg flex items-center'>
            <input type="text" placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64' value={searchTerm} onChange={(e)=>setsearchTerm(e.target.value)}/>

            <button> 
             <FaSearch className='text-slate-600'/>

            </button>

        </form>
        <ul className='flex gap-4 '>
            <Link to={'/'}>
            <li className='hidden sm:inline text-slate-700 font-semibold hover:underline'>Home</li>
            </Link>
            <Link to={'/About'}>
             <li className='hidden sm:inline text-slate-700 font-semibold hover:underline'>About</li>
            </Link>

            <Link to={'/profile'}>
             {currentUser ?(<img className='rounded-full h-7 w-7 object-cover ' src={currentUser.avatar} alt='profile'/>): (<li className=' text-slate-700 font-semibold hover:underline'>Sign in</li>)}
            </Link>
        </ul>
        </div>
    </header>
  )
}
