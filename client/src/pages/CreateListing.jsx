
// import React, { useState } from 'react';
// import displayNGNCurrency from '../utils/Naira';
// import { LuImagePlus } from "react-icons/lu";
// import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
// import { app } from '../firebase';
// import { toast } from 'react-toastify';
// import { MdCancel } from "react-icons/md";
// import { IoCloudUploadOutline } from "react-icons/io5";

// export default function CreateListing() {
//   const [files, setFiles] = useState([]);
//   const [previews, setPreviews] = useState([]);
//   const [formData, setFormData] = useState({
//     imageUrls: [],
//   });
//   const [imageUploadError, setImageUploadError] = useState(false);
//   const [uploadImageLoading, setUploadImageLoading] = useState(false);

//   const handleImageSubmit = (e) => {
//     //(files.length + formData.imageUrls.length <= 4)
//     if (files.length + formData.imageUrls.length > 1 && files.length + formData.imageUrls.length <= 4) {
//       const promises = [];

//       for (let i = 0; i < files.length; i++) {
//         promises.push(storeImage(files[i]));
//       }

//       Promise.all(promises).then((urls) => {
//         setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) });
//         setFiles([]);
//         setPreviews([]);
//         setImageUploadError(false);
//       }).catch((err) => {
//         // setImageUploadError('Image upload error (2mb max per image)');
//         toast.error('Image upload error (2mb max per image)');
//         setUploadImageLoading(false);
//       });
//     } else {
//       // setImageUploadError('You can only upload 4 images');
//       toast.error('You can only upload 2 - 4 images');
//       setUploadImageLoading(false);
//       return
//     }
//   };

//   const storeImage = async (file) => {
//     return new Promise((resolve, reject) => {
//       const storage = getStorage(app);
//       const fileName = new Date().getTime() + file.name;
//       const storageRef = ref(storage, fileName);
//       const uploadTask = uploadBytesResumable(storageRef, file);

//       uploadTask.on(
//         'state_changed',
//         (snapshot) => {
//           const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           console.log(`Uploading ${progress}% done`);
//         },
//         (error) => {
//           reject(error);
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//             resolve(downloadURL);
//           });
//         }
//       );
//     });
//   };

//   const handleFileChange = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     setFiles([...files, ...selectedFiles]);
//     setPreviews([...previews, ...selectedFiles.map(file => URL.createObjectURL(file))]);
//   };

//   const removeImage = (index) => {
//     const newFiles = files.filter((_, i) => i !== index);
//     const newPreviews = previews.filter((_, i) => i !== index);
//     setFiles(newFiles);
//     setPreviews(newPreviews);
//   };

//   return (
//     <main className='container mx-auto p-4'>
//       <h1 className='bg-blue-500 my-7 text-3xl max-w-sm text-center mx-auto p-4 font-extrabold text-white'>Create Listing</h1>

//       <form className='flex flex-col sm:flex-row gap-4'>
//         <div className="flex flex-col gap-4 flex-1">
//           <input id='description' type="text" placeholder='Description...' maxLength='62' minLength='10' className='border p-3 rounded-lg' required />
//           <textarea id='address' type="text" placeholder='Name' className='border p-3 rounded-lg' required />
//           <input type="text" placeholder='Address' className='border p-3 rounded-lg' required />

//           <div className=" flex gap-6 flex-wrap">
//             <div className="flex gap-2">
//               <input type="checkbox" id='sale' className='w-5' />
//               <span>Sell</span>
//             </div>
//             <div className="flex gap-2">
//               <input type="checkbox" id='sale' className='w-5' />
//               <span>Rent</span>
//             </div>
//             <div className="flex gap-2">
//               <input type="checkbox" id='serviced' className='w-5' />
//               <span>Serviced</span>
//             </div>
//             <div className="flex gap-2">
//               <input type="checkbox" id='building' className='w-5' />
//               <span>Building Property</span>
//             </div>
//             <div className="flex gap-2">
//               <input type="checkbox" id='land' className='w-5' />
//               <span>Land & Plots</span>
//             </div>
//           </div>

