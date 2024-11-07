require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User')





exports.loginUser = async (req, res) => {
    try {
        
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user || !user.isAdmin) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token,user:user._id, message: 'Login successful' });

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAllUsers = async (req,res) => {
    try{

        const users = await User.find({})
        res.status(200).json({ users, message: 'fetched successful' });
    }catch(error){
        res.status(500).json({ message: 'Server error' });
    }
}

exports.deleteUser = async (req,res) => {
    try{        
        const {email} = req.query
        if(!email){
            return res.status(400).json({ message: 'Credential not matching' });
        }
        const user = await User.deleteOne({email})
        res.status(200).json({ message: 'deleted successful' });
    }catch(err){
        res.status(500).json({ message: 'Server error' });
    }
}