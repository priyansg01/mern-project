import React, { useState } from 'react'
import {Link,Navigate, useNavigate} from 'react-router-dom'

export default function Signup() {
    const [formdata,setformdata]=useState({});
    const [error,seterror]=useState(null);
    const [loading,setloading]=useState(false);
    const navigate=useNavigate();

    const handlechange=(e)=>{
        setformdata({
            ...formdata,
            [e.target.id]:e.target.value,//corresponding email username ppassword set

        })
    }
    const handlesubmit=async(e)=>{
        e.preventDefault();
        try {
                     setloading(true);
                     const response=await fetch('/api/auth/signup',{method:'POST',
                                                               headers:{'Content-Type':'application/json',},body: JSON.stringify(formdata),//form data ko server par bhej rahe h
                                                             });
                                                         
             
                 const data= await response.json();//wait from the message from server that user is cretaed
                 if(data.success==false)
                 {
                     seterror(data.message);
                     setloading(false);
                     return;
                 }
                 setloading(false);
                 seterror(null);
                 navigate('/signin');
                 console.log(data)
            
        } catch (error) {

            setloading(false);
            seterror(error.message)
            
        }
                                }
  


  return (
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Sign Up</h1>
        <form className='flex flex-col gap-4' onSubmit={handlesubmit}>
            <input type="text"  name="" id="username" placeholder='Username' className='border p-3 rounded-lg' onChange={handlechange}/>
            <input type="email" name="" id="email" placeholder='Email' className='border p-3 rounded-lg' onChange={handlechange}/>
            <input type="password" name="" id="password" placeholder='Password' className='border p-3 rounded-lg' onChange={handlechange}/>
            <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading?'Loading...':'Sign Up'}</button>
        </form>
        <div className='flex gap-2 mt-5 '>
            <p>Have an account?</p>
            <Link to={'/signin'}>
               <span className='text-blue-700'>Sign in</span>
            </Link>
        </div>

        {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}
