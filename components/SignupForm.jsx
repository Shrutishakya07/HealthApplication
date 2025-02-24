import React from 'react'
import { useState } from 'react'
import {AiOutlineEye,AiOutlineEyeInvisible } from 'react-icons/ai';
import {  useNavigate } from 'react-router-dom';
import axios from "axios";

function SignupForm({setIsLoggedIn}) {
    const navigate = useNavigate()
    const[show,setShow] = useState(false)
    const [accountType, setAccountType] = useState("admin");
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
        <form onSubmit={submitHandler} className='flex flex-col gap-2 w-[400px]  mt-15'>
          <div className='flex gap-3'>
            <label className='text-sm'>
                <p className='mb-1'>First Name<sup className='text-[#ff6600] ml-1'>*</sup></p>
                <input type="text" name="firstName" placeholder="Enter First Name" className='border-2 border-gray-100 w-full placeholder:text-sm' onChange={handleChange} required value={formData.firstName}/>
            </label>
            <label className='text-sm'>
                <p className='mb-1'>Last Name<sup className='text-[#ff6600] ml-1'>*</sup></p>
                <input type="text" name="lastName" placeholder="Enter Last Name" className='border-2 border-gray-100 w-full placeholder:text-sm' onChange={handleChange} required value={formData.lastName}/>
            </label>
          </div>
          <label className='text-sm'>
              <p className='mb-1'>Email Address<sup className='text-[#ff6600] ml-1'>*</sup></p>
              <input type="email" name="email" placeholder="Enter Your Email Address" className='border-2 border-gray-100 w-full placeholder:text-sm' onChange={handleChange} required value={formData.email}/>
          </label>
          <label className='text-sm'>
              <p className='mb-1'>Password<sup className='text-[#ff6600] ml-1'>*</sup></p>
              <input type={show? ('text'):('password')} name="password" placeholder="Enter Password" className='border-2 border-gray-100 w-full placeholder:text-sm' onChange={handleChange} required value={formData.password}/>
              <span onClick={() => setShow((old) => !old)} className='absolute ml-[-25px] mt-3.5 curser-pointer'>
                              {show ? (<AiOutlineEyeInvisible/>):(<AiOutlineEye/>)}
              </span>
          </label>
          <label className='text-sm'>
              <p className='mb-1'>Confirm Password<sup className='text-[#ff6600] ml-1'>*</sup></p>
              <input type={confirmShow? ('text'):('password')} name="confirmPassword" placeholder="Confirm Password" className='border-2 border-gray-100 w-full placeholder:text-sm' onChange={handleChange} required value={formData.confirmPassword}/>
              <span onClick={() => setConfirmShow((old) => !old)} className='absolute ml-[-25px] mt-3.5 curser-pointer'>
                              {confirmShow ? (<AiOutlineEyeInvisible/>):(<AiOutlineEye/>)}
              </span>
          </label>
          <label className='text-sm'>
              <p className='mb-1'>Contact No.<sup className='text-[#ff6600] ml-1'>*</sup></p>
              <input type="text" name="contact" placeholder="Enter Your Contact" className='border-2 border-gray-100 w-full placeholder:text-sm' onChange={handleChange} required value={formData.contact}/>
          </label>
          <label className='text-sm'>
              <p className='mb-1'>Account Type<sup className='text-[#ff6600] ml-1' value={formData.accountType}>*</sup></p>
              <select name="accountType"
                className=" border-2 border-gray-100 rounded-lg bg-white text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
                onChange={handleAccountTypeChange}>
                  <option value="admin">Admin</option>
                  <option value="user">Client/Patient</option>
                  <option value="provider">Consultant/Analyst/Researcher</option>
              </select>
          </label>
          {/* Fields for Users */}
          {accountType === "user" && (
            <>
              <select name="service" onChange={handleChange} required 
              className=" border-2 border-gray-100 rounded-lg bg-white text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out">
                <option value="" disabled selected className="text-gray-400">Select Service</option>
                <option value="medical consulting">Medical Consulting</option>
                <option value="other">Other</option>
              </select>

              {/* Show Company & Sample if service is NOT "medical consulting" */}
              {service !== "medical consulting" && (
                <div>
                  <input type="text" name="company" placeholder="Company/Lab" className='border-2 border-gray-100 w-full placeholder:text-sm mb-1' onChange={handleChange} required />
                  <span className='text-sm'>Sample Type:</span>
                  <select
                      className=" border-2 border-gray-100 rounded-lg bg-white text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
                      name="sample"
                      value={formData.sample}
                      onChange={handleChange}
                      required
                  >
                      <option value="" disabled selected className="text-gray-400">Select sample type</option>
                      <option value="DNA/RNA-Based Sample">DNA/RNA-Based Sample</option>
                      <option value="Protein-Based Sample">Protein-Based Sample</option>
                  </select>
                </div>
              )}
            </>
          )}

          {/* Fields for Providers */}
          {accountType === "provider" && (
            <>
              <span className='text-sm'>Specialization:</span>
                  <select
                      className=" border-2 border-gray-100 rounded-lg bg-white text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleChange}
                      required
                  >
                      <option value="" disabled selected className="text-gray-400">Select Specialization</option>
                      <option value="Medical Consultant">Medical Consultant</option>
                      <option value="Therapist">Therapist</option>
                      <option value="Researcher">Researcher</option>
                      <option value="Analyst">Analyst</option>
                  </select>
                  <div className='flex justify-between gap-1.5 items-center'>
                    <label className='text-sm'>
                      <p className='mb-1'>Experience:</p>
                      <input type="number" name="experience" placeholder="Experience (years)" className='border-2 border-gray-100 w-full placeholder:text-sm' onChange={handleChange} required />
                    </label>
                    
                    <div className='flex flex-col gap-1'>
                      <span className='text-sm'>Qualification:</span>
                        <select
                            className=" border-2 border-gray-100 rounded-lg bg-white text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
                            name="qualification"
                            value={formData.qualification}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled selected className="text-gray-400">Select Qualification</option>
                            <option value="BTech">BTech</option>
                            <option value="PhD">PhD</option>
                            <option value="BSc">BSc</option>
                            <option value="MSc">MSc</option>
                            <option value="MBA">MBA</option>
                            <option value="MTech">MTech</option>
                        </select>
                    </div>
                  </div>  
            </>
          )}
        <button type="submit" className="mt-5 relative overflow-hidden px-10 py-2.5 mx-auto font-semibold text-white bg-blue-500 border border-blue-500 rounded-3xl hover:scale-105 transition-all duration-300 ease-out"> 
          <span className="relative text-white ">Create Account</span>
        </button>

      </form>
    </div>
  )
}

export default SignupForm