//           <div className="flex flex-wrap gap-6 ">
//             <div className="flex gap-2 items-center">
//               <input type="number" id='bedrooms' min='1' max='10' className='p-3 border rounded-lg border-gray-300' />
//               <p>Beds</p>
//             </div>
//             <div className="flex gap-2 items-center">
//               <input type="number" id='bathrooms' min='1' max='10' className='p-3 border rounded-lg border-gray-300' />
//               <p>Baths</p>
//             </div>
//             <div className="flex gap-2 items-center">
//               <input type="number" id='regularPrice' min='6' className='p-3 border rounded-lg border-gray-300' />
//               <div className="flex flex-col items-center">
//                 <p>Regular Price</p>
//                 <span className='text-xs'>{displayNGNCurrency(0)}/Year</span>
//               </div>
//             </div>
//             <div className="flex gap-2 items-center">
//               <input type="number" id='discountPrice' min='6' className='p-3 border rounded-lg border-gray-300' />
//               <div className="flex flex-col items-center">
//                 <p>Discounted Price</p>
//                 <span className='text-xs'>{displayNGNCurrency(0)}/Year</span>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="flex flex-col flex-1">
//           <p className='font-semibold'>Images: <span className='font-extralight text-xs text-gray-600 ml-2'>The first will be the cover (Min 2, Max 4)</span>
//           </p>
//           <div className="grid gap-4">
//             <div className="flex justify-between">
//               <div className="w-24 h-24 relative">
//                 <label htmlFor="images"></label>
//                 <input onChange={handleFileChange} type="file" id='images' accept='image/*' multiple hidden className='hidden' />
//                 <label htmlFor="images"><div className="bg-blue-200 w-full h-full flex items-center justify-center gap-1 text-3xl cursor-pointer rounded-lg"><LuImagePlus className='text-blue-700 hover:scale-110 transition-all ' /><p className='text-xs flex items-center justify-center rounded-full bg-blue-500 text-white w-5 h-5 absolute top-0 right-0'>{files.length}</p></div>
//                 </label>
//               </div>
//                {
//                 uploadImageLoading ? (
//                     <button  type='button' className='h-24 w-24 flex items-center justify-center text-sm bg-blue-500 text-white rounded-lg cursor-pointer animate-pulse' disabled={uploadImageLoading}> 
                  
//                    <IoCloudUploadOutline className='w-6 h-6 animate-ping transition-all'/>
//                    </button>
//                 ) : (
//                   <button onClick={handleImageSubmit} type='button' className='h-24 w-24 text-sm bg-blue-200 hover:text-base transition-all text-blue-700 rounded-lg p-1 cursor-pointer'> 
                  
//                    Upload Image
//                  </button>
//                 )
//                }
//             </div>
//             <div className="flex flex-wrap items-center justify-normal gap-2">
//               {previews.map((preview, index) => (
//                 <div key={index} className="relative w-32 h-32">
//                   <img src={preview} alt={`preview-${index}`} className="w-full h-full object-cover rounded-lg" />
//                   <button
//                     type="button"
//                     onClick={() => removeImage(index)}
//                     className="absolute top-0 right-0 bg-red-500 text-white rounded-full"
//                   >
//                    <MdCancel />
//                   </button>
//                 </div>
//               ))}
//             </div>
//             <button className='p-2 border-2 border-purple-700 text-purple-700 w-full rounded-lg hover:bg-purple-700 hover:text-white disabled:opacity-80'>
//               Create Listing
//             </button>
//           </div>
//         </div>
//       </form>
//     </main>
//   );
// }


// import React, { useState } from 'react';
// import displayNGNCurrency from '../utils/Naira';
// import { LuImagePlus } from "react-icons/lu";
// import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
// import { app } from '../firebase';
// import { toast } from 'react-toastify';
// import { MdCancel } from "react-icons/md";
// import { IoCloudUploadOutline } from "react-icons/io5";

// export default function CreateListing() {
//   const [files, setFiles] = useState([]);
//   const [previews, setPreviews] = useState([]);
//   const [formData, setFormData] = useState({
//     imageUrls: [],
//   });
//   const [imageUploadError, setImageUploadError] = useState(false);
//   const [uploadImageLoading, setUploadImageLoading] = useState(false);

