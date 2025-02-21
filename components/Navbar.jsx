import React from 'react'
import { Link } from 'react-router-dom'
import { FcConferenceCall } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar(props) {
    let isLoggedIn = props.isLoggedIn
    let setIsLoggedIn = props.setIsLoggedIn
    const navigate = useNavigate();

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
        <div className='bg-[#66e0ff] m-0 p-0 w-full h-[100px]  flex items-center"'>
            <div>
                <Link to="/">
                    <FcConferenceCall />
                    <p>ConferencePoint</p>
                </Link>
            </div>
            
            <nav>
                <ul className='flex gap-3'>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About Us</Link>
                    </li>
                    <li>
                        <Link to="/services">Services</Link>
                    </li>
                    <li>
                        <Link to="/contacts">Contact Us</Link>
                    </li>
                </ul>
            </nav>

            <div>
                { !isLoggedIn &&
                    <Link to="/login">
                        <button >Login</button>
                    </Link>
                }
                { !isLoggedIn &&
                    <Link to="/signup">
                        <button>Sign Up</button>
                    </Link>
                }
                { isLoggedIn &&
                    <Link to="/">
                        <button onClick={handleLogout}
                        >Log Out</button>
                    </Link>
                }
                { isLoggedIn &&
                    <Link to="/profile">
                        <button>Profile</button>
                    </Link>
                }
            </div>
        </div>
        
    </div>
  )
}

export default Navbar
