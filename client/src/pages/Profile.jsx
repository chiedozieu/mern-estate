
import { useState } from "react";
import { TbCircleDotted } from "react-icons/tb";
import { TbEyeCheck, TbEyeClosed,  } from "react-icons/tb"; 
import { Link, useNavigate } from "react-router-dom";
import {toast } from 'react-toastify'
import {useDispatch, useSelector} from 'react-redux'
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice.js";




 
const Profile = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {currentUser} = useSelector((state) => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({ 
      user: '',  
      email: '',
      password: '',
     
    });
   
  
const handleChange = (e) => {
  setFormData({...formData, [e.target.id]: e.target.value});
  
}


  return (
    <section id="profile">
        <div className="mx-auto container p-4">
        <h1 className="text-center text-3xl font-semibold text-slate-700 my-5">Login</h1>
                <div className="bg-white w-full max-w-md mx-auto rounded-md p-5">
                
                    <form className="flex flex-col gap-4 p-5">
                    <img src={currentUser.rest.avatar} alt="profile" className="w-24 h-24 cursor-pointer rounded-full object-cover self-center"/>
                       {/* Image Top */}
                        <div className="">
                            <label htmlFor="username">Username:</label>
                            <div className="bg-slate-100 p-3">
                              <input  
                                    id="username"
                                    onChange={handleChange} 
                                    type="email" 
                                    placeholder="Enter username" 
                                    required
                                    className="w-fll h-full outline-none bg-transparent"/>
                            </div>
                        </div>
                        <div className="">
                            <label htmlFor="email">Email:</label>
                            <div className="bg-slate-100 p-3">
                              <input 
                                    id="email"
                                    onChange={handleChange} 
                                    type="email" 
                                    placeholder="Enter email" 
                                    required
                                    className="w-fll h-full outline-none bg-transparent"/>
                            </div>
                        </div>

                        <div className="mb-5">
                            <label htmlFor="password">Password:</label>
                            <div className="bg-slate-100 p-3 flex justify-between">
                               <input type={showPassword ? "text" : "password" }
                                      placeholder="Enter password" 
                                      className="w-fll h-full outline-none bg-transparent" 
                                      id="password"
                                      name="password"
                                      onChange={handleChange}
                                      required  
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

                       
                        <button type="submit" className="p-3 w-full border-2 hover:border-blue-700 bg-blue-700 text-white cursor-pointer hover:bg-white hover:text-blue-700 text-md rounded-lg disabled:opacity-80">
                          Update Profile
                        </button>
                        <button type="submit" className="p-3 w-full border-2 border-red-700 hover:bg-red-700 hover:text-white cursor-pointer text-red-700 text-md rounded-lg disabled:opacity-80">
                          Create Listing
                        </button>
                       
                       
                    </form>  
                    <div className="flex justify-around items-center">
                    
                      <span className="text-red-700 p-1 hover:underline cursor-pointer font-semibold">Delete Account</span>
                      <span className="text-red-700 p-1 hover:underline cursor-pointer font-semibold">Sign Out</span>
                 
                   </div>                                                       
                </div>
               
        </div>
    </section>
  )
} 
 
export default Profile