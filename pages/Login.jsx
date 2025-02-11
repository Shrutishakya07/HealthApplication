import React from 'react'
import LoginForm from '../components/LoginForm'
import { Link } from 'react-router-dom'

function Login({setIsLoggedIn}) {
  
  return (
    <div>
        <h2>Login</h2>
        <LoginForm setIsLoggedIn={setIsLoggedIn}/>
        <p>Don't have an account? <Link to="/signup">Signup</Link></p>
    </div>
  )
}

export default Login
