
import { useState } from "react";
import { PiUserCircleThin } from "react-icons/pi";
import { TbEyeCheck, TbEyeClosed,  } from "react-icons/tb"; 
import { Link } from "react-router-dom";



 
const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   
  


  return (
    <section id="signup">
        <div className="mx-auto container p-4">
        <h1 className="text-center text-3xl font-semibold text-slate-700 my-5">Sign Up</h1>
                <div className="bg-white w-full max-w-md mx-auto rounded-md p-4">
                    <form className="flex flex-col gap-4 p-4">
                        <div className="">
                            <label htmlFor="Username">Username:</label>
                            <div className="bg-slate-100 p-2">
                              <input
                                    name="username" 
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
                                    name="email" 
                                    type="email" 
                                    placeholder="Enter email" 
                                    required
                                    className="w-fll h-full outline-none bg-transparent"/>
                            </div>
                        </div>

                        <div className="">
                            <label htmlFor="password">Password:</label>
                            <div className="bg-slate-100 p-2 flex justify-between">
                               <input type={showPassword ? "text" : "password"}
                                      placeholder="Enter password" 
                                      className="w-fll h-full outline-none bg-transparent" 
                                      name="password"
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

                        <button type="submit" className="p-2 w-full bg-blue-600 hover:bg-blue-700 cursor-pointer text-white text-md rounded-lg disabled:opacity-80">Sign Up</button>
                    </form>
                    <p className="p-4">Already have account? <Link to='/login' className="cursor-pointer text-blue-500 hover:text-blue-700 hover:underline">Login</Link></p>
                </div>
        </div>
    </section>
  )
}
 
export default SignUp