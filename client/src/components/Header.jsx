// import React, { useEffect, useState } from 'react'
// import { CiSearch } from "react-icons/ci";
// import { Link, useNavigate } from 'react-router-dom';
// import { GiFamilyHouse } from "react-icons/gi";
// import {useSelector} from 'react-redux'

// export default function Header () {
//   const {currentUser} = useSelector((state) => state.user)
//   const [searchTerm, setSearchTerm] = useState('')
//   const navigate = useNavigate()

//   console.log('currentUser', currentUser)


// const handleSubmit = (e) => {
//   e.preventDefault()

//   const urlParams = new URLSearchParams(window.location.search)
//   urlParams.set('searchTerm', searchTerm)
//   const searchQuery = urlParams.toString()
//   navigate(`/search?${searchQuery}`)

// }


// useEffect(() => {
// const urlParams = new URLSearchParams(location.search)
// const searchTermFromUrl = urlParams.get('searchTerm')
// if (searchTermFromUrl){
//   setSearchTerm(searchTermFromUrl)
// }
// }, [location.search])

// //To get the url web search and make it same with the input search field

//   return (
//     <header className='w-full bg-blue-600 shadow-md py-3 px-6'>
        
          
//             <div className='container mx-auto flex justify-between items-center w-full'>
//               <Link to='/' className=''>
//                   <div className='relative'>
//                     <span className='text-white font-base text-sm md:text-2xl'>Poco</span>
//                     <span className='text-white font-extrabold text-base md:text-4xl'>Estate</span>
//                     <div className='hidden sm:inline-flex text-purple-200 text-2xl absolute left-full rounded-full w-5 h-5'>
//                       <GiFamilyHouse className='hover:animate-bounce transition-all' />
//                     </div>
//                   </div>
//               </Link>
                       
                      
//             <form onSubmit={handleSubmit} className='bg-slate-100 py-1 sm:py-2 rounded-md flex items-center px-3 text-slate-500'>
              
//                 <input type="text" placeholder='Search'
//                        onChange={(e)=>setSearchTerm(e.target.value)}
//                        value={searchTerm}
//                        className='bg-transparent outline-none w-20 sm:w-64 ' />
//                        <button>
//                            <CiSearch className='cursor-pointer'/>
//                        </button>
                          
//                       </form>
//                         {
//               currentUser ?
//               (<div className='flex items-center gap-2 text-white text-sm font-thin'>
//                  <span className='hidden md:inline-block'><span className='font-medium'>Hi </span>{currentUser?.rest?.username}!</span>
//                   <Link to={'/profile'} >          
//                     <img src={currentUser?.rest?.avatar} alt="profile" className='rounded-full object-cover h-10 w-10' />
//                   </Link>
//               </div>
//               ) : (
              
//                       <div className='flex gap-2'>
//                         <div>
//                             <Link to={'/login'} className="p-2 px-4 text-lg font-semibold text-white border-2 hover:bg-white hover:text-slate-700 rounded-md" >
//                               Login
//                             </Link>
//                         </div>
//                         <div className='hidden md:inline' >
//                             <Link to={'/sign-up'} className="p-2 px-3 text-lg font-semibold text-slate-700 bg-white rounded-md hover:text-white border-2 hover:bg-transparent">
//                               Sign Up
//                             </Link>
//                         </div>
//                       </div>
//               )
//                         }
//             </div>

//     </header>
//   )
// }


import React, { useEffect, useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import { GiFamilyHouse } from "react-icons/gi";
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  console.log('currentUser', currentUser);

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [window.location.search]);

  return (
    <header className='w-full bg-blue-600 shadow-md py-3 px-6'>
      <div className='container mx-auto flex justify-between items-center w-full'>
        <Link to='/' className=''>
          <div className='relative'>
            <span className='text-white font-base text-sm md:text-2xl'>Poco</span>
            <span className='text-white font-extrabold text-base md:text-4xl'>Estate</span>
            <div className='hidden sm:inline-flex text-purple-200 text-2xl absolute left-full rounded-full w-5 h-5'>
              <GiFamilyHouse className='hover:animate-bounce transition-all' />
            </div>
          </div>
        </Link>

        <form onSubmit={handleSubmit} className='bg-slate-100 py-1 sm:py-2 rounded-md flex items-center px-3 text-slate-500'>
          <input type="text" placeholder='Search'
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            className='bg-transparent outline-none w-20 sm:w-64 ' />
          <button>
            <CiSearch className='cursor-pointer' />
          </button>
        </form>
        {
          currentUser ?
            (<div className='flex items-center gap-2 text-white text-sm font-thin'>
              <span className='hidden md:inline-block'><span className='font-medium'>Hi </span>{currentUser?.rest?.username}!</span>
              <Link to={'/profile'} >
                <img src={currentUser?.rest?.avatar} alt="profile" className='rounded-full object-cover h-10 w-10' />
              </Link>
            </div>
            ) : (
              <div className='flex gap-2'>
                <div>
                  <Link to={'/login'} className="p-2 px-4 text-lg font-semibold text-white border-2 hover:bg-white hover:text-slate-700 rounded-md">
                    Login
                  </Link>
                </div>
                <div className='hidden md:inline'>
                  <Link to={'/sign-up'} className="p-2 px-3 text-lg font-semibold text-slate-700 bg-white rounded-md hover:text-white border-2 hover:bg-transparent">
                    Sign Up
                  </Link>
                </div>
              </div>
            )
        }
      </div>
    </header>
  );
}
