import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GiSpinningBlades } from "react-icons/gi";
import { BiSolidErrorAlt } from "react-icons/bi";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import displayNGNCurrency from '../utils/Naira';
import { TfiLocationPin } from "react-icons/tfi";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaBed } from "react-icons/fa";
import { MdBathtub } from "react-icons/md";
import { GiSecurityGate } from "react-icons/gi";


export default function Listing() {
    SwiperCore.use([Navigation])
    const params = useParams()
    const [ listing, setListing ] = useState(null)
    const [loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(false)
    

console.log('listing:', listing)
     

useEffect(() => {
    const fetchListing = async () => {
        try {
            setLoading(true)
            setError(false)
            const response = await fetch(`/api/listing/get/${params.listingId}`)
            const data = await response.json()
            
            if(data.success === false){
                setError(true)
                setLoading(false)
                return
            }
            console.log('data;', data)
            setListing(data)
            setLoading(false)
            
        
        } catch (error) {
            setError(true)
            setLoading(false) 
        }
    }
    fetchListing()
}, [params.listingId]);



  return (
    <main>
     {
        loading && 
        <div className="flex justify-center items-center h-[calc(100vh-200px)]">
            <div className="bg-blue-300 h-12 w-12 rounded-full flex items-center justify-center text-center animate-pulse">
                <GiSpinningBlades className='w-full h-full text-white animate-spin' />
            </div>
        </div>
     }
     {
        error && 
        <div className="flex justify-center gap-2 items-center h-[calc(100vh-200px)]">
           
                <BiSolidErrorAlt className='text-red-700 h-10 w-10' /><p className='text-xl font-semibold text-slate-600'>Something went wrong</p>
            
        </div>
     }
     {
        listing && !error && !loading &&  
        
            <div className="container mx-auto p-4">
                <Swiper navigation>
                    {listing.imageUrls.map((imageUrl) => (
                        <SwiperSlide key={imageUrl}>
                            <div className="h-[550px]" style={{ background: `Url(${imageUrl}) center no-repeat`, backgroundSize: 'cover'}}>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                        
                            
                <div className="listing-title flex max-w-lg gap-2 font-semibold justify-between text-xl my-4">
                    <p>{listing.name}</p>
                    {
                    displayNGNCurrency(listing.discountPrice)
                    }
                    {listing.agreementType === 'rent' && '/Year'}                          
                </div>


                <div className="flex items-center mt-5 text-sm font-thin gap-2">
                    <TfiLocationPin className='text-green-700'/>
                    <div className="flex gap-2">
                        <span>{listing.address}</span>
                        <span>{listing.stateCategory} State</span>
                    </div>
                </div>

        
                <div className="rent sale bg-red-700 max-w-[200px] text-white w-full text-center p-2 rounded-lg flex justify-between justify-items-end gap-4 ">
    
                    <span>{listing.agreementType === 'rent' ? 'For Rent' : 'For Sale'}</span>
                    <span className='land building text-sm font-thin'>{listing.type === 'land' ? 'Land' : 'Building'}</span>
                </div>

                <div className="description my-5">
                <p className='text-slate-800'>
                    <span className='font-semibold text-black'>
                        Description  - {' '}
                    </span>
                        {listing.description}
                </p>
                </div> 

                <div className="flex items-center flex-wrap justify-between gap-2 my-3 max-w-md">
                    <div className="negotiable">
                        {
                            listing.negotiable &&
                        
                            <div className="flex items-center gap-1 text-base whitespace-nowrap">
                                <GiTakeMyMoney className='text-green-700 text-xl'/>
                                <p>Negotiable</p>
                            </div>
                        }
                    </div>
                    <div className="bedroom">
                        {
                            listing.negotiable &&
                        
                            <div className="flex items-center gap-1 text-base whitespace-nowrap">
                                <FaBed className='text-green-700 text-xl'/>
                                <p>{listing.bedrooms}{' '}Bedroom{listing.bedrooms > 1 && 's'}</p>
                            </div>
                        }
                    </div>
                    <div className="bathroom">
                        {
                            listing.type === 'building' &&
                        
                            <div className="flex items-center gap-1 text-base whitespace-nowrap">
                                <MdBathtub  className='text-green-700 text-xl'/>
                                <p>{listing.bathrooms}{' '}Bathroom{listing.bathrooms > 1 && 's'}</p>
                            </div>
                        }
                    </div>
                    <div className="serviced">
                        {
                            listing.type === 'building' &&
                        
                            <div className="flex items-center gap-1 text-base whitespace-nowrap">
                                <GiSecurityGate className='text-green-700 text-xl'/>
                                <p>{listing.serviced && 'Serviced'}</p>
                            </div>
                        }
                    </div>
                </div>










            </div>
     }
    </main>
  )
}
