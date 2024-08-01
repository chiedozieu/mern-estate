import React from 'react'
import { Link } from 'react-router-dom'
import { MdLocationOn } from "react-icons/md";
import displayNGNCurrency from '../utils/Naira';
import { IoBed } from "react-icons/io5";
import { MdOutlineBathtub } from "react-icons/md";
import { PiIslandThin } from "react-icons/pi";


export default function ListingItems({listing}) {
  return (
 
        <div className="flex shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px] bg-white">
            <Link to={`/listing/${listing._id}`} >
                <img src={listing.imageUrls[0]} alt="listing image" className='h-[300px] sm:h-[220px w-full object-cover hover:scale-105 transition-scale duration-300' />
                <div className="p-3 flex flex-col gap-2 w-full ">
                    <p className='font-semibold,text-lg text-slate-700 truncate'>{listing.name}</p>
                    <div className="flex items-center gap-1">
                        <MdLocationOn className='h-4 w-4 text-green-700 '/>
                        <p className='text-sm  text-gray-600 w-full'>{listing.address}</p>
                    </div>
                    <p className='text-ellipsis line-clamp-2 text-sm text-gray-600'>{listing.description}
                    </p>
                    <p className='text-slate-500 font-semibold'>
                    {displayNGNCurrency(listing.discountPrice)}
                    {listing.agreementType === 'rent' && '/Year'}
                    </p>
                     
                     {
                        listing.type === 'building' ? (

                        <div className="flex gap-4">

                        <div className="flex items-center gap-1 p-1">
                           <div className="bg-blue-200 rounded-full h-5 w-5 flex items-center justify-center">
                               <p className='text-center text-blue-700'>{listing.bedrooms}</p>
                           </div>
                            <IoBed className='text-blue-700'/>
                        </div>
                        <div className="flex items-center gap-1">
                        <div className="bg-blue-200 rounded-full h-5 w-5 flex items-center justify-center">
                            <p className='text-center text-blue-700'>{listing.bathrooms}</p>
                        </div>
                            <MdOutlineBathtub className='text-blue-700'/>
                        </div>
                        </div>
                        ) : (
                            <div className="flex gap-2 items-center">
                                 
                                     <p className='text-gray-700'>Land</p>
                                
                                <PiIslandThin className='text-green-700' />
                            </div>
                        )
                     }
                    


                </div>
            </Link>
        </div>
  
  )
}
