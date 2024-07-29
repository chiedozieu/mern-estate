import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'


export default function ContactOwner({listing}) {
const [owner, setOwner] = useState(null)
const [message, setMessage] = useState('')

console.log('message', message)

useEffect(()=>{
  const fetchOwner = async () => {
    try {      
      const response = await  fetch(`/api/user/${listing.userRef}`)
      const data = await response.json()
      setOwner(data)
    } catch (error) {
      console.log(error.message)
    }
  }
  fetchOwner()

},[listing.userRef])

const handleChange = (e) => {
 setMessage(e.target.value)
}

  return (
    <div>
        {
          owner && (
            <div className="flex flex-col gap-2">
              <p>
                Contact <span className='font-semibold'>{owner.username}</span> for 
                <span className='font-semibold'> {listing.name}</span>
              </p>
              <textarea onChange={handleChange} 
                        name="message" id="message"
                        placeholder='Enter your message...' 
                        className='w-full border rounded-lg p-3'
                        rows={2} value={message}>               
              </textarea>
              <Link to={`mailto:${owner.email}?subject=Regarding ${listing.name}&body=${message}`} 
                    className='bg-slate-700 rounded p-2 hover:opacity-95 text-white text-center'>
                    Send 

              </Link>
            </div>
          )
        }
    </div>
  )
}
