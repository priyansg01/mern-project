import { getDownloadURL, getStorage, uploadBytesResumable, ref } from 'firebase/storage';
import React, { useState } from 'react'
import { app } from '../firebase';

export default function CreateListing() {
    const [files,setfiles]=useState([]);
    const [formdata,setformdata]=useState({
      imageurls:[], 
    })
   
    const [imageuploaderror,setimageuploaderror]=useState(false);
    const [uploading,setuploading]=useState(false);

    console.log(formdata)
    const handleImageSubmit=(e)=>{
        if(files.length>0&& files.length+formdata.imageurls.length<7)
        {  setuploading(true);
          setimageuploaderror(false);
            const promises=[];
            for(let i=0;i<files.length;i++)
            {
                promises.push(storeImage(files[i]));

            }
            Promise.all(promises)
            .then((urls) => {
              setformdata({
                ...formdata,
                imageurls: formdata.imageurls.concat(urls),
              });
              setimageuploaderror(false)
              setuploading(false)
              
           }).catch((err)=>{
            setimageuploaderror('image upload failed (2 mb max per image ) ');
            setuploading(false);
           });
      }
      else {
        setimageuploaderror('You can only upload 6 image per listing');
        setuploading(false)
      }

       }

    const storeImage=async(file)=>{
        return new Promise ((resolve,reject)=>{
            const storage=getStorage(app);
            const fileName=new Date().getTime()+file.name;
            const storageRef=ref(storage,fileName);
            const uploadTask=uploadBytesResumable(storageRef,file);
            uploadTask.on(
                "state_changed",
                (snapshot)=>{
                    const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
                    console.log(`upload is ${progress}% done`);
                },
                (error)=>{
                    reject(error);
                },
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                        resolve(downloadURL);
                    })
                }
            )
        })
    }


  const handleremoveimage=(index)=>{
    setformdata({
      ...formdata,
      imageurls:formdata.imageurls.filter((url,i)=> i!==index),
    })
  }



  return (
    <main className='p-3 max-w-4xl mx-auto '>
        <h1 className='text-3xl font-semibold text-center my-7 '>Create a Listing</h1>
        <form className='flex flex-col sm:flex-row gap-4'>

            <div className='flex flex-col gap-4 flex-1' >
                <input type="text" name="" id="name" placeholder='Name' className='border p-3 rounded-lg' maxLength='62' minLength='10' required />
                <textarea type="text" name="" id="description" placeholder='Description' className='border p-3 rounded-lg' required />
                <input type="text" name="" id="address" placeholder='Address' className='border p-3 rounded-lg' required />
                
                <div className="flex gap-7 flex-wrap">
                  <div className="flex gap-2">
                    <input type="checkbox" name="" id="sale"  className='w-5'/>
                    <span>Sell</span>
                  </div>
                  <div className="flex gap-2">
                    <input type="checkbox" name="" id="rent"  className='w-5'/>
                    <span>Rent</span>
                  </div>
                  <div className="flex gap-2">
                    <input type="checkbox" name="" id="parking"  className='w-5'/>
                    <span>Parking spot</span>
                  </div>
                  <div className="flex gap-2">
                    <input type="checkbox" name="" id="furnished"  className='w-5'/>
                    <span>Furnished</span>
                  </div>
                  <div className="flex gap-2">
                    <input type="checkbox" name="" id="offer"  className='w-5'/>
                    <span>Offer</span>
                  </div>
              </div>


               <div className="flex gap-6 flex-wrap">
                   <div className="flex items-center gap-2">
                      <input type="number" name="" id="bedrooms" min='1' max='10' required className='p-3 border border-gray-300 rounded-lg' />
                      <p>Beds</p>
                   </div>
                   <div className="flex items-center gap-2">
                      <input type="number" name="" id="bathrooms" min='1' max='10' required className='p-3 border border-gray-300 rounded-lg' />
                      <p>Baths</p>
                   </div>
                   <div className="flex items-center gap-2">
                      <input type="number" name="" id="regularprice" min='1' max='10' required className='p-3 border border-gray-300 rounded-lg' />
                          <div  className="flex flex-col items-center">
                             <p>Regular Price</p>
                            <span className='text-xs'>($ / Month)</span>

                          </div>
                   </div>
                   <div className="flex items-center gap-2">
                      <input type="number" name="" id="discountprice" min='1' max='10' required className='p-3 border border-gray-300 rounded-lg' />
                         <div className="flex flex-col items-center">
                             <p>Discounted Price</p>
                            <span className='text-xs'>($ / Month)</span>

                          </div>
                   </div>
               </div>
            </div>
           
            <div className=" flex flex-col flex-1 gap-4">
                <p className='font-semibold'>Images:
                <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)  </span>
                </p>

                <div className=" flex gap-4">
                    <input onChange={(e)=>setfiles(e.target.files)} type="file" className="p-3 border border-gray-300 rounded w-full " id='images' accept='image/*' multiple />
                    <button disabled={uploading} onClick={handleImageSubmit} type='button' className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-85' >{uploading?'Uploading...':'Upload'}</button>
                </div>
                      <p className='text-red-700 text-sm'>{imageuploaderror&&imageuploaderror}</p>
 
                      {
                        formdata.imageurls.length>0&&formdata.imageurls.map((url,index)=>(

                          <div key={url} className="flex justify-between border items-center p-3">
                            <img src={url} alt='listing image' className='w-20 h-20 object-cover rounded-lg'/>
                            <button type='button' onClick={()=>handleremoveimage(index)} className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'>delete</button>
                            
                          </div>

                        ))
                      }
               <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-85 '>create listing</button>
            </div>
          
        </form>
    </main>
  )
}
