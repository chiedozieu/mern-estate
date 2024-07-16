
import { useState } from "react";
import { TbCircleDotted } from "react-icons/tb";
import { TbEyeCheck, TbEyeClosed,  } from "react-icons/tb"; 
import { Link, useNavigate } from "react-router-dom";
import {toast } from 'react-toastify'
import OAuth from "../components/OAuth";



 
const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
   
  
const handleChange = (e) => {
  setFormData({...formData, [e.target.id]: e.target.value});
  
}

const handleSubmit = async (e) => {
  e.preventDefault();
  if(formData.password !== formData.confirmPassword){
    toast.error('Please check both password inputs')
    return
  }
  setLoading(true)
  const response = await fetch('/api/auth/signup', {
  method: 'POST',
  credentials: 'include',
  headers: {'content-type': 'application/json'},
  body: JSON.stringify(formData)
  })
 try {
  const data = await response.json();
  
  if(data.success){
    setLoading(false);
    toast.success(data.message)
    navigate('/login')
  }else{
    setLoading(false);
    toast.error(data.message)
  }
 } catch (error) {
  setLoading(false); 
  toast.error(error.message)
 }
}

  return (
    <section id="signup">
        <div className="mx-auto container p-4">
        <h1 className="text-center text-3xl font-semibold text-slate-700 my-5">Sign Up</h1>
                <div className="bg-white w-full max-w-md mx-auto rounded-md p-4">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
                        <div className="">
                            <label htmlFor="Username">Username:</label>
                            <div className="bg-slate-100 p-2">
                              <input
                                    id="username"
                                    onChange={handleChange} 
                                    type="text" 
                                    placeholder="Enter username" 
                                    required
                                    className="w-fll h-full outline-none bg-transparent"/>
                            </div>
                        </div>
                        <div className="">
                            <label htmlFor="email">Email:</label>
                            <div className="bg-slate-100 p-2">
                              <input 
                                    id="email"
                                    onChange={handleChange} 
                                    type="email" 
                                    placeholder="Enter email" 
                                    required
                                    className="w-fll h-full outline-none bg-transparent"/>
                            </div>
                        </div>

                        <div className="">
                            <label htmlFor="password">Password:</label>
                            <div className="bg-slate-100 p-2 flex justify-between">
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

                            <div className="my-5">
                              <label htmlFor="confirm password">Confirm Password:</label>
                              <div className="bg-slate-100 p-2 flex justify-between">
                                 <input type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Enter password"
                                        className="w-fll h-full outline-none bg-transparent" 
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        onChange={handleChange}
                                        required
                                        />
                                 <div className="cursor-pointer text-xl">
                                   <span onClick={()=> setShowConfirmPassword((prev)=> !prev)}>
                                   {
                                      showConfirmPassword ? <TbEyeClosed /> :  <TbEyeCheck />
                                   }
                                   </span>
                                 </div>
                              </div>
                            </div>
                            
                        </div>

                      <button disabled={loading} type="submit" className="p-2 w-full bg-blue-600 hover:bg-blue-700 cursor-pointer text-white text-md rounded-lg disabled:opacity-80">{loading ? ( 
                          <div className="flex items-center justify-center text-xl font-semibold animate-pulse"> 
                                <TbCircleDotted className="animate-spin"/>
                          </div>
                          ) : ('Sign Up')}
                      </button>
                        <OAuth />
                       
                    </form>
                    <p className="p-4">Already have account? <Link to='/login' className="cursor-pointer text-blue-500 hover:text-blue-700 hover:underline">Login</Link></p>
                </div>
        </div>
    </section>
  )
} 
 
export default SignUp