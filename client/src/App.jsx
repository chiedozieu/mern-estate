import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Header from './components/Header'
import SignUp from './pages/SignUp'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute'
import CreateListing from './pages/CreateListing'
import UpdateListing from './pages/UpdateListing'
import Listing from './pages/Listing'
import Search from './pages/Search'
import Footer from './components/Footer'
import About from './pages/About'


const App = () => {
  return (
    
      <BrowserRouter>
      <ToastContainer />
      <Header />
       <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/sign-up' element={<SignUp />}/>
          <Route path='/listing/:listingId' element={<Listing />}/>
          <Route path='/search' element={<Search />}/>
          <Route path='/about' element={<About />}/>
          <Route element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />}/>
            <Route path='/create-listing' element={<CreateListing />}/>
            <Route path='/update-listing/:listingId' element={<UpdateListing />}/>
          </Route>
       </Routes>
       <Footer />
      </BrowserRouter>
    
  )
}

export default App