
import { useState } from "react";
import { PiUserCircleThin } from "react-icons/pi";
import { TbEyeCheck, TbEyeClosed,  } from "react-icons/tb"; 
import { Link, useNavigate } from "react-router-dom";
import {toast } from 'react-toastify'
import {useDispatch, useSelector} from 'react-redux'
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";



 
const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {loading, error} = useSelector((state) => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({   
      email: '',
      password: '',
      confirmPassword: ''
    });
   
  
const handleChange = (e) => {
  setFormData({...formData, [e.target.id]: e.target.value});
  
}

const handleSubmit = async (e) => {
  e.preventDefault();
 
  dispatch(signInStart())
  const response = await fetch('/api/auth/signin', {
  method: 'POST',
  credentials: 'include',
  headers: {'content-type': 'application/json'},
  body: JSON.stringify(formData)
  })
 try {
  const data = await response.json();
  
  if(data.success){
    dispatch(signInSuccess(data));
    navigate('/')
    toast.success(data.message)
    
  }else{
    dispatch(signInFailure(data.message));
    toast.error(data.message)
  }
 } catch (error) {
  dispatch(signInFailure(error.message));
  toast.error(error.message)
 }
}

  return (
    <section id="signin">
        <div className="mx-auto container p-4">
        <h1 className="text-center text-3xl font-semibold text-slate-700 my-5">Login</h1>
                <div className="bg-white w-full max-w-md mx-auto rounded-md p-5">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5">
                       
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

                        <button disabled={loading} type="submit" className="p-3 w-full bg-blue-600 hover:bg-blue-700 cursor-pointer text-white text-md rounded-lg disabled:opacity-80">{loading ? ('Loading...') : ('Login')}</button>
                    </form>
                    <p className="p-4">Dont have account? <Link to='/sign-up' className="cursor-pointer text-blue-500 hover:text-blue-700 hover:underline">Sign Up</Link></p>
                </div>
        </div>
    </section>
  )
} 
 
export default Login