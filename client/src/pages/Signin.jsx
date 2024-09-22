// import React, { useState } from 'react'
// import {Link,Navigate, useNavigate} from 'react-router-dom'

// export default function Signin() {
//     const [formdata,setformdata]=useState({});
//     const [error,seterror]=useState(null);
//     const [loading,setloading]=useState(false);
//     const navigate=useNavigate();

//     const handlechange=(e)=>{
//         setformdata({
//             ...formdata,
//             [e.target.id]:e.target.value,//corresponding email username ppassword set

//         })
//     }
//     const handlesubmit=async(e)=>{
//         e.preventDefault();
//         try {
//                      setloading(true);
//                      const response=await fetch('/api/auth/signin',{method:'POST',
//                                                                headers:{'Content-Type':'application/json',},body: JSON.stringify(formdata),//form data ko server par bhej rahe h
//                                                              });
                                                         
             
//                  const data= await response.json();//wait from the message from server that user is cretaed
//                  if(data.success==false)
//                  {
//                      seterror(data.message);
//                      setloading(false);
//                      return;
//                  }
//                  setloading(false);
//                  seterror(null);
//                  navigate('/');
//                  console.log(data)
            
//         } catch (error) {

//             setloading(false);
//             seterror(error.message)
            
//         }
//                                 }
  


//   return (
//     <div className='p-3 max-w-lg mx-auto'>
//         <h1 className='text-3xl font-semibold text-center my-7'>Sign In</h1>
//         <form className='flex flex-col gap-4' onSubmit={handlesubmit}>
//             <input type="email" name="" id="email" placeholder='Email' className='border p-3 rounded-lg' onChange={handlechange}/>
//             <input type="password" name="" id="password" placeholder='Password' className='border p-3 rounded-lg' onChange={handlechange}/>
//             <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading?'Loading...':'Sign in'}</button>
//         </form>
//         <div className='flex gap-2 mt-5 '>
//             <p>Don't Have an account?</p>
//             <Link to={'/signup'}>
//                <span className='text-blue-700'>Sign up</span>
//             </Link>
//         </div>

//         {error && <p className='text-red-500 mt-5'>{error}</p>}
//     </div>
//   );
// }


import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import OAuth from '../component/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,//corresponding email username ppassword set
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();//wait from the message from server that user is cretaed
      //console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='email'
          placeholder='email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
     
       <OAuth/>

      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to={'/signup'}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}