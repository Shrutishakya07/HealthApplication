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
          if (res.data.userType === "provider" && !res.data.isApproved) {
            // Handle the case where the provider is awaiting approval
            alert("Your account is pending approval. Please wait.");
            navigate("/login"); // Redirect to login page or an awaiting approval page
            return;
          }
          setIsLoggedIn(true);
          navigate("/profile");
        } catch (err) {
            if (err.response?.status === 403) {
                alert(err.response?.data?.message || "Your account is pending approval. Please wait.");
            } else if (err.response?.status === 404) {
                // This is where you handle the case where the user is not found
                setError("You need to create an account before logging in.");
            } else {
                setError(err.response?.data?.message || "Login failed");
            }
        }
      };

    return (
        <form onSubmit={submitHandler} className='flex flex-col gap-2 w-[400px]  mt-15'>
            <label className='text-sm'>
                <p className='mb-1'>Email Address<sup className='text-[#ff6600] ml-1'>*</sup></p>
                <input
                    className='border-2 border-gray-100 w-full'
                    type='email'
                    required
                    value={formData.email}
                    placeholder='Enter Email Id'
                    onChange={handleChange}
                    name='email'
                />
            </label>
            <label className='text-sm relative'>
                <p className='mb-1'>Password<sup className='text-[#ff6600] ml-1'>*</sup></p>
                <input 
                    className='border-2 border-gray-100 w-full '
                    type={show? ('text'):('password')}
                    required
                    value={formData.password}
                    placeholder='Enter your password'
                    onChange={handleChange}
                    name='password'
                />
                <span onClick={() => setShow((old) => !old)} className='absolute ml-[-25px] mt-3.5 curser-pointer'>
                    {show ? (<AiOutlineEyeInvisible/>):(<AiOutlineEye/>)}
                </span>
                <Link to="/forgot-password">
                    <p className='text-red-600 text-xs text-right tracking-wide'> Forgot Password?</p>
                </Link>
            </label>
            <button type="submit" className="mt-5 relative overflow-hidden px-10 py-2.5 mx-auto font-semibold text-white bg-blue-500 border border-blue-500 rounded-3xl hover:scale-105 transition-all duration-300 ease-out">
                <span className="relative text-white ">Sign In</span>
            </button>
        </form>
    )
}

export default LoginForm
