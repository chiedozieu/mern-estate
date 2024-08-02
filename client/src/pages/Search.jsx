
import React, { useEffect, useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import ListingItems from '../components/ListingItems';
import StateCategory from '../utils/StatesCategory';

export default function Search() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [listings, setListings] = useState([])


  const [sidebarData, setSidebarData] = useState({ 
    searchTerm: '',
    agreementType: 'all',
    stateCategory: '',
    serviced: false,
    negotiable: false,
    sort: 'created_at',
    order: 'desc',
    
  });
  console.log('listings:', listings)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const agreementTypeFromUrl = urlParams.get('agreementType');
    const negotiableFromUrl = urlParams.get('negotiable');
    const stateCategoryFromUrl = urlParams.get('stateCategory');
    const servicedFromUrl = urlParams.get('serviced');
    const orderFromUrl = urlParams.get('order');
    const sortFromUrl = urlParams.get('sort');

    if(searchTermFromUrl || agreementTypeFromUrl || negotiableFromUrl || stateCategoryFromUrl || servicedFromUrl ||  orderFromUrl || sortFromUrl) {

      setSidebarData({
        searchTerm: searchTermFromUrl || '',
        agreementType: agreementTypeFromUrl || 'all',
        negotiable: negotiableFromUrl === 'true' ? true : false,
        stateCategory: stateCategoryFromUrl || '',
        serviced: servicedFromUrl === 'true' ? true : false,
        order: orderFromUrl || 'desc',
        sort: sortFromUrl || 'created_at',
      });
    }

    const fetchListings = async () => {
      setLoading(true)
      const searchQuery = urlParams.toString()
      const response = await fetch(`/api/listing/get?${searchQuery}`)
      const data = await response.json()
      setListings(data)
      setLoading(false)
    
    }

    fetchListings()

  }, [window.location.search]);





  const handleChange = (e) => {
    const { id, value, checked } = e.target;

    if (id === 'all' || id === 'rent' || id === 'sale') {
      setSidebarData({ ...sidebarData, agreementType: id });
    } else if (id === 'searchTerm' ) {
      setSidebarData({ ...sidebarData, searchTerm: value });
    } else if (id === 'stateCategory' ) {
      setSidebarData({ ...sidebarData, stateCategory: value });
    } else if (id === 'serviced' || id === 'negotiable') {
      setSidebarData({ ...sidebarData, [id]: checked });
    } else if (id === 'sort_order') {
      const sort = value.split('_')[0] || 'created_at';
      const order = value.split('_')[1] || 'desc';
      setSidebarData({ ...sidebarData, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('agreementType', sidebarData.agreementType);
    urlParams.set('negotiable', sidebarData.negotiable);
    urlParams.set('stateCategory', sidebarData.stateCategory);
    urlParams.set('serviced', sidebarData.serviced);
    urlParams.set('order', sidebarData.order);
    urlParams.set('sort', sidebarData.sort);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`)

  };

  return (
    <div className='container mx-auto'>
      <div className="flex flex-col md:flex-row md:min-h-[calc(100vh-95px)]">
        {/* left side */}
        <div id='left-side' className="flex-1 p-7 border-b-2 md:border-r-2 max-w-sm">
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
                  checked={sidebarData.agreementType === 'all'}
                  onChange={handleChange}
                  className='w-5' />
                <span>Rent & Sale</span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" id="rent"
                  checked={sidebarData.agreementType === 'rent'}
                  onChange={handleChange}
                  className='w-5' />
                <span>Rent</span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" id="sale"
                  checked={sidebarData.agreementType === 'sale'}
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
              <select value={sidebarData.stateCategory} id="stateCategory" onChange={handleChange} className="p-2 bg-white rounded-lg" >
            <option value={''}>Select State</option>
                  {
                  StateCategory.map((state,index)=> {
                        return (
                            <option value={state.value} key={state.value+index}>{state.label}</option>
                        )
                    })
                  }
            </select>
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
        <div id='right-side' className="mt-5 flex-2 w-full p-2">
          <h1 className='text-3xl font-semibold border-b p-2 text-slate-700'>Listing results</h1>
          <div className="flex flex-wrap gap-2 py-4 h-[calc(100vh-150px)] overflow-y-scroll w-full">
           
            { !loading && listings.length === 0 && (
              <p className='text-slate-700 text-xl '>No listing found!</p>
            )
            }
              {loading &&
                  <div className='flex justify-center text-blue-500 w-full mt-11'>
                    <ImSpinner2 className="w-8 h-8 animate-spin transition-all" />
                  </div>
              }
              {/* <div className=""> */}
                {
                  !loading && listings && listings.map((listing) => <ListingItems key={listing._id} listing={listing}/>)
                }
              {/* </div> */}
            
           </div>
        </div>
      </div>
    </div>
  );
}




// import React, { useEffect, useState } from 'react';
// import { ImSpinner2 } from 'react-icons/im';
// import { useNavigate } from 'react-router-dom';
// import ListingItems from '../components/ListingItems';

// export default function Search() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [listings, setListings] = useState([]);

//   const [sidebarData, setSidebarData] = useState({
//     searchTerm: '',
//     type: 'all',
//     stateCategory: true,
//     serviced: false,
//     sort: 'createdAt',
//     order: 'desc',
//     negotiable: false,
//   });
//   console.log('listings:', listings);

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const searchTermFromUrl = urlParams.get('searchTerm');
//     const typeFromUrl = urlParams.get('type');
//     const negotiableFromUrl = urlParams.get('negotiable');
//     const stateCategoryFromUrl = urlParams.get('stateCategory');
//     const servicedFromUrl = urlParams.get('serviced');
//     const orderFromUrl = urlParams.get('order');
//     const sortFromUrl = urlParams.get('sort');

//     setSidebarData({
//       searchTerm: searchTermFromUrl || '',
//       type: typeFromUrl || 'all',
//       negotiable: negotiableFromUrl === 'true',
//       stateCategory: stateCategoryFromUrl === 'true',
//       serviced: servicedFromUrl === 'true',
//       order: orderFromUrl || 'desc',
//       sort: sortFromUrl || 'createdAt',
//     });

//     const fetchData = async () => {
//       setLoading(true);
//       const response = await fetch(`/api/listing/get?searchTerm=${searchTermFromUrl || ''}&type=${typeFromUrl || 'all'}&negotiable=${negotiableFromUrl || 'false'}&stateCategory=${stateCategoryFromUrl || 'false'}&serviced=${servicedFromUrl || 'false'}&order=${orderFromUrl || 'desc'}&sort=${sortFromUrl || 'createdAt'}`);
//       const data = await response.json();
//       setListings(data);
//       setLoading(false);
//     };

//     fetchData();
//   }, [window.location.search]);

//   const handleChange = (e) => {
//     const { id, value, checked } = e.target;

//     if (id === 'all' || id === 'rent' || id === 'sale') {
//       setSidebarData({ ...sidebarData, type: id });
//     } else if (id === 'searchTerm') {
//       setSidebarData({ ...sidebarData, searchTerm: value });
//     } else if (id === 'serviced' || id === 'stateCategory' || id === 'negotiable') {
//       setSidebarData({ ...sidebarData, [id]: checked });
//     } else if (id === 'sort_order') {
//       const sort = value.split('_')[0] || 'createdAt';
//       const order = value.split('_')[1] || 'desc';
//       setSidebarData({ ...sidebarData, sort, order });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const urlParams = new URLSearchParams();
//     urlParams.set('searchTerm', sidebarData.searchTerm);
//     urlParams.set('type', sidebarData.type);
//     urlParams.set('negotiable', sidebarData.negotiable);
//     urlParams.set('stateCategory', sidebarData.stateCategory);
//     urlParams.set('serviced', sidebarData.serviced);
//     urlParams.set('order', sidebarData.order);
//     urlParams.set('sort', sidebarData.sort);

//     const searchQuery = urlParams.toString();
//     navigate(`/search?${searchQuery}`);
//   };

//   return (
//     <div className='container mx-auto p-4'>
//       <div className="flex flex-col md:flex-row md:min-h-[calc(100vh-95px)]">
//         {/* left side */}
//         <div id='left-side' className="p-7 border-b-2 md:border-r-2 max-w-sm">
//           <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
//             <div className="flex items-center gap-2">
//               <label className='whitespace-nowrap font-semibold'>Search Term</label>
//               <input type="text" id='searchTerm'
//                 placeholder='Search...'
//                 value={sidebarData.searchTerm}
//                 onChange={handleChange}
//                 className='p-2 rounded-lg border w-full' />
//             </div>
//             <div className="flex gap-2 flex-wrap items-center">
//               <label className='font-semibold'>Type:</label>
//               <div className="flex gap-2">
//                 <input type="checkbox" id="all"
//                   checked={sidebarData.type === 'all'}
//                   onChange={handleChange}
//                   className='w-5' />
//                 <span>Rent & Sale</span>
//               </div>
//               <div className="flex gap-2">
//                 <input type="checkbox" id="rent"
//                   checked={sidebarData.type === 'rent'}
//                   onChange={handleChange}
//                   className='w-5' />
//                 <span>Rent</span>
//               </div>
//               <div className="flex gap-2">
//                 <input type="checkbox" id="sale"
//                   checked={sidebarData.type === 'sale'}
//                   onChange={handleChange}
//                   className='w-5' />
//                 <span>Sale</span>
//               </div>
//               <div className="flex gap-2">
//                 <input type="checkbox" id="negotiable"
//                   checked={sidebarData.negotiable}
//                   onChange={handleChange}
//                   className='w-5' />
//                 <span>Negotiable</span>
//               </div>
//             </div>
//             <div className="flex gap-2 flex-wrap items-center">
//               <label className='font-semibold'>Amenities:</label>
//               <div className="flex gap-2">
//                 <input type="checkbox" id="serviced"
//                   checked={sidebarData.serviced}
//                   onChange={handleChange}
//                   className='w-5' />
//                 <span>Serviced</span>
//               </div>
//             </div>
//             <div className="flex gap-2 flex-wrap items-center">
//               <label className='font-semibold'>Location:</label>
//               <div className="flex gap-2">
//                 <input type="checkbox" id="stateCategory"
//                   checked={sidebarData.stateCategory}
//                   onChange={handleChange}
//                   className='w-5' />
//                 <span>State</span>
//               </div>
//             </div>
//             <div className="flex items-center gap-2 ">
//               <label className='font-semibold'>Sort:</label>
//               <select id="sort_order"
//                 defaultValue={'createdAt_desc'}
//                 onChange={handleChange}
//                 className='border rounded-lg p-2'>
//                 <option value="discountPrice_desc">Price high-low</option>
//                 <option value="discountPrice_asc">Price low-high</option>
//                 <option value="createdAt_desc">Latest</option>
//                 <option value="createdAt_asc">Oldest</option>
//               </select>
//             </div>
//             <button className='bg-blue-700 text-white hover:bg-opacity-95 rounded-lg p-2'>
//               Search
//             </button>
//           </form>
//         </div>

//         {/* right side */}
//         <div id='right-side' className="mt-5 flex-1">
//           <h1 className='text-3xl font-semibold border-b p-2 text-slate-700'>Listing results</h1>
//           <div className="flex justify-center items-center h-[calc(100vh-150px)] bg-red-200 overflow-y-scroll w-full">
//             {!loading && listings.length === 0 && (
//               <p className='text-slate-700 text-xl'>No listing found!</p>
//             )}
//             {loading && (
//               <div className='flex justify-center text-blue-500 w-full'>
//                 <ImSpinner2 className="w-8 h-8 animate-spin transition-all" />
//               </div>
//             )}
//             {/* {
//               !loading && listings && listings.map((listing) => <ListingItems key={listing._id} listing={listing}/>)
//             }
//             */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
