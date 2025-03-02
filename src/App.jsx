import React from 'react'
import './App.css';
import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import Services from '../pages/Services';
import Contacts from '../pages/Contacts';
import About from '../pages/About';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import PrivateRoute from '../components/PrivateRoute';
import Footer from '../components/Footer';
import ReportAnalysis from '../pages/ReportAnalysis';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';


function App() {
  const[isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className='flex flex-col min-h-screen font-[Open_Sans]'>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>}/>
          <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />}/>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/services" element={<Services/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/contacts" element={<Contacts/>}/>
          <Route path="/profile" element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Profile setIsLoggedIn={setIsLoggedIn}/>
            </PrivateRoute>
            }/>
          <Route path='/reportAnalysis' element={<ReportAnalysis/>}/>

        </Routes>
      </main>
      <Footer className='p-4 text-center mt-auto'/>
    </div>
  )
}

export default App
