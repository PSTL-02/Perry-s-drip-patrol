// user controller
const User = require('../models/userModel');

const jwt = require('jsonwebtoken');


// Login Function
const loginUser = async (req,res) => {
    const {email, password} = req.body

    // login in the user
    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)

        // if successful
        res.status(200).json({email, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// Signup Function
const signupUser = async (req,res) => {
    const {email, password} = req.body;

    try {
        const user = await User.signup(email, password)

        const token = createToken(user._id);

        // if successful
        res.status(200).json({email, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }

    // res.json({mssg: 'signup user'})
}

// Create a JWT
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}
// Exports
module.exports = {signupUser, loginUser}