import React from 'react'
import { Link } from 'react-router-dom'
import { IoIosCall } from "react-icons/io";
import { IoMdMail } from "react-icons/io";
import { IoMdChatbubbles } from "react-icons/io";

function Contacts() {
  

  return (
    <div>
      <div className="relative w-full bg-[url('/assets/contact.jpg')] bg-cover bg-center bg-no-repeat h-[30rem] flex items-center justify-center">
        <h3 className='text-gray-100 text-6xl absolute'>How can we help?</h3>
      </div>
      <div className='mb-30 relative flex items-center justify-center gap-5 -mt-15'>
        <div className='flex flex-col bg-gray-100 w-[400px] h-[150px] py-4 px-4 rounded-md gap-2'>
          <div className='flex items-center gap-2 font-semibold'>
            <IoMdMail />
            <p>Email Us</p>
          </div>
          <p className='text-sm text-gray-700'>For urgent matters, please mention "URGENT" in the subject line, and we’ll get back to you as soon as possible!</p>
        </div>
        <div className='flex flex-col bg-gray-100 w-[400px] h-[150px] py-4 px-4 rounded-md gap-2'>
          <div className='flex items-center gap-2 font-semibold'>
            <IoIosCall />
            <p>Give us a call</p>
          </div>
          <p className='text-gray-400'>1-800-387-3285</p>
            <Link to="">
              <p className='text-sm text-blue-700 underline'>Get billing and tech support</p>
            </Link>
            <Link to="">
              <p className='text-sm text-blue-700 underline'>Manage billing, licenses, and renewals in Your Account</p>
            </Link>
        </div>
        <div className='flex flex-col bg-gray-100 w-[400px] h-[150px] py-4 px-4 rounded-md gap-2'>
          <div className='flex items-center gap-2 font-semibold'>
            <IoMdChatbubbles />
            <p>Chat with us</p>
          </div>
          <p className='text-sm text-gray-700'>Ask an Expert</p>
          <p className='text-sm text-gray-700'>Get product info, login help, and live chat with an agent</p>
        </div>
      </div>
      
    </div>
  )
}

export default Contacts
