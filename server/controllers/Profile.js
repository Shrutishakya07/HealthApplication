const Profile = require('../models/Profile')
const User = require('../models/User')
const Provider = require('../models/Provider')

exports.updateProfile = async(req,res,) => {
    try{
        const {gender, phone, about, qualification, specialization, experience }= req.body
        const id = req.user?.id
        if(!id){
            return res.status(400).json({success:false,message: 'User not found'})
        }
        console.log(" User from Token:", req.user);
        console.log("Received Update Fields:", { gender, phone, about, qualification, specialization, experience });
        if(!gender || !phone ){
            return res.status(400).json({message: 'All fields are required'})
        }
        console.log(" Extracted User ID from Token:", id);

        let userDetails = await User.findById(id)
        if (!userDetails) {
            userDetails = await Provider.findById(id);  // Check for provider if not a user
        }
        if(!userDetails){
            return res.status(404).json({success:false,message: 'User not found'})
        }
        console.log("User/Provider Found:", userDetails);

        const profileId = userDetails.additionalDetails
        if(!profileId){
            return res.status(400).json({success:false,message: 'User profile not found'})
        }
        
        const profileDetails = await Profile.findById(profileId)
        if (!profileDetails) {
            return res.status(404).json({ success: false, message: "Profile not found" });
        }
        console.log(" Profile Details Before Update:", profileDetails);
        profileDetails.gender = gender || profileDetails.gender;
        profileDetails.phone = phone || profileDetails.phone;
        profileDetails.about = about || profileDetails.about;

        if (userDetails instanceof Provider) {
            console.log("Updating Provider-Specific Fields:", { qualification, specialization, experience });

            profileDetails.qualification = qualification || profileDetails.qualification;
            profileDetails.specialization = specialization || profileDetails.specialization;
            profileDetails.experience = experience !== undefined ? experience : profileDetails.experience;
          }

        await profileDetails.save()

        return res.status(200).json({
            success:true,
            message: 'Profile Updated Successfully',
            profile:profileDetails
        })
    }
    catch(err){
        console.error(err)
        res.status(500).json({success:false,message: 'Server Error'})
    }
}

exports.deleteAccount = async(req,res) => {
    try{
        const id = req.user.id
        if (!id) {
            return res.status(401).json({ success: false, message: "Unauthorized: User ID not found" });
        }

        let userDetails = await User.findById(id)
        if (!userDetails) {
            userDetails = await Provider.findById(id);  // Check for provider if not a user
        }
        if(!userDetails){
            return res.status(404).json({success:false,message: 'User not found'})
        }

       // Delete associated profile (if it exists)
       if (userDetails.additionalDetails) {
        await Profile.findByIdAndDelete(userDetails.additionalDetails);
    }
        if (userDetails instanceof User) {
            await User.findByIdAndDelete(id);
        } else if (userDetails instanceof Provider) {
            await Provider.findByIdAndDelete(id);
        }
        return res.status(200).json({success:true,message: 'Account deleted successfully'})
    }
    catch(err){
        console.error(err)
        res.status(500).json({success:false,message: 'Server Error'})
    }
}

exports.getProfile = async(req,res) => {
    try{
        const id = req.user.id
        if (!id) {
            return res.status(401).json({ success: false, message: "Unauthorized: User ID not found" });
        }
        let userDetails = await User.findById(id).populate('additionalDetails').exec();
        if (!userDetails) {
            userDetails = await Provider.findById(id).populate('additionalDetails').exec(); // Check for provider if not found in user
        }
        
        if(!userDetails){
            return res.status(404).json({success:false,message: 'User not found'})
        }
        console.log("Retrieved User Details:", userDetails);

        const profileData = {
            ...userDetails.additionalDetails.toObject(),
            qualification: userDetails.additionalDetails?.qualification || "",
            specialization: userDetails.additionalDetails?.specialization || "",
            experience: userDetails.additionalDetails?.experience || 0,
          };

        return res.status(200).json({
            success:true, 
            message:'user details fetched successfully',
            user: { ...userDetails.toObject(), additionalDetails: profileData },    
        })
    }
    catch(err){
        console.error(err)
        res.status(500).json({success:false,message: 'Server Error'})
    }
}
