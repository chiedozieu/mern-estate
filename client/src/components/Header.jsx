import React from 'react'
import { CiSearch } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { GiFamilyHouse } from "react-icons/gi";

export default function 
() {
  return (
    <header className='w-full bg-blue-600 shadow-md flex justify-between items-center py-3 px-6'>
        
          
            <Link to={'/'} className=''>
                <span className='text-white font-base text-sm md:text-2xl'>Poco</span>
                <span className='text-white font-extrabold text-base md:text-4xl relative z-30'>Estate</span>
                 
                   <GiFamilyHouse  className='hidden sm:inline text-purple-200 text-2xl absolute left-44 rounded-full'/>
            </Link>
         
        
        <form className='bg-slate-100 py-1 sm:py-2 rounded-md flex items-center px-3 text-slate-500'>
            
              <input type="text" placeholder='Search' className='bg-transparent outline-none w-20 sm:w-64 ' />
              <CiSearch className='cursor-pointer'/>
           
        </form>
        <div className='flex gap-2'>
          <div>
            <Link to={'/login'} className="p-2 px-4 text-lg font-semibold text-white border-2 hover:bg-white hover:text-slate-700 rounded-md" >Login</Link>
          </div>
          <div className='hidden md:inline' >
            <Link to={'/sign-up'} className="p-2 px-3 text-lg font-semibold text-slate-700 bg-white rounded-md hover:text-white border-2 hover:bg-transparent">Sign Up</Link>
          </div>
        </div>
    </header>
  )
}
