import React from 'react'
import { Link } from 'react-router-dom'
import { IoIosCall } from "react-icons/io";
import { IoMdMail } from "react-icons/io";
import { IoMdChatbubbles } from "react-icons/io";

function Contacts() {
  

  return (
    <div>
      <h3>How can we help?</h3>
      <div>
        <div>
          <IoMdMail />
          <p>Email Us</p>
        </div>
      </div>
      <div>
        <div>
          <IoIosCall />
          <p>Give us a call</p>
        </div>
        <p>1-800-387-3285</p>
          <Link to="">
            <p>Get billing and tech support</p>
          </Link>
          <Link to="">
            <p>Manage billing, licenses, and renewals in Your Account</p>
          </Link>
      </div>
      <div>
        <div>
          <IoMdChatbubbles />
          <p>Chat with us</p>
        </div>
        <p>Ask an Expert</p>
        <p>Get product info, login help, and live chat with an agent</p>
      </div>
    </div>
  )
}

export default Contacts
