import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Profile from './pages/Profile'

const App = () => {
  return (
    <BrowserRouter>
     <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/logout' element={<Logout />}/>
        <Route path='/profile' element={<Profile />}/>
         
     </Routes>
    </BrowserRouter>
  )
}

export default App