import React from 'react'
import { GiFamilyHouse } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import { CiFacebook } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { CiInstagram } from "react-icons/ci";
import { FaPinterest } from "react-icons/fa";

export default function Footer() {
  return (
    <div className='h-80 w-full shadow-md'>
        <div className="h-full w-full">
            <div className=" flex flex-col justify-between py-6 bg-blue-600 h-64 w-full shadow-2xl">
                <div className="p-4 text-lg">
                    <div className='flex flex-col text-white'>
                        <Link to={'/search?agreementType=rent'}>Rent</Link>
                        <Link to={'/search?agreementType=sale'}>Sale</Link>
                        <Link to={'/search?type=land'}>Land</Link>
                        <Link to='/about'>About</Link>
                    </div>
                </div>
                <div className="flex items-center justify-end p-4 gap-2">
                    <Link>
                        <CiFacebook className='text-4xl text-white cursor-pointer hover:scale-125 transition-all duration-200'/>
                    </Link>
                    <Link>
                        <FaXTwitter className='text-4xl text-white cursor-pointer hover:scale-125 transition-all duration-200' />
                    </Link>
                    <Link>
                        <CiInstagram className='text-4xl text-white cursor-pointer hover:scale-125 transition-all duration-200' />
                    </Link>
                    <Link>
                        <FaPinterest className='text-4xl text-white cursor-pointer hover:scale-125 transition-all duration-200' />
                    </Link>                 
                </div>
            </div>


            <div className="bg-blue-500 h-16 w-full p-2">
            <Link to='/' className='flex items-center justify-center'>
                <div className='relative '>
                    <span className='text-white font-base text-sm md:text-2xl'>Poco</span>
                    <span className='text-white font-extrabold text-base md:text-4xl'>Estate</span>
                    <div className='hidden sm:inline-flex text-purple-200 text-2xl absolute left-full rounded-full w-5 h-5'> 
                    <GiFamilyHouse className='hover:animate-bounce transition-all' />
                    </div>
                </div>
           </Link>
            </div>
        </div>

    </div>
  )
}
