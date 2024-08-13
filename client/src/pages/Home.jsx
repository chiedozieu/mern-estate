import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {Swiper,SwiperSlide} from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import  SwiperCore  from 'swiper'; 
import 'swiper/css/bundle'; 
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
import ListingItems from '../components/ListingItems';

const Home = () => {
  const [rentListings, setRentListings] = useState([])
  const [saleListings, setSaleListings] = useState([])
  const [landListings, setLandListings] = useState([])

  SwiperCore.use([Pagination, Navigation])

  console.log('rentListings:', rentListings)
  console.log('saleListings:', saleListings)
  console.log('landListings:', landListings)

  useEffect(() => {
    const fetchRentListings = async () => {
      try {
        const response = await fetch('/api/listing/get?agreementType=rent&limit=4')
        const data = await response.json()
        setRentListings(data)
        fetchSaleListings()
      } catch (error) {
        console.log(error)
      }
    }
    const fetchSaleListings = async () => {
      try {
        const response = await fetch('/api/listing/get?agreementType=sale&limit=4')
        const data = await response.json()
        setSaleListings(data)
        fetchLandListings()
        
      } catch (error) {
        console.log(error)
      }
    }
    const fetchLandListings = async () => {
      try {
        const response = await fetch('/api/listing/get?type=land&limit=4')
        const data = await response.json()
        setLandListings(data)
        
      } catch (error) {
        console.log(error)
      }
    } 
    fetchRentListings()
  }, [])
  
  return (
    <div className='container mx-auto'>
      {/* top */}
      <div className="flex flex-col gap-6 py-28 px-3 ">
          <h1 className='text-slate-700 font-bold text-3xl  lg:text-6xl'>Rent, Sell, or Invest - <span className='text-slate-500 '>Your One-Stop</span> 
          <br />Real Estate Solution</h1>
          <div className="text-gray-400 text-xs sm:text-small">
            Poko Estate your Gateway to Real Estate Success. <br /> Where Dreams Become Reality
          </div>
          <Link to={'search'} className='text-xs sm:text-sm text-blue-700 text-bold hover:underline'>
            Let's get started
          </Link>
      </div>

      {/* slider */}
      <Swiper pagination navigation>
          {
            rentListings && rentListings.length > 0 && 
            rentListings.map((rent, index) => (
              <SwiperSlide key={rent._id + index}>
                <div style={{background: `url(${rent.imageUrls[0]}) center no-repeat`, backgroundSize: 'cover'}} className="h-[500px]" >

                </div>
              </SwiperSlide>
            ))         
          }
      </Swiper>

      {/* x3 listing results */}
 
         <div className="max-w-6xl mx-auto p-4 flex flex-col">
             {/* 1. listing for rent */} 
             <div className="">
              {
                saleListings && saleListings.length > 0 && (
                  <div className="mt-10">
                    <div className="my-3">
                        <h2 className='text-2xl font-semibold text-slate-600'>
                          Recent Sales listings
                        </h2>
                        <Link to={'/search?agreementType=sale'} className='text-sm text-blue-800 hover:underline'>
                          Show more
                        </Link>
                    </div>
                      <div className=" flex flex-wrap gap-2">
                        {
                          saleListings.map((listing) => (
                            <ListingItems listing={listing} key={listing._id}/>
                          ))
                        }
                      </div>
                    
                  </div>
                )
              }
             </div>
             <div className="">
              {
                rentListings && rentListings.length > 0 && (
                  <div className="mt-10">
                    <div className="my-3">
                        <h2 className='text-2xl font-semibold text-slate-600'>
                          Recent Rent listings
                        </h2>
                        <Link to={'/search?agreementType=rent'} className='text-sm text-blue-800 hover:underline'>
                          Show more
                        </Link>
                    </div>
                      <div className=" flex flex-wrap gap-2">
                        {
                          rentListings.map((listing) => (
                            <ListingItems listing={listing} key={listing._id}/>
                          ))
                        }
                      </div>
                    
                  </div>
                )
              }
             </div>
             <div className="">
              {
                landListings && landListings.length > 0 && (
                  <div className="mt-10">
                    <div className="my-3">
                        <h2 className='text-2xl font-semibold text-slate-600'>
                          Recent Land listings
                        </h2>
                        <Link to={'/search?type=land'} className='text-sm text-blue-800 hover:underline'>
                          Show more
                        </Link>
                    </div>
                      <div className=" flex flex-wrap gap-2">
                        {
                          landListings.map((listing) => (
                            <ListingItems listing={listing} key={listing._id}/>
                          ))
                        }
                      </div>
                    
                  </div>
                )
              }
             </div>

         </div>

    </div>
  ) 
}

export default Home
