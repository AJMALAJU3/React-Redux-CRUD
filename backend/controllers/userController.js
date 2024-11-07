require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User')


exports.registerUser = async (req, res) => {
    try {
        const { name, email, password ,phone} = req.body;
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: 'User already registered with this email',status:false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phone
        });
        await newUser.save();
        res.status(200).json({ message: 'User registered successfully',status:true });

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


exports.loginUser = async (req, res) => {
    try {
        
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token,email, message: 'Login successful' });

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getUserData = async (req,res) => {
    try{
        const {email} = req.body
        if(!email){
            return
        }
        console.log(email,'email')
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({ message: 'Invalid email' });
        }
        res.status(200).json({ user, message: 'fetched successfull' });

    }catch(error){
        res.status(500).json({ message: 'Server error' });
    }
}

exports.editUserData = async (req, res) => {
    try {
        const { email, phone, name, image } = req.body;
        console.log(req.body, 'db'); 
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        const updatedUser = await User.updateOne(
            { email: email },
            { $set: { phone, name, image } }
        );

        res.status(200).json({ updatedUser, message: 'Updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};