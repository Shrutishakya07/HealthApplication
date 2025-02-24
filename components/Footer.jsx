import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa6";

function Footer() {
  

  return (
    <div className='m-0 p-0 w-full h-[270px]  flex items-center justify-center gap-45 text-white bg-gradient-to-b from-[#4ddbff] to-[#00b8e6]'>
        <div className='flex flex-col items-center max-w-[500px] '>
            <h3 className='text-[35px]'>ConferencePoint</h3>
            <p className='text-center text-sm '> Our consultation services extend across multiple domains, 
                helping businesses and researchers make data-driven decisions with confidence.</p>
            <div className='flex gap-3 py-5'>
                <Link to="https://www.facebook.com/"><FaFacebookF size={20} className='text-white '/></Link>
                <Link to="https://www.linkedin.com/company/edgene-biomed/?originalSubdomain=in"><FaLinkedinIn size={20} className='text-white'/></Link>
                <Link to="https://www.twitter.com/"><FaTwitter size={20} className='text-white'/></Link>
            </div>
            <div className='flex text-sm gap-1'>
                <p>©</p>
                <p>ConferencePoint Inc.</p>
                <p>|</p>
                <p>All rights reserved</p>
                <p>|</p>
                <p><Link to="" className='text-[#007a99] font-bold'>Terms of Use</Link></p>
                <p>|</p>
                <p><Link to=""  className='text-[#007a99] font-bold'>Privacy Policy</Link></p>
            </div>
        </div>
        <div>
            <h3 className='text-[20px] font-md'>Useful Links</h3>
            <p><Link to="/">Home</Link></p>
            <p><Link to="/about">About Us</Link></p>
            <p><Link to="/services">Services</Link></p>
            <p><Link to="/contacts">Contact Us</Link></p>
        </div>
        <div className='max-w-[200px]'>
            <h3 className='text-[20px] font-md'>Location</h3>
            <p>Headquarters</p>
            <p className='text-sm py-2'>Augusta Point, Golf Crse Rd, Parsvnath Exotica, DLF Phase 5, Sector 53, Gurugram, Haryana 122002</p>
        </div>
    </div>
  )
}

export default Footer
