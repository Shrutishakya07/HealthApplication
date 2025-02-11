import React from 'react'
import { useState } from 'react'
import {AiOutlineEye,AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

function LoginForm({setIsLoggedIn}) {

    const navigate = useNavigate()
    
    const[show,setShow] = useState(false)
    const[formData, setFormData] = useState({
        email:"", password:""
    })
  
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post("http://127.0.0.1:4000/api/v1/auth/login", formData);
          console.log("Login Success:", res.data);
          localStorage.setItem("token", res.data.token);
          setIsLoggedIn(true);
          navigate("/profile");
        } catch (err) {
          setError(err.response?.data?.message || "Login failed");
        }
      };

    return (
        <form onSubmit={submitHandler}>
            <label className='text-sm'>
                <p className='mb-1'>Email Address<sup className='text-[#ff6600] ml-1'>*</sup></p>
                <input
                    type='email'
                    required
                    value={formData.email}
                    placeholder='Enter Email Id'
                    onChange={handleChange}
                    name='email'
                />
            </label>
            <label className='text-sm '>
                <p className='mb-1'>Password<sup className='text-[#ff6600] ml-1'>*</sup></p>
                <input 
                    type={show? ('text'):('password')}
                    required
                    value={formData.password}
                    placeholder='Enter your password'
                    onChange={handleChange}
                    name='password'
                />
                <span onClick={() => setShow((old) => !old)}>
                    {show ? (<AiOutlineEyeInvisible/>):(<AiOutlineEye/>)}
                </span>
                <Link to="/forgot-password">
                    <p> Forgot Password</p>
                </Link>
            </label>
            <button type="submit">
                Sign In
            </button>
        </form>
    )
}

export default LoginForm
