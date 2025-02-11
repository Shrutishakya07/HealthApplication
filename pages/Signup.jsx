import React from 'react'
import SignupForm from '../components/SignupForm'
import { Link } from 'react-router-dom'

function Signup({setIsLoggedIn}) {
  

  return (
    <div>
        <h2>Signup</h2>
        <SignupForm setIsLoggedIn={setIsLoggedIn}/>
        <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  )
}

export default Signup
