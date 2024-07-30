import React from 'react'

export default function Search() {
  return (
    <div className='container mx-auto p-4'>
        <div className="flex flex-col md:flex-row md:min-h-[calc(100vh-95px)]">
                 {/* left side */}
            <div id='left-side' className="p-7 border-b-2 md:border-r-2" >
                <form className='flex flex-col gap-8'>
                <div className="flex items-center gap-2">
                    <label className='whitespace-nowrap font-semibold'>Search Term</label>
                    <input type="text" id='searchTerm'
                        placeholder='Search...'
                        className='p-2 rounded-lg border w-full' />
                </div>
                <div className="flex gap-2 flex-wrap items-center">
                    <label className='font-semibold'>Type:</label>
                    <div className="flex gap-2">
                        <input type="checkbox" id="all" className='w-5'/><span>Rent & Sale</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id="rent" className='w-5'/><span>Rent</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id="sale" className='w-5'/><span>Sale</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id="negotiable" className='w-5'/><span>Negotiable</span>
                    </div>
                </div>
                <div className="flex gap-2 flex-wrap items-center">
                    <label className='font-semibold'>Amenities:</label>
                    <div className="flex gap-2">
                        <input type="checkbox" id="serviced" className='w-5'/><span>Serviced</span>
                    </div> 
                </div>
                <div className="flex gap-2 flex-wrap items-center">
                    <label className='font-semibold'>Location:</label>
                    <div className="flex gap-2">
                        <input type="checkbox" id="stateCategory" className='w-5'/><span>State</span>
                    </div> 
                </div>
                <div className="flex items-center gap-2 ">
                    <label className='font-semibold'>Sort:</label>
                    <select id="sort_order" className='border rounded-lg p-2'>
                        <option value="">Price high-low</option>
                        <option value="">Price low-high</option>
                        <option value="">latest</option>
                        <option value="">oldest</option>
                    </select>
                </div>
                <button className='bg-blue-700 text-white hover:bg-opacity-95 rounded-lg p-2'>
                    Search
                </button>
                </form>
            </div>

                {/* right side */}
            <div id='right-side'  className="mt-5" >
                <h1 className='text-3xl font-semibold border-b p-2 text-slate-700'>Listing results</h1>
            </div>
        </div>

    </div>
  )
}