//   const handleImageSubmit = () => {
//     const totalImages = files.length + formData.imageUrls.length;
//     if (totalImages >= 2 && totalImages <= 4) {
//       const promises = [];

//       setUploadImageLoading(true);
//       for (let i = 0; i < files.length; i++) {
//         promises.push(storeImage(files[i]));
//       }

//       Promise.all(promises).then((urls) => {
//         setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) });
//         setFiles([]);
//         setPreviews([]);
//         setImageUploadError(false);
//         toast.success(`Image uploaded successfully`)
//         setUploadImageLoading(false);       
//       }).catch((err) => {
//         toast.error('Image upload error (2mb max per image)');
//         setUploadImageLoading(false);
        
//       });
//     } else {
//       toast.error('You can only upload 2 - 4 images');
//       setUploadImageLoading(false);
//     }
//   };

//   const storeImage = async (file) => {
//     return new Promise((resolve, reject) => {
//       const storage = getStorage(app);
//       const fileName = new Date().getTime() + file.name;
//       const storageRef = ref(storage, fileName);
//       const uploadTask = uploadBytesResumable(storageRef, file);

//       uploadTask.on(
//         'state_changed',
//         (snapshot) => {
//           const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           console.log(`Uploading ${progress}% done`);
//         },
        
//         (error) => {
//           reject(error);
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//             resolve(downloadURL);
//           });
//         }
//       );
//     });
//   };

//   const handleFileChange = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     setFiles([...files, ...selectedFiles]);
//     setPreviews([...previews, ...selectedFiles.map(file => URL.createObjectURL(file))]);
//   };

//   const removeImage = (index) => {
//     const newFiles = files.filter((_, i) => i !== index);
//     const newPreviews = previews.filter((_, i) => i !== index);
//     setFiles(newFiles);
//     setPreviews(newPreviews);
//   };

//   const handleDisabledClick = () => {
//     toast.error('You must upload between 2 - 4 images');
//   };

//   return (
//     <main className='container mx-auto p-4'>
//       <h1 className='bg-blue-500 my-7 text-3xl max-w-sm text-center mx-auto p-4 font-extrabold text-white'>Create Listing</h1>

//       <form className='flex flex-col sm:flex-row gap-4'>
//         <div className="flex flex-col gap-4 flex-1">
//           <input id='description' type="text" placeholder='Description...' maxLength='62' minLength='10' className='border p-3 rounded-lg' required />
//           <textarea id='address' type="text" placeholder='Name' className='border p-3 rounded-lg' required />
//           <input type="text" placeholder='Address' className='border p-3 rounded-lg' required />

//           <div className=" flex gap-6 flex-wrap">
//             <div className="flex gap-2">
//               <input type="checkbox" id='sale' className='w-5' />
//               <span>Sell</span>
//             </div>
//             <div className="flex gap-2">
//               <input type="checkbox" id='sale' className='w-5' />
//               <span>Rent</span>
//             </div>
//             <div className="flex gap-2">
//               <input type="checkbox" id='serviced' className='w-5' />
//               <span>Serviced</span>
//             </div>
//             <div className="flex gap-2">
//               <input type="checkbox" id='building' className='w-5' />
//               <span>Building Property</span>
//             </div>
//             <div className="flex gap-2">
//               <input type="checkbox" id='land' className='w-5' />
//               <span>Land & Plots</span>
//             </div>
//           </div>

