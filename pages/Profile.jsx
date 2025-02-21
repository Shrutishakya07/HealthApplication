import React , { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    <div>
        <h2>profile</h2>
        {user ? (
        <>
            <p><img src={user.image} alt='profile' width="200px"/></p>
            <p><strong>Name:</strong> {user?.firstName} {user?.lastName}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Account Type:</strong> {user?.accountType || "Not provided"}</p>

             {/* Show message if provider is awaiting approval */}
             {user?.accountType === "provider" && !user?.isApproved && (
                        <p className="text-yellow-500">Your account is awaiting approval. Please wait for admin approval.</p>
                    )}
                    {/* Show pending providers */}
                    {user?.accountType === "admin" && pendingProviders.length > 0 && (
                      <div>
                        <h3>Pending Providers</h3>
                        <ul>
                          {pendingProviders.map(provider => (
                            <li key={provider._id}>
                              <p><strong>Name:</strong> {provider.firstName} {provider.lastName}</p>
                              <p><strong>Email:</strong> {provider.email}</p>
                              <p><strong>Qualification:</strong> {provider.additionalDetails?.qualification || "Not provided"}</p>
                              <p><strong>Specialization:</strong>{provider.additionalDetails?.specialization || "Not provided"}</p>
                              <p><strong>Experience:</strong>{provider.additionalDetails?.experience ? `${provider.additionalDetails.experience} years` : "Not provided"}</p>
                              {/* Add other provider details as needed */}
                              <button onClick={() => handleApprove(provider._id)}>Approve Provider</button>
                              <button onClick={() => handleReject(provider._id)}>Reject Provider</button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
        </>
      ) : (
        <p>Loading user data...</p>
      )}

    {profile && (
    <>
        <p><strong>Gender:</strong> {profile?.gender || "Not provided"}</p>
        <p><strong>Phone:</strong> {profile?.phone || "Not provided"}</p>
        <p><strong>About:</strong> {profile?.about || "Not provided"}</p>

        {user?.accountType === "provider" &&  (
        <>
          <p><strong>Qualification:</strong> {profile?.qualification || "Not provided"}</p>
          <p><strong>Specialization:</strong> {profile?.specialization || "Not provided"}</p>
          <p><strong>Experience:</strong> {profile?.experience ? `${profile.experience} years` : "Not provided"}</p>
        </>
       )}
       

        </>
    )}

    <button onClick={() => setShowForm(true)}>Edit Profile</button>

    {showForm && (
        <form onSubmit={handleUpdate}>
        <label className="block">
          <span>Gender:</span>
          <div>
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Male"
                                    checked={formData.gender === "Male"}
                                    onChange={handleChange}
                                />
                                Male
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Female"
                                    checked={formData.gender === "Female"}
                                    onChange={handleChange}
                                />
                                Female
                            </label>
                            <label>
                                <input
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
        <label className="block">
          <span>Phone:</span>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange}/>
        </label>
        <label className="block">
          <span>About:</span>
          <textarea name="about" value={formData.about} onChange={handleChange}></textarea>
        </label>

        {user?.accountType === "provider" && (
          <>
            <label>
              <span>Qualification:</span>
              <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} />
            </label>
            <label>
              <span>Specialization:</span>
              <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} />
            </label>
            <label>
              <span>Experience (years):</span>
              <input type="number" name="experience" value={formData.experience} onChange={handleChange} />
            </label>
          </>
        )}

        <button type="submit">Update Profile</button>
        </form>
    )}
        <button >Make an Appointment</button>
        <button onClick={handleDelete}>Delete Account</button>
    </div>
  )
}

export default Profile
