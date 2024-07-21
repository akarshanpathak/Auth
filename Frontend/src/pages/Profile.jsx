import React, { useEffect, useState } from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import { useRef } from 'react'
import {getDownloadURL, getStorage,ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase'
import { updateSuccess } from '../redux/userSlice'
function Profile() {
    const {currentUser}=useSelector(state=>state.user)
    const dispatch=useDispatch()
    const [imageFile,setImageFile]=useState(null)
    const [imageFileUrl,setImageFileUrl]=useState(null)
    const [imageFileUploadProgress,setImageFileUploadProgress]=useState(null)
    const [imageFileUploadLoading,setImageFileUploadLoading]=useState(false)
    const [imageFileUploadError,setImageFileUploadError]=useState(null)
    const [formData,setFormData]=useState({})
    const [updateUserError,setUpdateUserError]=useState(null)
    const fileRef=useRef()
    const handleImageChange=(e)=>{
      const file=e.target.files[0]
          // console.log(file);
          // console.log(URL.createObjectURL(file));
          setImageFile(file)
          setImageFileUrl(URL.createObjectURL(file))
          // console.log((imageFile));
          // console.log((imageFileUrl));
          // setImageFile(e.target.files[0])

          // setImageFileUrl(URL.createObjectURL(e.target.files[0]))
          // console.log("image url ",imageFileUrl);
          // console.log('file ',imageFile);
      // console.log('file value ',file);

      // if(file){
      //   
      // }
    }
   

    const uploadImage=async()=>{
      const storage=getStorage(app)
      const fileName=new Date().getTime()+ imageFile.name
      const storageRef=ref(storage,fileName)
      const uploadTask=uploadBytesResumable(storageRef,imageFile)
      uploadTask.on(
        'state_changed',
        (snapshot)=>{
           setImageFileUploadLoading(true)
           const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100 
           setImageFileUploadProgress(progress)
        },
        (error)=>{
            setImageFileUploadError("File cannot be upload (image must be less than 2 mb)")
            setImageFileUploadProgress(null)
            setImageFileUploadLoading(false)
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{

            setImageFileUrl(downloadUrl)
            setImageFileUploadProgress(null)
            setImageFileUploadError(null)
            setFormData({...formData,profilePicture:downloadUrl})
            console.log("image upload successfull");
            console.log(formData);
            setImageFileUploadLoading(false)
          })
        }
      )
    }
    useEffect(()=>{
      if(imageFile){
        uploadImage()
        console.log("image upload successfull");
      }
      
    },[imageFile])

    const handleChange=(e)=>{
      setFormData({...formData,[e.target.id]:e.target.value})
      
    }
    // console.log(formData);

    const handleSubmit=async(e)=>{
      e.preventDefault()
      if(Object.keys(formData).length===0){
        setUpdateUserError("No changes made ")
        return
      }

      try {
        const res=await fetch(`/api/user/update/${currentUser._id}`,{
          method:'PUT',
          headers:{
            "Content-type":"application/json"
          },
          body:JSON.stringify(formData)
        })
        const data=await res.json()
        if(!res.ok){
          setUpdateUserError(data.message)
        }
        if(res.ok){
          console.log(data);
          dispatch(updateSuccess(data))
        }
      } catch (error) {
        setUpdateUserError(error.message)
      }
    }
  return (
    <form onSubmit={handleSubmit} className='h-screen bg-slate-900 text-white flex justify-center pt-4'>
      <div className='flex flex-col items-center'>
        <h1 className='text-3xl font-semibold m-2'>Profile</h1>
        <div className="my-4" onClick={()=>{
          fileRef.current.click()
        }}>
            <img className='h-40 w-40 rounded-full' src={(imageFileUrl && imageFileUrl) || (currentUser && currentUser.profilePicture)} alt="" />
        </div>
        {imageFileUploadProgress && <div className='p-2  text-xl'>uploaded-{imageFileUploadProgress}%</div>}
        <div className="text-xl rounded-lg bg-red-700 px-2">{imageFileUploadError && imageFileUploadError}  </div>
        <input type="file" className='hidden' accept='image/*' name="" id=""  ref={fileRef} onChange={handleImageChange}/>
        <h2 className='text-xl mb-3 underline font-semibold '>{currentUser.username}</h2>
        <div className=" mt-3">
        <label htmlFor="username" className='text-2xl font-semibold'>Username: </label><input defaultValue={currentUser.username} onChange={handleChange} type="text" className='outline-none border-orange-800 border-2 bg-transparent p-3 mt-2 rounded-xl ' id='username' />
        </div> 
        <div className="ml-12 mt-3">
        <label htmlFor="email" className='text-2xl font-semibold'>Email: </label><input defaultValue={currentUser.email} onChange={handleChange} type="email" className='outline-none border-orange-800 border-2 bg-transparent p-3 mt-2 rounded-xl ' id='email' />
        </div>
        <div className=" mt-3">
        <label htmlFor="password" className='text-2xl font-semibold'>Password: </label><input  onChange={handleChange} type="password" className='outline-none border-orange-800 border-2 bg-transparent p-3 mt-2 rounded-xl ' id='password' placeholder='***********'/>
        </div>
        <button type='submit' disabled={imageFileUploadLoading} className='mt-4 ml-14 font-semibold font-sans border-2 border-orange-800 px-3 py-2 rounded-xl hover:bg-orange-900 duration-200'>UPDATE PROFILE</button>
       {updateUserError &&  <div className="text-red-900 mt-3 text-xl font-semibold">{updateUserError}</div>}
      </div>
    </form>
  )
}

export default Profile
