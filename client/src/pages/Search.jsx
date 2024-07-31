

// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';

// export default function Search() {
//     const navigate = useNavigate()
//     const [sidebarData, setSidebarData] = useState({ 
//         searchTerm: '',
//         type: 'all',
//         stateCategory: true,
//         serviced: false,
//         sort: 'created_at',
//         order: 'desc',
//         negotiable: false,
//     })
    
//     useEffect(()=> {
//         const urlParams = new URLSearchParams(location.search)
//         const searchTermFromUrl = urlParams.get('searchTerm')
//         const typeFromUrl = urlParams.get('type')
//         const negotiableFromUrl = urlParams.get('negotiable')
//         const stateCategoryFromUrl = urlParams.get('stateCategory')
//         const servicedFromUrl = urlParams.get('serviced')
//         const orderFromUrl = urlParams.get('order')
//         const sortFromUrl = urlParams.get('sort')

//         if(searchTermFromUrl || typeFromUrl || negotiableFromUrl || stateCategoryFromUrl || servicedFromUrl || orderFromUrl || sortFromUrl) {
//              setSidebarData({
//                 searchTerm: searchTermFromUrl || '',
//                 type: typeFromUrl || 'all',
//                 negotiable: negotiableFromUrl === 'true' ? true : false,
//                 stateCategory: stateCategoryFromUrl === 'true' ? true : false,
//                 serviced: servicedFromUrl === 'true' ? true : false,
//                 order: orderFromUrl || 'created_at',
//                 sort: sortFromUrl || 'desc',
//              })  
//         }

//     }, [location.search])

//     const handleChange = (e) => {
//         const { id, type, value, checked } = e.target;

//         if (id === 'all' || id === 'rent' || id === 'sale') {
//             setSidebarData({ ...sidebarData, type: id })
//         } else if (id === 'searchTerm') {
//             setSidebarData({ ...sidebarData, searchTerm: value })
//         } else if (id === 'serviced' || id === 'stateCategory' || id === 'negotiable') {
//             setSidebarData({ ...sidebarData, [id]: checked })
//         } else if (id === 'sort_order') {
//             const [sort, order] = value.split('_');
//             setSidebarData({ ...sidebarData, sort, order })
//         }
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         const urlParams = new URLSearchParams()
//         urlParams.set('searchTerm', sidebarData.searchTerm)
//         urlParams.set('type', sidebarData.type)
//         urlParams.set('negotiable', sidebarData.negotiable)
//         urlParams.set('stateCategory', sidebarData.stateCategory)
//         urlParams.set('serviced', sidebarData.serviced)
//         urlParams.set('order', sidebarData.order)
//         urlParams.set('sort', sidebarData.sort)

//         const searchQuery = urlParams.toString()
//         navigate(`/search?/${searchQuery}`)
//     }

//     return (
//         <div className='container mx-auto p-4'>
//             <div className="flex flex-col md:flex-row md:min-h-[calc(100vh-95px)]">
//                 {/* left side */}
//                 <div id='left-side' className="p-7 border-b-2 md:border-r-2 max-w-sm">
//                     <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
//                         <div className="flex items-center gap-2">
//                             <label className='whitespace-nowrap font-semibold'>Search Term</label>
//                             <input type="text" id='searchTerm'
//                                 placeholder='Search...'
//                                 value={sidebarData.searchTerm}
//                                 onChange={handleChange}
//                                 className='p-2 rounded-lg border w-full' />
//                         </div>
//                         <div className="flex gap-2 flex-wrap items-center">
//                             <label className='font-semibold'>Type:</label>
//                             <div className="flex gap-2">
//                                 <input type="checkbox" id="all"
//                                     checked={sidebarData.type === 'all'}
//                                     onChange={handleChange}
//                                     className='w-5' />
//                                 <span>Rent & Sale</span>
//                             </div>
//                             <div className="flex gap-2">
//                                 <input type="checkbox" id="rent"
//                                     checked={sidebarData.type === 'rent'}
//                                     onChange={handleChange}
//                                     className='w-5' />
//                                 <span>Rent</span>
//                             </div>
//                             <div className="flex gap-2">
//                                 <input type="checkbox" id="sale"
//                                     checked={sidebarData.type === 'sale'}
//                                     onChange={handleChange}
//                                     className='w-5' />
//                                 <span>Sale</span>
//                             </div>
//                             <div className="flex gap-2">
//                                 <input type="checkbox" id="negotiable"
//                                     checked={sidebarData.negotiable}
//                                     onChange={handleChange}
//                                     className='w-5' />
//                                 <span>Negotiable</span>
//                             </div>
//                         </div>
//                         <div className="flex gap-2 flex-wrap items-center">
//                             <label className='font-semibold'>Amenities:</label>
//                             <div className="flex gap-2">
//                                 <input type="checkbox" id="serviced"
//                                     checked={sidebarData.serviced}
//                                     onChange={handleChange}
//                                     className='w-5' />
//                                 <span>Serviced</span>
//                             </div>
//                         </div>
//                         <div className="flex gap-2 flex-wrap items-center">
//                             <label className='font-semibold'>Location:</label>
//                             <div className="flex gap-2">
//                                 <input type="checkbox" id="stateCategory"
//                                     checked={sidebarData.stateCategory}
//                                     onChange={handleChange}
//                                     className='w-5' />
//                                 <span>State</span>
//                             </div>
//                         </div>
//                         <div className="flex items-center gap-2 ">
//                             <label className='font-semibold'>Sort:</label>
//                             <select id="sort_order"
//                                 defaultValue={'created_at_desc'}
//                                 onChange={handleChange}
//                                 className='border rounded-lg p-2'>
//                                 <option value="discountPrice_desc">Price high-low</option>
//                                 <option value="discountPrice_asc">Price low-high</option>
//                                 <option value="createdAt_desc">Latest</option>
//                                 <option value="createdAt_asc">Oldest</option>
//                             </select>
//                         </div>
//                         <button className='bg-blue-700 text-white hover:bg-opacity-95 rounded-lg p-2'>
//                             Search
//                         </button>
//                     </form>
//                 </div>

