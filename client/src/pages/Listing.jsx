import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GiSpinningBlades } from "react-icons/gi";
import { BiSolidErrorAlt } from "react-icons/bi";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';


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
        (
            <Swiper navigation>
                {listing.imageUrls.map((imageUrl) => (
                    <SwiperSlide key={imageUrl}>
                        <div className="h-[550px]" style={{ background: `Url(${imageUrl}) center no-repeat`, backgroundSize: 'cover'}}>

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        )
     }
    </main>
  )
}
