import React , { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function Profile({ setIsLoggedIn }) {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [user, setUser] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [pendingProviders, setPendingProviders] = useState([]);
    const [formData, setFormData] = useState({
        gender: "",
        phone: "",
        about: "",
        qualification: "",
        specialization: "",
        experience: "",
    });
  
    const navigate = useNavigate();

    // Fetch User Profile
  useEffect(() => {
    const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
          }
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:4000/api/v1/profile/getProfile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
        setProfile(res.data.user.additionalDetails || {});
        setFormData({
          gender: res.data.user.additionalDetails?.gender || "",
          phone: res.data.user.additionalDetails?.phone || "",
          about: res.data.user.additionalDetails?.about || "",
          qualification: res.data.user.additionalDetails?.qualification || "",
          specialization: res.data.user.additionalDetails?.specialization || "",
          experience: res.data.user.additionalDetails?.experience || "",
        });
         // Fetch pending providers only if the user is an admin
      if (res.data.user.accountType === "admin") {
        const pendingProvidersRes = await axios.get(
          "http://127.0.0.1:4000/api/v1/admin/providers/pending-providers",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Set the pending providers to state
        setPendingProviders(pendingProvidersRes.data.providers);
      }
        console.log(" Profile State After Fetch:", res.data.user.additionalDetails);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Update Profile
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token);  // Log token to verify it's being retrieved
       // Log formData to ensure the correct data is being sent
      console.log("Sending form data:", formData);
      const res = await axios.put("http://127.0.0.1:4000/api/v1/profile/updateProfile", formData, {
        headers: { Authorization: `Bearer ${token}`,"Content-Type": "application/json" },
      });
      console.log(" Profile Updated Successfully:", res.data);
      alert("Profile Updated Successfully!");
      setShowForm(false);
      setProfile(res.data.profile);
        setUser((prevUser) => ({
            ...prevUser,
            accountType: prevUser.accountType || "Not provided", // Ensure `accountType` is updated
        }));

        setFormData({
            gender: res.data.profile.gender,
            phone: res.data.profile.phone,
            about: res.data.profile.about,
            qualification: res.data.profile.qualification,
            specialization: res.data.profile.specialization,
            experience: res.data.profile.experience,
        });
    } catch (err) {
      console.error("Update Error:", err);
      setError(err.response?.data?.message || "Error updating profile");
    }
  };

  // Delete Account
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete("http://127.0.0.1:4000/api/v1/profile/deleteAccount", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        alert(res.data.message || "Account Deleted Successfully!");
        setIsLoggedIn(false);
        localStorage.removeItem("token");
        navigate("/signup");
      } else {
        throw new Error(res.data.message || "Unknown error occurred");
      }
    } catch (err) {
        console.error(" Error Deleting Account:", err.response || "No response from server");
        console.error(" Full Error Details:", err);
      setError(err.response?.data?.message || "Error deleting account");
    }
  };

   // Handle approval/rejection for admin
   const handleApprove = async (providerId) => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.put(
        `http://127.0.0.1:4000/api/v1/admin/providers/${providerId}/approve`,
        {  },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Provider approved successfully!');
      // Remove approved provider from pending list
      setPendingProviders(prevProviders =>
        prevProviders.filter(provider => provider._id !== providerId)
      );
    } catch (err) {
      setError(err.response?.data?.message || 'Error approving provider');
    }
  };

  const handleReject = async (providerId) => {
    const rejectionMessage = prompt('Please provide the reason for rejection:');
    if (!rejectionMessage) {
      return alert('Rejection message is required.');
    }
    const token = localStorage.getItem('token');
    try {
      const res = await axios({
        method: "DELETE",
        url: `http://127.0.0.1:4000/api/v1/admin/providers/${providerId}/reject`,
        headers: { Authorization: `Bearer ${token}` },
        data: { rejectionMessage }  // Send rejectionMessage in `data`
    });

      alert('Provider rejected successfully!');
      // Remove rejected provider from pending list
      setPendingProviders(prevProviders =>
        prevProviders.filter(provider => provider._id !== providerId)
      );
    } catch (err) {
      setError(err.response?.data?.message || 'Error rejecting provider');
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  return (
    <div className='mt-15 mb-30 '>
        <h2 className='text-center text-xl text-gray-900'>Your Profile</h2>
        {user ? (
        <>
            <p><img src={user.image} alt='profile' width="200px" className='rounded-full mx-auto'/></p>
            <div  className=' mt-10 flex items-center justify-center gap-[30rem]'>
              <div>
                <p className='text-gray-700'><strong className=' text-red-700'>Name:</strong> {user?.firstName} {user?.lastName}</p>
                <p className='text-gray-700'><strong className=' text-red-700'>Email:</strong> {user?.email}</p>
                <p className='text-gray-700'><strong className=' text-red-700'>Account Type:</strong> {user?.accountType || "Not provided"}</p>
              </div>
              <div>
                  {profile && (
                    <>
                        <p className='text-gray-700'><strong className=' text-red-700'>Gender:</strong> {profile?.gender || "Not provided"}</p>
                        <p className='text-gray-700'><strong className=' text-red-700'>Phone:</strong> {profile?.phone || "Not provided"}</p>
                        <p className='text-gray-700'><strong className=' text-red-700'>About:</strong> {profile?.about || "Not provided"}</p>

                        {user?.accountType === "provider" &&  (
                        <>
                        <p className='text-gray-700'><strong className=' text-red-700'>Qualification:</strong> {profile?.qualification || "Not provided"}</p>
                        <p className='text-gray-700'><strong className=' text-red-700'>Specialization:</strong> {profile?.specialization || "Not provided"}</p>
                        <p className='text-gray-700'><strong className=' text-red-700'>Experience:</strong> {profile?.experience ? `${profile.experience} years` : "Not provided"}</p>
                      </>
                    )}
                    

                      </>
                  )}
              </div>
            </div>
        </>
      ) : (
        <p className='text-gray-800 text-center'>Loading user data...</p>
      )}

      <div className='flex items-center justify-center'>
          {/* Show message if provider is awaiting approval */}
          {user?.accountType === "provider" && !user?.isApproved && (
                          <p className="text-red-500">Your account is awaiting approval. Please wait for admin approval.</p>
                      )}
                      {/* Show pending providers */}
                      {user?.accountType === "admin" && pendingProviders.length > 0 && (
                        <div className='mb-10 mt-10'>
                          <h3 className='text-xl text-center mb-10'>Pending Providers</h3>
                          <ul className='grid grid-cols-2 gap-[15rem]'>
                            {pendingProviders.map(provider => (
                              <li key={provider._id} className='flex flex-col gap-2'>
                                <p className='text-gray-700'><strong className=' text-red-700'>Name:</strong> {provider.firstName} {provider.lastName}</p>
                                <p className='text-gray-700'><strong className=' text-red-700'>Email:</strong> {provider.email}</p>
                                <p className='text-gray-700'><strong className=' text-red-700'>Qualification:</strong> {provider.additionalDetails?.qualification || "Not provided"}</p>
                                <p className='text-gray-700'><strong className=' text-red-700'>Specialization:</strong>{provider.additionalDetails?.specialization || "Not provided"}</p>
                                <p className='text-gray-700'><strong className=' text-red-700'>Experience:</strong>{provider.additionalDetails?.experience ? `${provider.additionalDetails.experience} years` : "Not provided"}</p>
                                {/* Add other provider details as needed */}
                                <div className='flex gap-5 justify-right'>
                                  <button onClick={() => handleApprove(provider._id)} className='bg-green-700 py-2 px-3 text-white rounded-sm w-max'>Approve Provider</button>
                                  <button onClick={() => handleReject(provider._id)} className='bg-red-700 py-2 px-3 text-white rounded-sm w-max'>Reject Provider</button>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
      </div>

    <button onClick={() => setShowForm(true)} className='flex items-center gap-1 text-sm bg-yellow-300 py-2 px-3 font-semibold rounded-sm hover:scale-105 transition-all duration-300 ease-out mt-5 mx-[19rem]'>
      <FaEdit/>
      <span>Edit Profile</span>
    </button>
    <div className='flex mt-[-2rem]'>
          <button onClick={handleDelete} className='flex items-center gap-1 text-sm text-white bg-red-700 py-2 px-3 font-semibold rounded-sm hover:scale-105 transition-all duration-300 ease-out  ml-auto mx-[19rem]'>
            <MdDelete />
            <span>Delete Account</span>
          </button>
        </div>

    {showForm && (
        <form onSubmit={handleUpdate} className='grid grid-cols-2 items-start mt-5 place-items-center'>
        <label className="flex gap-3 items-center ">
          <span className='text-gray-700 font-semibold'>Gender:</span>
          <div className='flex gap-3 '>
                            <label className='flex gap-1'>
                                <input
                                    className="text-blue-600 border-gray-300 focus:ring-blue-500" 
                                    type="radio"
                                    name="gender"
                                    value="Male"
                                    checked={formData.gender === "Male"}
                                    onChange={handleChange}
                                />
                                Male
                            </label>
                            <label className='flex gap-1'>
                                <input
                                    className="text-blue-600 border-gray-300 focus:ring-blue-500"
                                    type="radio"
                                    name="gender"
                                    value="Female"
                                    checked={formData.gender === "Female"}
                                    onChange={handleChange}
                                />
                                Female
                            </label>
                            <label className='flex gap-1'>
                                <input
                                    className="text-blue-600 border-gray-300 focus:ring-blue-500"
                                    type="radio"
                                    name="gender"
                                    value="Other"
                                    checked={formData.gender === "Other"}
                                    onChange={handleChange}
                                />
                                Other
                            </label>
                        </div>
        </label>
        <label className="flex items-center gap-3">
          <span className='text-gray-700 font-semibold'>Phone:</span>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} className='border-b boder-gray-100 !rounded-none focus:drop-shadow-md '/>
        </label>
        <label className="flex items-center gap-3">
          <span className='text-gray-700 font-semibold'>About:</span>
          <input type="text" name="about" value={formData.about} onChange={handleChange} className='border-b boder-gray-100 !rounded-none focus:drop-shadow-md '/>
        </label>

        {user?.accountType === "provider" && (
          <>
            <label>
              <span className='text-gray-700 font-semibold'>Qualification:</span>
              <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} className='border-b boder-gray-100 !rounded-none focus:drop-shadow-md '/>
            </label>
            <label>
              <span className='text-gray-700 font-semibold'>Specialization:</span>
              <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} className='border-b boder-gray-100 !rounded-none focus:drop-shadow-md '/>
            </label>
            <label>
              <span className='text-gray-700 font-semibold'>Experience (years):</span>
              <input type="number" name="experience" value={formData.experience} onChange={handleChange} className='border-b boder-gray-100 !rounded-none focus:drop-shadow-md '/>
            </label>
          </>
        )}

        <button type="submit" className='text-sm text-white bg-blue-700 py-2 px-3 font-semibold rounded-sm hover:scale-105 transition-all duration-300 ease-out w-max mt-5 '>Update Profile</button>
        </form>
    )}
    </div>
  )
}

export default Profile
