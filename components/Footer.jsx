import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa6";

function Footer() {
  

  return (
    <div>
        <div>
            <h3>ConferencePoint</h3>
            <p> Our consultation services extend across multiple domains, 
                helping businesses and researchers make data-driven decisions with confidence.</p>
            <div>
                <Link to="https://www.facebook.com/"><FaFacebookF /></Link>
                <Link to="https://www.linkedin.com/company/edgene-biomed/?originalSubdomain=in"><FaLinkedinIn/></Link>
                <Link to="https://www.twitter.com/"><FaTwitter /></Link>
            </div>
            <div className='flex'>
                <p>©</p>
                <p>ConferencePoint Inc.</p>
                <p>|</p>
                <p>All rights reserved</p>
                <p>|</p>
                <Link to=""><p>Privacy Policy</p></Link>
            </div>
        </div>
        <div>
            <h3>Useful Links</h3>
            <p>Home</p>
            <p>About Us</p>
            <p>Services</p>
            <p>Services</p>
        </div>
        <div>
            <h3>Location</h3>
            <p>Headquarters</p>
            <p>Augusta Point, Golf Crse Rd, Parsvnath Exotica, DLF Phase 5, Sector 53, Gurugram, Haryana 122002</p>
        </div>
    </div>
  )
}

export default Footer
