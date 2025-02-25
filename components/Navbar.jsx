import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import 'animate.css';
import { motion } from "framer-motion";

function Navbar(props) {
    
    let isLoggedIn = props.isLoggedIn
    let setIsLoggedIn = props.setIsLoggedIn
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        try {
        await axios.post("http://127.0.0.1:4000/api/v1/auth/logout");
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/login");
        } catch (error) {
        console.error("Logout failed:", error);
        }
    };

  return (
    <div>
        <div className='bg-[#00ccff] m-0 p-0 w-full h-[70px]  flex items-center justify-between '>
            <div className='px-10 font-bold'>
                <div className='flex items-center gap-1'>
                    <img src='/assets/03.jpg' width={35} height={35} className='rounded-full animate__animated animate__slideInDown'/>
                    <Link to="/">
                        <p className='text-white font-30 animate__animated animate__slideInLeft'>ConferencePoint</p>
                    </Link>
                </div>
            </div>
            
            <nav>
                <ul className='flex justify-center items-center gap-7 text-white font-semibold'>
                    <li className="relative transition-all duration-300 ease-out hover:scale-105 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-white hover:after:w-full">
                        <Link to="/">Home</Link>
                    </li>
                    <li  className="relative transition-all duration-300 ease-out hover:scale-105 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-white hover:after:w-full">
                        <Link to="/about">About Us</Link>
                    </li>
                    <li  className="relative transition-all duration-300 ease-out hover:scale-105 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-white hover:after:w-full">
                        <Link to="/services">Services</Link>
                    </li>
                    <li  className="relative transition-all duration-300 ease-out hover:scale-105 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-white hover:after:w-full">
                        <Link to="/contacts">Contact Us</Link>
                    </li>
                    <li className="relative transition-all duration-300 ease-out hover:scale-105 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-white hover:after:w-full">
                        <Link to="/reportAnalysis">Report Analysis</Link>
                    </li>
                </ul>
            </nav>

            <div className="relative inline-block text-left z-10">
                <div
                    className="cursor-pointer mr-20 flex justify-center"
                    onMouseEnter={() => setIsOpen(true)}
                 >
                    <FaUser className="text-white bg-[#008fb3] p-2 rounded-full w-8 h-8"/>
                </div>
                {isOpen && (
                    <motion.div  
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute flex flex-col right-0 p-1 transform -translate-x-1/4  mt-2 w-30 bg-gray-100 border border-gray-300 shadow-lg rounded-lg transition-all duration-300 ease-out text-sm text-gray-800 font-bold"
                        onMouseEnter={() => setIsOpen(true)}
                        onMouseLeave={() => setIsOpen(false)}>
                        { !isLoggedIn &&
                            <Link to="/login">
                                <button className='hover:bg-white w-full text-left p-2 rounded-lg'>Login</button>
                            </Link>
                        }
                        { !isLoggedIn &&
                            <Link to="/signup">
                                <button  className='hover:bg-white w-full text-left p-2 rounded-lg'>Sign Up</button>
                            </Link>
                        }
                        { isLoggedIn &&
                            <Link to="/">
                                <button onClick={handleLogout}
                                 className='hover:bg-white w-full text-left p-2 rounded-lg text-red-500'>Log Out</button>
                            </Link>
                        }
                        { isLoggedIn &&
                            <Link to="/profile">
                                <button  className='hover:bg-white w-full text-left p-2 rounded-lg'>Profile</button>
                            </Link>
                        }
                 </motion.div>
                )}
            </div>
            
        </div>
        
    </div>
  )
}

export default Navbar
