import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {AiOutlineEye,AiOutlineEyeInvisible } from 'react-icons/ai';

function ResetPassword() {
  const { token } = useParams(); // Extract token from URL
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const[show,setShow] = useState(false)
  const[confirmShow,setConfirmShow] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("http://127.0.0.1:4000/api/v1/auth/reset-password", {
        password,
        confirmPassword,
        token,
      });

      setMessage(res.data.message);
      setTimeout(() => navigate("/login"), 3000); // Redirect to login after success
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <label>
          New Password:
          <input type={show? ('text'):('password')} value={password} onChange={(e) => setPassword(e.target.value)} required />
          <span onClick={() => setShow((old) => !old)}>
                                      {show ? (<AiOutlineEyeInvisible/>):(<AiOutlineEye/>)}
            </span>
        </label>
        <label>
          Confirm Password:
          <input type={confirmShow? ('text'):('password')} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          <span onClick={() => setConfirmShow((old) => !old)}>
                                      {confirmShow ? (<AiOutlineEyeInvisible/>):(<AiOutlineEye/>)}
                      </span>
        </label>
        <button type="submit">Reset Password</button>
      </form>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default ResetPassword;
