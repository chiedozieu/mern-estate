import React, { useEffect, useState } from 'react';
import displayNGNCurrency from '../utils/Naira';
import { LuImagePlus } from "react-icons/lu";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { toast } from 'react-toastify';
import { MdCancel } from "react-icons/md";
import { IoCloudUploadOutline } from "react-icons/io5";
import { ImSpinner2 } from "react-icons/im";
import { useSelector } from 'react-redux';
import StateCategory from '../utils/StatesCategory';
import {useNavigate} from 'react-router-dom'

export default function CreateListing() {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    address: '',
    stateCategory: '',
    description: '',
    negotiable: false,
    discountPrice: 0,
    bathrooms: 0,
    bedrooms: 0,
    serviced: false,
    type: 'land',
    agreementType: 'rent',
  });
  

  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploadImageLoading, setUploadImageLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate()

  const handleImageSubmit = async () => {
    const totalImages = files.length + formData.imageUrls.length;
    if (totalImages < 2) {
      toast.error('You have to upload a minimum of 2 images');
    } else if (totalImages > 4) {
      toast.error('You cannot upload more than 4 images');
    } else if (totalImages >= 2 && totalImages <= 4) {
      const promises = [];
      setUploadImageLoading(true);
      setImageUploadError(false )
      try {
        for (let i = 0; i < files.length; i++) {
          promises.push(storeImage(files[i]));
        }
        const urls = await Promise.all(promises);
        setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) });
        setFiles([]);
        setPreviews([]);
         
        toast.success('Image uploaded successfully');
        setUploadImageLoading(false);
      } catch (err) {
        toast.error('Image upload error (2mb max per image)');
        setUploadImageLoading(false);
      }
    }
  };

  // useEffect(() => {
  //   handleImageSubmit()
  // }, [files])

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
          // console.log(`Uploading ${progress}% done`);
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
  const isWrongImageNumber = totalImages < 2 || totalImages > 4;

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    if (id === 'sale' || id === 'rent') {
      setFormData({
        ...formData,
        agreementType: id
      });
    } else if (id === 'building' || id === 'land') {
      setFormData({
        ...formData,
        type: id,
      });
    } else if (id === 'serviced') {
      setFormData({
        ...formData,
        serviced: checked
      });
    } else if (id === 'negotiable') {
      setFormData({
        ...formData,
        negotiable: checked
      }); 
    } else if (type === 'number') {
      setFormData({
        ...formData,
        [id]: value
      });
   
    } else {
      setFormData({
        ...formData,
        [id]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.imageUrls.length < 2 || formData.imageUrls.length > 4) {
      return toast.error('Please upload 2 - 4 images');     
    }

    try {
      
      setLoading(true);
      setError(false);
      const response = await fetch('/api/listing/create', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser?.rest._id
        })
      });
      const data = await response.json();
      
      if (data.success === false) {       
        setError(toast.error(data.message));
        setLoading(false);
      }
      navigate(`/listing/${data._id}`); 
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className='container mx-auto p-4'>
      <h1 className='bg-blue-500 my-7 text-3xl max-w-sm text-center mx-auto p-4 font-extrabold text-white'>Create Listing</h1>
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
        <div className="flex flex-col gap-4 flex-1">
          <input id='name'
            onChange={handleChange}
            value={formData.name}
            type="text"
            placeholder='Title'
            maxLength='62'
            minLength='10'
            className='border p-3 rounded-lg'
            required />
          <textarea id='description'
            placeholder='Description'
            onChange={handleChange}
            value={formData.description}
            className='border p-3 rounded-lg'
            required />
          <input id='address'
            type="text"
            placeholder='Address'
            onChange={handleChange}
            value={formData.address}
            className='border p-3 rounded-lg'
            required />

          <div className="">
            <select required value={formData.stateCategory} id="stateCategory" className="p-3 bg-white rounder rounded-lg" onChange={handleChange}>
            <option value= {''}>Select State</option>
                  {
                    StateCategory.map((state,index)=> {
                        return (
                            <option value={state.value} key={state.value+index}>{state.label}</option>
                        )
                    })
                  }
            </select>
          </div>

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox"
                id='sale'
                onChange={handleChange}
                checked={formData.agreementType === 'sale'}
                className='w-5' />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox"
                id='rent'
                onChange={handleChange}
                checked={formData.agreementType === 'rent'}
                className='w-5' />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox"
                id='serviced'
                onChange={handleChange}
                checked={formData.serviced}
                className='w-5' />
              <span>Serviced</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox"
                id='building'
                onChange={handleChange}
                checked={formData.type === 'building'}
                className='w-5' />
              <span>Building Property</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox"
                id='land'
                onChange={handleChange}
                checked={formData.type === 'land'}
                className='w-5' />
              <span>Land & Plots</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox"
                id='negotiable'
                onChange={handleChange}
                checked={formData.negotiable}
                className='w-5' />
              <span>Negotiable</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex gap-2 items-center">
              <input type="number"
                id='bedrooms'
                min='0'
                // max='10'
                onChange={handleChange}
                value={formData.bedrooms}
                className='p-3 border rounded-lg border-gray-300' />
              <p>Beds</p>
            </div>
            <div className="flex gap-2 items-center">
              <input type="number"
                id='bathrooms'
                min='0'
                // max='10'
                onChange={handleChange}
                value={formData.bathrooms}
                className='p-3 border rounded-lg border-gray-300' />
              <p>Baths</p>
            </div>
          </div>
          
            <div className="flex gap-2 items-center">
              <input type="number"
                id='discountPrice'
                min={0}
                onChange={handleChange}
                value={formData.discountPrice}
                className='p-3 border rounded-lg border-gray-300' />
                <div className="flex flex-col items-center">
                  <p>Discounted Price</p>
                  <span className='text-xs'>{displayNGNCurrency(formData.discountPrice)}/Year</span>
                </div>
            </div>                           

        </div>
{/*  2nd col */}
        <div className="flex flex-col flex-1">
          <p className='font-semibold'>Images: <span className='font-extralight text-xs text-gray-600 ml-2'>The first will be the cover (Min 2, Max 4)</span></p>
          <div className="grid gap-4">
            <div className="flex justify-between">
              <div className="w-24 h-24 relative">
                <label htmlFor="images"></label>
                <input onChange={handleFileChange} type="file" id='images' accept='image/*' multiple hidden className='hidden' />
                <label htmlFor="images">
                  <div className="bg-blue-200 w-full h-full flex items-center justify-center gap-1 text-3xl cursor-pointer rounded-lg">
                    <div className='flex flex-col items-center text-blue-700'>
                      <LuImagePlus className=' hover:scale-110 transition-all ' />
                      <div className='text-xs'>Choose files</div>
                    </div>
                    <p className='text-xs flex items-center justify-center rounded-full bg-blue-500 text-white w-5 h-5 absolute top-0 right-0'>{files.length}</p>
                  </div>
                </label>
              </div>
              {uploadImageLoading ? (
                <button
                  type="button"
                  className="h-24 w-24 flex items-center justify-center text-sm bg-blue-500 text-white rounded-lg cursor-pointer animate-pulse transition-all"
                >
                  <IoCloudUploadOutline className="w-6 h-6 animate-ping transition-all" />
                </button>
              ) : (
                <button
                  onClick={isWrongImageNumber ? handleDisabledClick : handleImageSubmit}
                  className={`h-24 w-24 text-sm ${isWrongImageNumber ? 'bg-red-200 text-red-700' : 'bg-blue-200 text-blue-700 hover:text-base cursor-pointer'} transition-all rounded-lg p-1`}
                  type='button'
                  disabled={isWrongImageNumber}
                >
                  Upload Image
                </button>
              )}
            </div>
            <div className="flex flex-wrap items-center justify-normal gap-2">
              {previews.map((preview, index) => (
                <div key={index + preview} className="relative w-24 h-24">
                  <img src={preview} alt={`preview-${index}`} className='object-cover w-full h-full rounded-lg' />
                  <MdCancel onClick={() => removeImage(index)} className='absolute top-0 right-0 text-red-400 cursor-pointer bg-gray-50 rounded-full' />
                </div>
              ))}
            </div>
            <div className="">
              {loading ? (
                <div className='flex items-center justify-center text-blue-500'>
                  <ImSpinner2 className="w-8 h-8 animate-spin transition-all" />
                </div>
              ) : (
                <button className='p-2 border-2 border-blue-700 text-blue-700 w-full rounded-lg hover:bg-blue-700 hover:text-white'>
                  Create Listing
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}



