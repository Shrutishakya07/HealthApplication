import React, { useState } from "react";
import axios from "axios";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";


function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axios.post("http://127.0.0.1:4000/api/v1/auth/forgot-password", { email });
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className='flex items-center justify-between max-w-[800px] mx-auto mt-15 mb-30'>
      <div className="flex flex-col gap-5">
        <h2 className='w-[400px] text-lg text-gray-900'>Forgot Your Password</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-[350px]">
          <label className='text-sm'>
            <p className=" mb-2">Enter your Email:</p>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className='border-2 border-gray-100 w-full'/>
          </label>
          <button type="submit" className="text-right mt-5 relative overflow-hidden px-10 py-2.5 mx-auto font-semibold text-white bg-blue-500 border border-blue-500 rounded-3xl hover:scale-105 transition-all duration-300 ease-out">
            <span className="relative text-white ">Send Reset Link</span>
          </button>
        </form>
      </div>
      <DotLottieReact 
        src="https://lottie.host/2a703e32-8328-412f-8390-d38df162011c/i2jwBIJLzU.lottie" 
        background="transparent" 
        speed="1" 
        style={{ width: '300px', height: '300px' }}
        loop
        autoplay/>
              
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default ForgotPassword;
