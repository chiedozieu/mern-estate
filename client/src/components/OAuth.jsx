import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase';
import {useDispatch} from 'react-redux'
import {signInSuccess} from '../redux/user/userSlice.js'
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

const handleGoogleClick = async () => {
    try {
        const provider = new GoogleAuthProvider()
        const auth = getAuth(app)

        const result = await signInWithPopup(auth, provider)
        //console.log('result: ', result)
        const response = await fetch('/api/auth/google', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            name: result.user.displayName, 
            email: result.user.email,
            photo: result.user.photoURL,
          })
        })
        const data = await response.json()
        dispatch(signInSuccess(data))
        navigate('/')
    } catch (error) {
        console.log('Could not sign in with Google')
    }
}

  return (
    <div>
         <button onClick={handleGoogleClick} disabled={loading} type="button" className="p-2 w-full border-red-700 hover:bg-red-700 border-2 cursor-pointer hover:text-white text-md rounded-lg disabled:opacity-80 flex items-center justify-center gap-3">
         <div>
            {loading ? (<FcGoogle className="text-lg animate-spin transition-all"/>) : (<FcGoogle className="text-lg"/>)}
        </div>{loading ? (<div className='animate-pulse transition-all'>Google</div>) : ('Sign in with Google')}
        </button>
    </div>
  )
}

