import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useRef,useEffect } from 'react'
import {getDownloadURL, getStorage,ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';

export default function Profile() {
  const {currentUser} = useSelector(state=>state.user)
  const fileref=useRef(null);
  const [file,setfile]=useState(undefined)
  const [fileperc,setfileprec]=useState(0);
  const [fileuploaderror,setfileuploaderror]=useState(false);
  const [formdata,setformdata]=useState({});

 
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

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>

      <form className='flex flex-col gap-4'>
          <input  onChange={(e)=>setfile(e.target.files[0])} type="file" ref={fileref} hidden accept='image/*'/>
          <img onClick={()=>fileref.current.click()} src={formdata.avatar||currentUser.avatar} alt="" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'/>


          <p className='text-sm self-center'>
            { fileuploaderror ? <span className='text-red-700'>Error image Upload(image must be less than 2 MB)</span>:fileperc>0&&fileperc<100 ? (<span className='text-slate-700'>{`Uploading ${fileperc}%`}</span>) : fileperc==100 ?(<span className='text-green-700'>Image Uplaoded Successfully</span>):('')}
          </p>



          <input type="text" placeholder='username' id='username' className='border p-3 rounded-lg' />
          <input type="email" placeholder='email' id='email' className='border p-3 rounded-lg' />
          <input type="password" placeholder='password' id='password' className='border p-3 rounded-lg'/>
         
         <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95'>update</button>
      </form>

      <div className='flex justify-between mt-5'>  
        <span className='text-red-700 cursor-pointer'>Delete account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
    </div>
  )
}
