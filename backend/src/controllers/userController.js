const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs')
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const cloudinary = require('../config/cloudinary');
const sendEmailWithIcons = require('../utils/emailWithIcons');

const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, phoneNo, password } = req.body;

    // if (validate(firstName, lastName, email, phoneNo, password)) {
    // if (firstName && lastName && email && phoneNo && password) {
    //     res.status(200).json({ message: 'User registered successfully' });
    // } else {
    //     res.status(400)
    //     throw new Error('Please provide all fields');
    // } 
    if (!firstName || !lastName || !email || !phoneNo || !password) {
        res.status(400)
        throw new Error('Please provide all fields');
    }

    // check if the user exists
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ firstName, lastName, email, phoneNo, password: hashedPassword })
    if (user) {
        const profile = {
            id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, phoneNo: user.phoneNo,
            image: user.image, token: generateToken(user._id)
        }

        const props = {
            emailSubject: 'Welcome to Atendi',
            sendTo: email,
            sentFrom: process.env.EMAILUSER,
            template: 'welcomeemail',
            context: req.body
        }
        await sendEmailWithIcons(props);
        
        res.status(200).json({ success: true, message: 'User registered successfully', data: profile });
    } else {
        res.status(400);
        throw new Error('User can not be created. Please try again');
    }

})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400)
        throw new Error('Please provide all fields');
    }
    //check if user exists
    const user = await User.findOne({ email });
    
    if (!user) {
        res.status(404)
        throw new Error('User not found');
    }
    
    // check password and validate it
    const comparePassword = await bcrypt.compare(password, user.password)

    if (user && comparePassword) {
        const profile = {
            firstName: user.firstName, lastName: user.lastName,
            email: user.email, phoneNo: user.phoneNo, image: user.image, token: generateToken(user._id)
        }
        res.status(200).json({ success: true, message: 'User login successfully', data: profile });
    } else {
        res.status(400);
        throw new Error('Invalid Password');
    }

})

const getUser = asyncHandler(async (req, res) => {
    if (req.user.id) {
        const { _id, image, firstName, lastName, email, phoneNo, role, department, address, city, country } = await User.findById(req.user.id);
        const profile = { id: _id, image, firstName, lastName, email, phoneNo, role, department, address, city, country }
        res.status(200).json({ success: true, message: 'Profile retrieved successfully', data: profile });
    } else {
        res.status(401)
        throw new Error(' Token not valid')
    }
})

const updateUser = asyncHandler(async (req, res) => {
    if (!req.body) {
        res.status(400);
        throw new Error('Please provide at least a field');
    }
    if (req.user.id) {
        //fetch user
        const id = req.user.id;
        const user = await User.findById(id);
        const { firstName, lastName, email, phoneNo, image, role, department, address, city, country } = req.body;
        const data = { firstName, lastName, email, phoneNo, role, department, address, city, country }

        if (image !== '' && image != undefined) {
                const ImgId = user.image.public_id;
                if (ImgId) {
                    await cloudinary.uploader.destroy(ImgId);
                }

                const newImage = await cloudinary.uploader.upload(image, { folder: "profiles" });
                data.image = {
                    public_id: newImage.public_id,
                    url: newImage.secure_url
                }
        }

        //update user
        const updatedProfile = await User.findByIdAndUpdate(id, data, { new: true })
        const newProfile = { 
            firstName: updatedProfile.firstName, 
            lastName: updatedProfile.lastName, 
            email: updatedProfile.email, 
            phoneNo: updatedProfile.phoneNo, 
            image: updatedProfile.image, 
            role: updatedProfile.role, 
            department: updatedProfile.department,
            address: updatedProfile.address, 
            city: updatedProfile.city, 
            country: updatedProfile.country
         }
        
        res.status(200).json({ success: true, message: 'Profile updated successfully', data: newProfile });
    } else {
        res.status(401)
        throw new Error(' Token not valid')
    }
})

const logoutUser = asyncHandler(async (req, res)=>{
    //res.clearCookie('token');
    res.status(200).json({ success: true, message: "Logged out successfully"})
})

const getAllUsers = asyncHandler(async (req, res) => {
    if (req.user.id) {
        const users = await User.find().select('firstName lastName image email phoneNo role department');
        res.status(200).json({ success: true, message: 'All Users retrieved successfully', data: users });
    } else {
        res.status(401)
        throw new Error(' Token not valid') 
    }
})

const validate = (firstName, lastName, email, phoneNo, password) => {
    if (firstName && lastName && email && phoneNo && password) {
        return true;
    } else {
        return false;
    }
}

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRESIN })
}

module.exports = {
    registerUser, loginUser, getUser, updateUser, logoutUser, getAllUsers
};