//                 {/* right side */}
//                 <div id='right-side' className="mt-5">
//                     <h1 className='text-3xl font-semibold border-b p-2 text-slate-700'>Listing results</h1>
//                 </div>
//             </div>
//         </div>
//     )
// }









import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Search() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [listings, setListings] = useState([])


  const [sidebarData, setSidebarData] = useState({ 
    searchTerm: '',
    type: 'all',
    stateCategory: true,
    serviced: false,
    sort: 'created_at',
    order: 'desc',
    negotiable: false,
  });
  console.log('listings:', listings)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const negotiableFromUrl = urlParams.get('negotiable');
    const stateCategoryFromUrl = urlParams.get('stateCategory');
    const servicedFromUrl = urlParams.get('serviced');
    const orderFromUrl = urlParams.get('order');
    const sortFromUrl = urlParams.get('sort');

    setSidebarData({
      searchTerm: searchTermFromUrl || '',
      type: typeFromUrl || 'all',
      negotiable: negotiableFromUrl === 'true' ? true : false,
      stateCategory: stateCategoryFromUrl === 'true' ? true : false,
      serviced: servicedFromUrl === 'true' ? true : false,
      order: orderFromUrl || 'created_at',
      sort: sortFromUrl || 'desc',
    });

    const fetchData = async () => {
      setLoading(true)
      const searchQuery = urlParams.toString()
      const response = await fetch(`/api/listing/get?${searchQuery}`)
      const data = await response.json()
      setListings(data)
      setLoading(false)
    
    }

    fetchData()

  }, [window.location.search]);





  const handleChange = (e) => {
    const { id, value, checked } = e.target;

    if (id === 'all' || id === 'rent' || id === 'sale') {
      setSidebarData({ ...sidebarData, type: id });
    } else if (id === 'searchTerm') {
      setSidebarData({ ...sidebarData, searchTerm: value });
    } else if (id === 'serviced' || id === 'stateCategory' || id === 'negotiable') {
      setSidebarData({ ...sidebarData, [id]: checked });
    } else if (id === 'sort_order') {
      const [sort, order] = value.split('_');
      setSidebarData({ ...sidebarData, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('type', sidebarData.type);
    urlParams.set('negotiable', sidebarData.negotiable);
    urlParams.set('stateCategory', sidebarData.stateCategory);
    urlParams.set('serviced', sidebarData.serviced);
    urlParams.set('order', sidebarData.order);
    urlParams.set('sort', sidebarData.sort);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`)

  };

  return (
    <div className='container mx-auto p-4'>
      <div className="flex flex-col md:flex-row md:min-h-[calc(100vh-95px)]">
        {/* left side */}
        <div id='left-side' className="p-7 border-b-2 md:border-r-2 max-w-sm">
          <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
            <div className="flex items-center gap-2">
              <label className='whitespace-nowrap font-semibold'>Search Term</label>
              <input type="text" id='searchTerm'
                placeholder='Search...'
                value={sidebarData.searchTerm}
                onChange={handleChange}
                className='p-2 rounded-lg border w-full' />
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              <label className='font-semibold'>Type:</label>
              <div className="flex gap-2">
                <input type="checkbox" id="all"
                  checked={sidebarData.type === 'all'}
                  onChange={handleChange}
                  className='w-5' />
                <span>Rent & Sale</span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" id="rent"
                  checked={sidebarData.type === 'rent'}
                  onChange={handleChange}
                  className='w-5' />
                <span>Rent</span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" id="sale"
                  checked={sidebarData.type === 'sale'}
                  onChange={handleChange}
                  className='w-5' />
                <span>Sale</span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" id="negotiable"
                  checked={sidebarData.negotiable}
                  onChange={handleChange}
                  className='w-5' />
                <span>Negotiable</span>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              <label className='font-semibold'>Amenities:</label>
              <div className="flex gap-2">
                <input type="checkbox" id="serviced"
                  checked={sidebarData.serviced}
                  onChange={handleChange}
                  className='w-5' />
                <span>Serviced</span>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              <label className='font-semibold'>Location:</label>
              <div className="flex gap-2">
                <input type="checkbox" id="stateCategory"
                  checked={sidebarData.stateCategory}
                  onChange={handleChange}
                  className='w-5' />
                <span>State</span>
              </div>
            </div>
            <div className="flex items-center gap-2 ">
              <label className='font-semibold'>Sort:</label>
              <select id="sort_order"
                defaultValue={'created_at_desc'}
                onChange={handleChange}
                className='border rounded-lg p-2'>
                <option value="discountPrice_desc">Price high-low</option>
                <option value="discountPrice_asc">Price low-high</option>
                <option value="createdAt_desc">Latest</option>
                <option value="createdAt_asc">Oldest</option>
              </select>
            </div>
            <button className='bg-blue-700 text-white hover:bg-opacity-95 rounded-lg p-2'>
              Search
            </button>
          </form>
        </div>

        {/* right side */}
        <div id='right-side' className="mt-5">
          <h1 className='text-3xl font-semibold border-b p-2 text-slate-700'>Listing results</h1>
        </div>
      </div>
    </div>
  );
}