//           <div className="flex flex-wrap gap-6 ">
//             <div className="flex gap-2 items-center">
//               <input type="number" id='bedrooms' min='1' max='10' className='p-3 border rounded-lg border-gray-300' />
//               <p>Beds</p>
//             </div>
//             <div className="flex gap-2 items-center">
//               <input type="number" id='bathrooms' min='1' max='10' className='p-3 border rounded-lg border-gray-300' />
//               <p>Baths</p>
//             </div>
//             <div className="flex gap-2 items-center">
//               <input type="number" id='regularPrice' min='6' className='p-3 border rounded-lg border-gray-300' />
//               <div className="flex flex-col items-center">
//                 <p>Regular Price</p>
//                 <span className='text-xs'>{displayNGNCurrency(0)}/Year</span>
//               </div>
//             </div>
//             <div className="flex gap-2 items-center">
//               <input type="number" id='discountPrice' min='6' className='p-3 border rounded-lg border-gray-300' />
//               <div className="flex flex-col items-center">
//                 <p>Discounted Price</p>
//                 <span className='text-xs'>{displayNGNCurrency(0)}/Year</span>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="flex flex-col flex-1">
//           <p className='font-semibold'>Images: <span className='font-extralight text-xs text-gray-600 ml-2'>The first will be the cover (Min 2, Max 4)</span>
//           </p>
//           <div className="grid gap-4">
//             <div className="flex justify-between">
//               <div className="w-24 h-24 relative">
//                 <label htmlFor="images"></label>
//                 <input onChange={handleFileChange} type="file" id='images' accept='image/*' multiple hidden className='hidden' />
//                 <label htmlFor="images"><div className="bg-blue-200 w-full h-full flex items-center justify-center gap-1 text-3xl cursor-pointer rounded-lg"><LuImagePlus className='text-blue-700 hover:scale-110 transition-all ' /><p className='text-xs flex items-center justify-center rounded-full bg-blue-500 text-white w-5 h-5 absolute top-0 right-0'>{files.length}</p></div>
//                 </label>
//               </div>
//               {
//               uploadImageLoading ? (
//                 <button
//                   type="button"
//                   className="h-24 w-24 flex items-center justify-center text-sm bg-blue-500 text-white rounded-lg cursor-pointer animate-pulse"
//                   disabled={uploadImageLoading}
//                 >
//                   <IoCloudUploadOutline className="w-6 h-6 animate-ping transition-all" />
//                 </button>
//               ) : (
//                 <button
//                   onClick={files.length + formData.imageUrls.length < 2 || files.length + formData.imageUrls.length > 4 ? handleDisabledClick : handleImageSubmit}
//                   type="button"
//                   className={`h-24 w-24 text-sm ${
//                     files.length + formData.imageUrls.length < 2 || files.length + formData.imageUrls.length > 4 ? 'bg-red-200 text-red-700' : 'bg-blue-200 text-blue-700 hover:text-base'
//                   } transition-all rounded-lg p-1 cursor-pointer`}
//                 >
//                   Upload Image
//                 </button>
//               )
//               }

//             </div>
//             <div className="flex flex-wrap items-center justify-normal gap-2">
//               {previews.map((preview, index) => (
//                 <div key={index} className="relative w-32 h-32">
//                   <img src={preview} alt={`preview-${index}`} className="w-full h-full object-cover rounded-lg" />
//                   <button
//                     type="button"
//                     onClick={() => removeImage(index)}
//                     className="absolute top-0 right-0 bg-red-500 text-white rounded-full"
//                   >
//                    <MdCancel />
//                   </button>
//                 </div>
//               ))}
//             </div>
//             <button className='p-2 border-2 border-purple-700 text-purple-700 w-full rounded-lg hover:bg-purple-700 hover:text-white disabled:opacity-80'>
//               Create Listing
//             </button>
//           </div>
//         </div>
//       </form>
//     </main>
//   );
// }


import React, { useState } from 'react';
import displayNGNCurrency from '../utils/Naira';
import { LuImagePlus } from "react-icons/lu";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { toast } from 'react-toastify';
import { MdCancel } from "react-icons/md";
import { IoCloudUploadOutline } from "react-icons/io5";

