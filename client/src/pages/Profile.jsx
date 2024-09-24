import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useRef,useEffect } from 'react'
import {getDownloadURL, getStorage,ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';
import { updateUserStart,updateUserSuccess,updateUserFailure, signoutuserstart} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { deleteUserStart,deleteUserSuccess,deleteUserFailure } from '../redux/user/userSlice';
import { signInStart,signoutuserSuccess,signoutuserFailure } from '../redux/user/userSlice';
import {Link} from 'react-router-dom'

export default function Profile() {
  const {currentUser,loading,error} = useSelector(state=>state.user)
  const fileref=useRef(null);
  const [file,setfile]=useState(undefined)
  const [fileperc,setfileprec]=useState(0);
  const [fileuploaderror,setfileuploaderror]=useState(false);
  const [formdata,setformdata]=useState({});
  const[updatesuccess,setupdatesuccess]=useState(false);
  const dispatch=useDispatch();

 
  //firebase storage
  // allow read;
  // allow write:if 
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')
 
   useEffect(()=>{
    if(file)
    {
      handleFileUpload(file);
    }
   },[file]);
   
   const handleFileUpload=(file)=>{
    const storage=getStorage(app);
    const fileName=new Date().getTime()+file.name;
    const storageRef=ref(storage,fileName);
    const uploadTask=uploadBytesResumable(storageRef,file);


     uploadTask.on('state_changed',
      (snapshot)=>{
        const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        setfileprec(Math.round(progress));
       // console.log('upload is '+ progress+'% done');

      },
     (error) => {
          setfileuploaderror(true);
     },
     ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>setformdata({...formdata,avatar:downloadURL}));
     }
     )
   }

   const handlechange=(e)=>{
    setformdata({...formdata,[e.target.id]:e.target.value});
   }

   const handlesubmit=async(e)=>{
      e.preventDefault();
      try {
         dispatch(updateUserStart());
         const res=await fetch(`/api/user/update/${currentUser._id}`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formdata),
         })
         const data = await res.json();//wait from the message from server that user is cretaed
         //console.log(data);
         if (data.success === false) {
           dispatch(updateUserFailure(data.message));
           return;
         }
         dispatch(updateUserSuccess(data));
         setupdatesuccess(true);
       } catch (error) {
          dispatch(updateUserFailure(error.message))
      }
   }

   const handledeleteuser=async(e)=>{
     try {
      
       dispatch(deleteUserStart());
       const res=await fetch(`/api/user/delete/${currentUser._id}`,{
        method: 'DELETE',
        
       })
       const data = await res.json();//wait from the message from server that user is cretaed
       //console.log(data);
       if (data.success === false) {
         dispatch(deleteUserFailure(data.message));
         return;
       }
       dispatch(deleteUserSuccess(data));
       setupdatesuccess(true);

     } catch (error) {
        dispatch(deleteUserFailure(error.message))
     }
   }


   const handlesignout=async ()=>{
    try {
      dispatch(signoutuserstart())
      const res=await fetch('/api/auth/signout');
      const data=await res.json();
      if(data==false)
      {  dispatch(deleteUserFailure(data.message))
        return ;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message))
    }
   }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>

      <form onSubmit={handlesubmit} className='flex flex-col gap-4'>
          <input  onChange={(e)=>setfile(e.target.files[0])} type="file" ref={fileref} hidden accept='image/*'/>
          <img onClick={()=>fileref.current.click()} src={formdata.avatar||currentUser.avatar} alt="" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'/>


          <p className='text-sm self-center'>
            { fileuploaderror ? <span className='text-red-700'>Error image Upload(image must be less than 2 MB)</span>:fileperc>0&&fileperc<100 ? (<span className='text-slate-700'>{`Uploading ${fileperc}%`}</span>) : fileperc==100 ?(<span className='text-green-700'>Image Uplaoded Successfully</span>):('')}
          </p>



          <input type="text"  defaultValue={currentUser.username} placeholder='username' id='username' className='border p-3 rounded-lg' onChange={handlechange} />
          <input type="email" defaultValue={currentUser.email} placeholder='email' id='email' className='border p-3 rounded-lg' onChange={handlechange} />
          <input type="password" placeholder='password' id='password' className='border p-3 rounded-lg' onChange={handlechange}/>
         
         <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95'>{loading?'Loading...':'update'}</button>

         <Link  className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95' to={'/create-listing'}>
         create listing
         </Link>
      </form>

      <div className='flex justify-between mt-5'>  
        <span onClick={handledeleteuser} className='text-red-700 cursor-pointer'>Delete account</span>
        <span onClick={handlesignout} className='text-red-700 cursor-pointer'>Sign out</span>
      </div>

      <p className='text-red-700 mt-5'>{error?error:' '}</p>
      <p className='text-green-700 mt-5'>{updatesuccess?'user is updated successfully':''}</p>
    </div>
  )
}
