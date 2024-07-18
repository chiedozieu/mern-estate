import React from 'react'
import displayNGNCurrency from '../utils/Naira'
import { LuImagePlus } from "react-icons/lu";

export default function CreateListing() {
  return (
    <main className='container mx-auto p-4'>
        <h1 className='bg-blue-500 my-7 text-3xl max-w-sm text-center mx-auto p-4 font-extrabold text-white'>Create Listing</h1>

        <form className='flex flex-col sm:flex-row gap-4'>
          <div className="flex flex-col gap-4 flex-1">
              <input id='description' type="text" placeholder='Description...' maxLength='62 'minLength='10'className='border p-3 rounded-lg' required/>
              <textarea id='address' type="text" placeholder='Name' className='border p-3 rounded-lg' required/>
              <input type="text" placeholder='Address' className='border p-3 rounded-lg' required/>

              <div className=" flex gap-6 flex-wrap">
                  <div className="flex gap-2">
                    <input type="checkbox" id='sale' className='w-5' />
                    <span>Sell</span>
                  </div>
                  <div className="flex gap-2">
                    <input type="checkbox" id='sale' className='w-5' />
                    <span>Rent</span>
                  </div>
                  <div className="flex gap-2">
                    <input type="checkbox" id='serviced' className='w-5' />
                    <span>Serviced</span>
                  </div>
                  <div className="flex gap-2">
                    <input type="checkbox" id='building' className='w-5' />
                    <span>Building Property</span>
                  </div>
                  <div className="flex gap-2">
                    <input type="checkbox" id='land' className='w-5' />
                    <span>Land & Plots</span>
                  </div>
              </div>

              <div className="flex flex-wrap gap-6 ">
                <div className="flex gap-2 items-center">
                  <input type="number" id='bedrooms' min='1' max='10' className='p-3 border rounded-lg border-gray-300'/>
                  <p>Beds</p>
                </div>
                <div className="flex gap-2 items-center">
                  <input type="number" id='bathrooms' min='1' max='10' className='p-3 border rounded-lg border-gray-300'/>
                  <p>Baths</p>
                </div>
                <div className="flex gap-2 items-center">
                  <input type="number" id='regularPrice' min='6' className='p-3 border rounded-lg border-gray-300'/>
                  <div className="flex flex-col items-center">
                    <p>Regular Price</p>
                    <span className='text-xs'>{displayNGNCurrency(0)}/Year</span>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <input type="number" id='discountPrice' min='6' className='p-3 border rounded-lg border-gray-300'/>
                  <div className="flex flex-col items-center">
                    <p>Discounted Price</p>
                    <span className='text-xs'>{displayNGNCurrency(0)}/Year</span>
                  </div>
                </div>
                
              </div>

          </div>
          <div className="flex flex-col flex-1">
             <p className='font-semibold'>Images: <span className='font-extralight text-xs text-gray-600 ml-2'>The first will be the cover (Max 4)</span>
             </p>
             <div className="grid gap-4">
              <div className="flex justify-between">
                <div className="w-20 h-20">
                  <label htmlFor="images"></label>
                  <input type="file"  id='images' accept='image/*' multiple hidden className='hidden'/>
                  <label htmlFor="images"><div className="bg-blue-200 w-full h-full flex items-center justify-center text-3xl cursor-pointer"><LuImagePlus className='text-purple-700'/></div></label>
                </div>
                <button className='p-2 text-sm bg-purple-500 hover:bg-purple-700 text-white rounded-lg cursor-pointer'>Upload Image</button>
              </div>
              <button className='p-2 border-2 border-purple-700 text-purple-700 w-full rounded-lg hover:bg-purple-700 hover:text-white disabled:opacity-80'>
                Upload
              </button>
             </div>
             
          </div>
         
         </form>
    </main>
  )
}
