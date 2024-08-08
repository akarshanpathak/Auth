import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRef } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import { signOutSuccess, updateSuccess } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'

function Profile() {
  const { currentUser } = useSelector(state => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [imageFile, setImageFile] = useState(null)
  const [imageFileUrl, setImageFileUrl] = useState(null)
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null)
  const [imageFileUploadLoading, setImageFileUploadLoading] = useState(false)
  const [imageFileUploadError, setImageFileUploadError] = useState(null)
  const [formData, setFormData] = useState({})
  const [updateUserError, setUpdateUserError] = useState(null)
  const fileRef = useRef()

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setImageFile(file)
    setImageFileUrl(URL.createObjectURL(file))
  }

  const uploadImage = async () => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + imageFile.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, imageFile)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        setImageFileUploadLoading(true)
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setImageFileUploadProgress(progress)
      },
      (error) => {
        setImageFileUploadError("File cannot be uploaded (image must be less than 2 MB)")
        setImageFileUploadProgress(null)
        setImageFileUploadLoading(false)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImageFileUrl(downloadUrl)
          setImageFileUploadProgress(null)
          setImageFileUploadError(null)
          setFormData({ ...formData, profilePicture: downloadUrl })
          setImageFileUploadLoading(false)
        })
      }
    )
  }

  useEffect(() => {
    if (imageFile) {
      uploadImage()
    }
  }, [imageFile])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made")
      return
    }

    try {
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (!res.ok) {
        setUpdateUserError(data.message)
      }
      if (res.ok) {
        dispatch(updateSuccess(data))
      }
    } catch (error) {
      setUpdateUserError(error.message)
    }
  }

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/auth/signout", {
        method: 'PUT'
      })
      if (res.ok) {
        dispatch(signOutSuccess())
        navigate('/signin')
      }
    } catch (error) {
      // Handle error if any
    }
  }

  return (
    <form onSubmit={handleSubmit} className='min-h-screen bg-slate-900 text-white flex justify-center items-center py-4'>
      <div className='w-full max-w-md flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-lg'>
        <h1 className='text-3xl font-semibold mb-6'>Profile</h1>
        <div className="mb-4" onClick={() => fileRef.current.click()}>
          <img className='h-40 w-40 rounded-full object-cover' src={imageFileUrl || (currentUser && currentUser.profilePicture)} alt="Profile" />
        </div>
        {imageFileUploadProgress && <div className='p-2 text-xl mb-4'>Uploaded: {Math.floor(imageFileUploadProgress)}%</div>}
        {imageFileUploadError && <div className='text-xl text-red-700 mb-4'>{imageFileUploadError}</div>}
        <input type="file" className='hidden' accept='image/*' ref={fileRef} onChange={handleImageChange} />
        <h2 className='text-xl mb-3 underline font-semibold'>{currentUser.username}</h2>
        <div className="w-full mb-4">
          <label htmlFor="username" className='text-xl font-semibold block mb-2'>Username:</label>
          <input defaultValue={currentUser.username} onChange={handleChange} type="text" className='w-full outline-none border-2 border-orange-800 bg-transparent p-2 rounded-lg' id='username' />
        </div>
        <div className="w-full mb-4">
          <label htmlFor="email" className='text-xl font-semibold block mb-2'>Email:</label>
          <input defaultValue={currentUser.email} onChange={handleChange} type="email" className='w-full outline-none border-2 border-orange-800 bg-transparent p-2 rounded-lg' id='email' />
        </div>
        <div className="w-full mb-4">
          <label htmlFor="password" className='text-xl font-semibold block mb-2'>Password:</label>
          <input onChange={handleChange} type="password" className='w-full outline-none border-2 border-orange-800 bg-transparent p-2 rounded-lg' id='password' placeholder='***********' />
        </div>
        <div className="flex gap-4 mb-4">
          <button type='submit' disabled={imageFileUploadLoading} className={`w-full  font-semibold border-2 border-orange-800 rounded-lg hover:bg-orange-900 px-[2vw] duration-200 ${imageFileUploadProgress ? "opacity-50" : ""}`}>Update Profile</button>
          <button type='button' onClick={handleSignout} disabled={imageFileUploadLoading} className={`w-full py-2 font-semibold border-2 border-orange-800 rounded-lg hover:bg-orange-900 duration-200 ${imageFileUploadProgress ? "opacity-50" : ""}`}>Sign Out</button>
        </div>
        {updateUserError && <div className="text-red-700 text-xl bg-gray-900 p-2 rounded-lg font-semibold">{updateUserError}</div>}
      </div>
    </form>
  )
}

export default Profile
