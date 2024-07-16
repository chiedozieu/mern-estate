import React from 'react'
import { CiSearch } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { GiFamilyHouse } from "react-icons/gi";
import {useSelector} from 'react-redux'

export default function Header () {
  const {currentUser} = useSelector((state) => state.user)

  console.log('currentUser', currentUser)



  return (
    <header className='w-full bg-blue-600 shadow-md py-3 px-6'>
        
          
            <div className='container mx-auto flex justify-between items-center w-full'>
              <Link to='/' className=''>
                  <span className='text-white font-base text-sm md:text-2xl'>Poco</span>
                  <span className='text-white font-extrabold text-base md:text-4xl relative z-30'>Estate</span>
              
                     <div className='hidden sm:inline text-purple-200 text-2xl absolute left-56 rounded-full w-5 h-5'>
                       <GiFamilyHouse className='hover:animate-bounce transition-all' />
                     </div>
              </Link>
                       
                      
                      <form className='bg-slate-100 py-1 sm:py-2 rounded-md flex items-center px-3 text-slate-500'>
              
                <input type="text" placeholder='Search' className='bg-transparent outline-none w-20 sm:w-64 ' />
                <CiSearch className='cursor-pointer'/>
                         
                      </form>
                        {
              currentUser ?
              (<div className='flex items-center gap-2 text-white text-sm font-thin'>
                 <span><span className='font-medium'>Hi </span>{currentUser?.rest?.username}!</span>
                  <Link to={'/profile'} >          
                    <img src={currentUser?.rest?.avatar} alt="profile" className='rounded-full object-cover h-10 w-10' />
                  </Link>
              </div>
              ) : (
              
                      <div className='flex gap-2'>
                        <div>
                            <Link to={'/login'} className="p-2 px-4 text-lg font-semibold text-white border-2 hover:bg-white hover:text-slate-700 rounded-md" >
                              Login
                            </Link>
                        </div>
                        <div className='hidden md:inline' >
                            <Link to={'/sign-up'} className="p-2 px-3 text-lg font-semibold text-slate-700 bg-white rounded-md hover:text-white border-2 hover:bg-transparent">
                              Sign Up
                            </Link>
                        </div>
                      </div>
              )
                        }
            </div>

    </header>
  )
}
