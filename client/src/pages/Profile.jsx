import { useEffect, useState } from "react";
import { TbCircleDotted } from "react-icons/tb";
import { TbEyeCheck, TbEyeClosed,  } from "react-icons/tb"; 
import { Link, useNavigate } from "react-router-dom";
import {toast } from 'react-toastify'
import {useDispatch, useSelector} from 'react-redux'
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, signOutUserSuccess, signOutUserStart, signOutUserFailure } from "../redux/user/userSlice.js";
import { useRef } from "react";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from "../firebase.js";

 



 
const Profile = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {currentUser, loading, error} = useSelector((state) => state.user)
    const fileRef = useRef()
    const [file, setFile] = useState(undefined)
    const [filePercent, setFilePercent] = useState(0)
    const [fileUploadError, setFileUploadError] = useState(false)

  

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({ 
      user: '',  
      email: '',
      password: '',
     
    });
    
   
// console.log('currentUser:', currentUser)
useEffect(()=> {
if(file){
  handleFileUpload(file)
}
},[file])

const handleFileUpload = (file) => {
  const storage = getStorage(app)
  const filename = new Date().getTime() + file.name
  const storageRef = ref(storage, filename)
  const uploadTask = uploadBytesResumable(storageRef, file)

  uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      
      setFilePercent(Math.round(progress));
    },
    (error)=> {
      setFileUploadError(true)
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=> {
        setFormData({...formData, avatar: downloadURL})
      })
    }
  )
 
};

const handleChange = (e) => {
  setFormData({...formData, [e.target.id]: e.target.value});
};

const handleFormSubmit = async (e) => {
  e.preventDefault();

  const updatedData = {};

  if (formData.username) {
    updatedData.username = formData.username;
  }
  if (formData.email) {
    updatedData.email = formData.email;
  }
  if (formData.password) {
    updatedData.password = formData.password;
  }
  if (formData.avatar) {
    updatedData.avatar = formData.avatar;
  }

  try {
    dispatch(updateUserStart());
    const response = await fetch(`/api/user/update/${currentUser.rest._id}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(updatedData)
    });
    const data = await response.json();
    if (data.success) {
      dispatch(updateUserSuccess(data));
      toast.success(data.message);
    } else {
      dispatch(updateUserFailure());
      toast.error(data.message);
    }
  } catch (error) {
    dispatch(updateUserFailure());
    toast.error(error.message);
  }
};

const handleDeleteUser = async () => {
  try {
    dispatch(deleteUserStart())
    const response = await fetch(`/api/user/delete/${currentUser?.rest?._id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    if(data.success) {
      dispatch(deleteUserSuccess());
      toast.error(data.message);
    }else{
      dispatch(deleteUserFailure(error.message))
      toast.error(data.message);
    }
  } catch (error) {
    dispatch(deleteUserFailure(error.message))
    toast.error(error.message);
  }
}

const handleLogOut = async () => {
  try {
    dispatch(signOutUserStart())
    const response = await fetch('/api/auth/signout',{credentials: 'include'})
    const data = await response.json()
    if(data.success) {
      dispatch(signOutUserSuccess())
      toast.success(data.message)
    }
  } catch (error) {
    dispatch(signOutUserFailure())
    toast.error(error.message)
  }
}
    

  return (
    <section id="profile">
        <div className=" container mx-auto p-4">
        <h1 className="text-center text-3xl font-semibold text-slate-700 my-5">Profile</h1>
                <div className="bg-white w-full max-w-md mx-auto rounded-md p-5">
                
                    <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 p-2">
                      <input onChange={(e)=> setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/*"/>
                      <img src={formData?.avatar || currentUser.rest.avatar} alt="profile" className="w-24 h-24 cursor-pointer rounded-full object-cover self-center" onClick={()=>fileRef.current.click()}/>
                        {/* Image Top */}
                        <p className="text-center text-xs ">
                        {
                            fileUploadError ? (<span className="text-red-500">Error Image upload. (Image must be less than 2mb)</span>) : filePercent > 0 && filePercent < 100 ? (<span className="text-slate-700">{`Uploading ${filePercent}%`}</span>) : filePercent === 100 ? (<span className="text-green-700">Image successfully uploaded</span>) : ''
                        }
                        </p>
                          <div className="w-full">
                              <label htmlFor="username">Username:</label>
                              <div className="bg-slate-100 p-3">
                                <input  
                                      id="username"
                                      onChange={handleChange}
                                      defaultValue={currentUser?.rest?.username} 
                                      type="text" 
                                      placeholder="Enter username" 
                                      className="w-full h-full outline-none bg-transparent"/>
                              </div>
                          </div>
                          <div className="w-full">
                              <label htmlFor="email">Email:</label>
                              <div className="bg-slate-100 p-3">
                                <input 
                                      id="email"
                                      onChange={handleChange}
                                      defaultValue={currentUser?.rest?.email}  
                                      type="email" 
                                      placeholder="Enter email" 
                                      className="w-full h-full outline-none bg-transparent"/>
                              </div>
                          </div>

                          <div className="mb-5">
                              <label htmlFor="password">Password:</label>
                              <div className="bg-slate-100 p-3 flex justify-between">
                                <input type={showPassword ? "text" : "password" }
                                        placeholder="Enter password" 
                                        className="w-full h-full outline-none bg-transparent" 
                                        id="password"
                                        name="password"
                                        onChange={handleChange}                                    
                                         
                                        />

                                <div className="cursor-pointer text-xl">
                                  <span onClick={()=> setShowPassword((prev)=> !prev)}> 
                                  {
                                      showPassword ? <TbEyeClosed /> :  <TbEyeCheck />
                                  }
                                  </span>
                                </div>
                              </div> 
                          </div>

                        
                          <button disabled={loading} type="submit" className="p-3 w-full border-2 hover:border-blue-700 bg-blue-700 text-white cursor-pointer hover:bg-white hover:text-blue-700 text-md rounded-lg disabled:opacity-80">
                          {
                            loading ? (<p className="flex items-center justify-center text-xl font-semibold animate-pulse">
                              <TbCircleDotted className="animate-spin"/>
                            </p>) : ('Update Profile')
                          }
                            
                          </button>
                          {/* <button type="submit" className="p-3 w-full border-2 border-red-700 hover:bg-red-700 hover:text-white cursor-pointer text-red-700 text-md rounded-lg disabled:opacity-80">
                            Create Listing
                          </button> */}
                        
                       
                    </form>  
                    <div className="flex justify-around items-center">
                    
                      <span onClick={handleDeleteUser} className="text-red-700 p-1 hover:underline cursor-pointer font-semibold">
                        Delete Account
                      </span>
                      <span onClick={handleLogOut} className="text-red-700 p-1 hover:underline cursor-pointer font-semibold">
                        Sign Out
                      </span>
                 
                   </div>                                                       
                </div>
               
        </div>
    </section>
  )
} 
 
export default Profile