import React from 'react'
import { useState } from 'react'
import {AiOutlineEye,AiOutlineEyeInvisible } from 'react-icons/ai';
import {  useNavigate } from 'react-router-dom';
import axios from "axios";

function SignupForm({setIsLoggedIn}) {
    const navigate = useNavigate()
    const[show,setShow] = useState(false)
    const [accountType, setAccountType] = useState("user");
    const [service, setService] = useState("");
    const[confirmShow,setConfirmShow] = useState(false)
    const[formData, setFormData] = useState({
            email:"", password:"", firstName:"", lastName:"",confirmPassword:"",contact: "",company:"",sample:"",
            accountType: "user",service: "",additionalDetails: "",image: "",qualification:"",specialization:"",experience:""
        })
    const [error, setError] = useState("");
    
        const handleChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === "service") {
      setService(e.target.value);
      // Reset company and sample if service is "medical consulting"
      if (e.target.value === "medical consulting") {
        setFormData((prevData) => ({
          ...prevData,
          company: "",
          sample: "",
        }));
      }
    }
          };

      const handleAccountTypeChange = (e) => {
        const newType = e.target.value;
        setAccountType(newType);

        if (newType === "user") {
            setFormData({
              ...formData,
              accountType: newType,
              specialization: "",
              experience: "",
              qualification: "",
            });
          } else if (newType === "provider") {
            setFormData({
              ...formData,
              accountType: newType,
              service: "",
              company: "",
              sample: "",
            });
          } else if (newType === "admin") {
            setFormData({
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
              contact: "",
              accountType: newType,
              service: "",
              company: "",
              sample: "",
              specialization: "",
              experience: "",
              qualification: "",
            });
          }
        };
      
        const submitHandler = async (e) => {
            e.preventDefault();

            if (formData.password !== formData.confirmPassword) {
                setError("Passwords do not match");
                return;
              }
            
            try {
              const res = await axios.post("http://127.0.0.1:4000/api/v1/auth/signup", formData, {
                headers: { "Content-Type": "application/json" },
              });
              console.log("Signup Success:", res.data);
              if( formData.password != formData.confirmPassword){
                return;
            }
            setIsLoggedIn(true);
              navigate("/login");
            } catch (err) {
              setError(err.response?.data?.message || "Signup failed.Please try again.");
            }
          };

  return (
    <div>
        <form onSubmit={submitHandler}>
        <label className='text-sm'>
            <p className='mb-1'>First Name<sup className='text-[#ff6600] ml-1'>*</sup></p>
            <input type="text" name="firstName" placeholder="Enter First Name" onChange={handleChange} required value={formData.firstName}/>
        </label>
        <label className='text-sm'>
            <p className='mb-1'>Last Name<sup className='text-[#ff6600] ml-1'>*</sup></p>
            <input type="text" name="lastName" placeholder="Enter Last Name" onChange={handleChange} required value={formData.lastName}/>
        </label>
        <label className='text-sm'>
            <p className='mb-1'>Email Address<sup className='text-[#ff6600] ml-1'>*</sup></p>
            <input type="email" name="email" placeholder="Enter Your Email Address" onChange={handleChange} required value={formData.email}/>
        </label>
        <label className='text-sm'>
            <p className='mb-1'>Password<sup className='text-[#ff6600] ml-1'>*</sup></p>
            <input type={show? ('text'):('password')} name="password" placeholder="Enter Password" onChange={handleChange} required value={formData.password}/>
            <span onClick={() => setShow((old) => !old)}>
                            {show ? (<AiOutlineEyeInvisible/>):(<AiOutlineEye/>)}
            </span>
        </label>
        <label className='text-sm'>
            <p className='mb-1'>Confirm Password<sup className='text-[#ff6600] ml-1'>*</sup></p>
            <input type={confirmShow? ('text'):('password')} name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required value={formData.confirmPassword}/>
            <span onClick={() => setConfirmShow((old) => !old)}>
                            {confirmShow ? (<AiOutlineEyeInvisible/>):(<AiOutlineEye/>)}
            </span>
        </label>
        <label className='text-sm'>
            <p className='mb-1'>Contact No.<sup className='text-[#ff6600] ml-1'>*</sup></p>
            <input type="text" name="contact" placeholder="Enter Your Contact" onChange={handleChange} required value={formData.contact}/>
        </label>
        <label className='text-sm'>
            <p className='mb-1'>Account Type<sup className='text-[#ff6600] ml-1' value={formData.accountType}>*</sup></p>
            <select name="accountType" onChange={handleAccountTypeChange}>
                <option value="user">User</option>
                <option value="provider">Provider</option>
                <option value="admin">Admin</option>
            </select>
        </label>
        {/* Fields for Users */}
        {accountType === "user" && (
          <>
            <select name="service" onChange={handleChange} required>
              <option value="">Select Service</option>
              <option value="medical consulting">Medical Consulting</option>
              <option value="other">Other</option>
            </select>

            {/* Show Company & Sample if service is NOT "medical consulting" */}
            {service !== "medical consulting" && (
              <>
                <input type="text" name="company" placeholder="Company" onChange={handleChange} required />
                <input type="text" name="sample" placeholder="Type of Sample" onChange={handleChange} required />
              </>
            )}
          </>
        )}

        {/* Fields for Providers */}
        {accountType === "provider" && (
          <>
            <span>Specialization:</span>
                <select
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Specialization</option>
                    <option value="Medical Consultant">Medical Consultant</option>
                    <option value="Therapist">Therapist</option>
                    <option value="Researcher">Researcher</option>
                    <option value="Analyst">Analyst</option>
                </select>
            <input type="number" name="experience" placeholder="Experience (years)" onChange={handleChange} required />
            <span>Qualification:</span>
                <select
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Qualification</option>
                    <option value="BTech">BTech</option>
                    <option value="PhD">PhD</option>
                    <option value="BSc">BSc</option>
                    <option value="MSc">MSc</option>
                    <option value="MBA">MBA</option>
                    <option value="MTech">MTech</option>
                </select>
          </>
        )}
        <button type="submit">Create Account</button>
      </form>
    </div>
  )
}

export default SignupForm