export default function CreateListing() {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploadImageLoading, setUploadImageLoading] = useState(false);

  const handleImageSubmit = () => {
    const totalImages = files.length + formData.imageUrls.length;
    if (totalImages >= 2 && totalImages <= 4) {
      const promises = [];

      setUploadImageLoading(true);
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises).then((urls) => {
        setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) });
        setFiles([]);
        setPreviews([]);
        setImageUploadError(false);
        toast.success(`Image uploaded successfully`);
        setUploadImageLoading(false);
      }).catch((err) => {
        toast.error('Image upload error (2mb max per image)');
        setUploadImageLoading(false);
      });
    } else {
      toast.error('You can only upload 2 - 4 images');
      setUploadImageLoading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Uploading ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles([...files, ...selectedFiles]);
    setPreviews([...previews, ...selectedFiles.map(file => URL.createObjectURL(file))]);
  };

  const removeImage = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    setFiles(newFiles);
    setPreviews(newPreviews);
  };

  const handleDisabledClick = () => {
    toast.error('You must upload between 2 - 4 images');
  };

  const totalImages = files.length + formData.imageUrls.length;
  const isUploadDisabled = totalImages < 2 || totalImages > 4;

  return (
    <main className='container mx-auto p-4'>
      <h1 className='bg-blue-500 my-7 text-3xl max-w-sm text-center mx-auto p-4 font-extrabold text-white'>Create Listing</h1>

      <form className='flex flex-col sm:flex-row gap-4'>
        <div className="flex flex-col gap-4 flex-1">
          <input id='description' type="text" placeholder='Description...' maxLength='62' minLength='10' className='border p-3 rounded-lg' required />
          <textarea id='address' type="text" placeholder='Name' className='border p-3 rounded-lg' required />
          <input type="text" placeholder='Address' className='border p-3 rounded-lg' required />

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
              <input type="number" id='bedrooms' min='1' max='10' className='p-3 border rounded-lg border-gray-300' />
              <p>Beds</p>
            </div>
            <div className="flex gap-2 items-center">
              <input type="number" id='bathrooms' min='1' max='10' className='p-3 border rounded-lg border-gray-300' />
              <p>Baths</p>
            </div>
            <div className="flex gap-2 items-center">
              <input type="number" id='regularPrice' min='6' className='p-3 border rounded-lg border-gray-300' />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className='text-xs'>{displayNGNCurrency(0)}/Year</span>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <input type="number" id='discountPrice' min='6' className='p-3 border rounded-lg border-gray-300' />
              <div className="flex flex-col items-center">
                <p>Discounted Price</p>
                <span className='text-xs'>{displayNGNCurrency(0)}/Year</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <p className='font-semibold'>Images: <span className='font-extralight text-xs text-gray-600 ml-2'>The first will be the cover (Min 2, Max 4)</span>
          </p>
          <div className="grid gap-4">
            <div className="flex justify-between">
              <div className="w-24 h-24 relative">
                <label htmlFor="images"></label>
                <input onChange={handleFileChange} type="file" id='images' accept='image/*' multiple hidden className='hidden' />
                <label htmlFor="images"><div className="bg-blue-200 w-full h-full flex items-center justify-center gap-1 text-3xl cursor-pointer rounded-lg"><LuImagePlus className='text-blue-700 hover:scale-110 transition-all ' /><p className='text-xs flex items-center justify-center rounded-full bg-blue-500 text-white w-5 h-5 absolute top-0 right-0'>{files.length}</p></div>
                </label>
              </div>
              {
              uploadImageLoading ? (
                <button
                  type="button"
                  className="h-24 w-24 flex items-center justify-center text-sm bg-blue-500 text-white rounded-lg cursor-pointer animate-pulse"
                  disabled={uploadImageLoading}
                >
                  <IoCloudUploadOutline className="w-6 h-6 animate-ping transition-all" />
                </button>
              ) : (
                <button
                  onClick={isUploadDisabled ? handleDisabledClick : handleImageSubmit}
                  type="button"
                  className={`h-24 w-24 text-sm ${
                    isUploadDisabled ? 'bg-red-200 text-red-700' : 'bg-blue-200 text-blue-700 hover:text-base'
                  } transition-all rounded-lg p-1 cursor-pointer`}
                >
                  Upload Image
                </button>
              )
              }
            </div>
            <div className="flex flex-wrap items-center justify-normal gap-2">
              {previews.map((preview, index) => (
                <div key={index} className="relative w-32 h-32">
                  <img src={preview} alt={`preview-${index}`} className='object-cover w-full h-full rounded-lg' />
                  <MdCancel onClick={() => removeImage(index)} className='absolute top-0 right-0 text-red-400 cursor-pointer bg-gray-50 rounded-full' />
                </div>
              ))}
            </div>
            <button className='p-2 border-2 border-purple-700 text-purple-700 w-full rounded-lg hover:bg-purple-700 hover:text-white disabled:opacity-80'>
              Create Listing
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
