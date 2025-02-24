import React from 'react'
import SignupForm from '../components/SignupForm'
import { Link } from 'react-router-dom'
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function Signup({setIsLoggedIn}) {
  

  return (
    <div className='flex items-center justify-center ml-55 mt-15 mb-30'>
      <div className="flex flex-col justify-center items-center">
        <h3 className='w-[400px] text-center text-sm text-gray-900'>Create your account to access expert medical consultation and advanced bioinformatics services.</h3>
        <SignupForm setIsLoggedIn={setIsLoggedIn}/>
        <p className='mt-10'>Already have an account?</p>
        <p><span><Link to="/login" className='font-bold text-[#00a3cc] mr-1'>Login</Link></span>here and continue your journey!</p>
      </div>
      <DotLottieReact src="https://lottie.host/d6eb856d-b5ad-488c-91bc-a24abad0e29e/Xxo9X0cxdR.lottie" 
      background="transparent" 
      speed="1" 
      style={{ width: "65rem", height: "45rem" }}
      loop 
      autoplay/>
    </div>
  )
} 

export default Signup
