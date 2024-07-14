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
                <span className='text-slate-300 font-extrabold text-base md:text-4xl relative z-30'>Estate</span>
                 
                   <GiFamilyHouse  className='hidden sm:inline text-green-200 text-2xl absolute left-44 rounded-full'/>
            </Link>
         
        
        <form className='bg-slate-100 py-1 sm:py-2 rounded-md flex items-center px-3 text-slate-500'>
            
              <input type="text" placeholder='Search' className='bg-transparent outline-none w-20 sm:w-64 ' />
              <CiSearch className='c cursor-pointer'/>
           
        </form>
        <div className="py-1 px-2  text-lg font-semibold text-slate-700 bg-white rounded-md hover:text-red-700">
          <Link to={'/login'} >Login</Link>
        </div>
    </header>
  )
}
