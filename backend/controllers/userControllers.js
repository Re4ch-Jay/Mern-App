const User = require("../Models/User")
const {isEmail, isStrongPassword} = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//create token
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: "3d"})
}

// signup user
const SIGNUP = async (req, res) =>{ 
    const {email, password} = req.body;

    try {


        // check validation email and password
        if(!email && !password) throw Error("All fields are required")
        if(!email) throw Error("Email is required");
        if(!password) throw Error("Password is required")

        
        if(!isEmail(email)) throw Error("Email must be valid");

        if(!isStrongPassword(password)) throw Error("Password must be strong");
        
        // check if the email is already existed
        const isExist = await User.findOne({email})
        if(isExist) throw Error("That email is already in used")

        // generate hash password

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt);

        // create a new user and save to db
        const user = await User.create({email, password: hash});
        const token = createToken(user._id)
        res.status(200).json({email, token})
        console.log(token);
    } catch (error) {
        console.log(error)
        res.status(400).json({error: error.message})
    }
}

// login user
const LOGIN = async (req, res) =>{
    const {email, password} = req.body;
    try {
        if(!email && !password) throw Error("All fields are required")
        if(!email) throw Error("Email is required");
        if(!password) throw Error("Password is required")

        // check if email is exist in db
        const user = await User.findOne({email})
        if(!user) throw Error("Incorrect Email")
        
        // compare if the password match the db
        const match = await bcrypt.compare(password, user.password)
        if(!match) throw Error("Incorrect Password");
        const token = createToken(user._id)
        res.status(200).json({email, token});
        console.log(token);
    }catch (error) {
        console.log(error)
        res.status(400).json({error: error.message})
    }
}


module.exports = {LOGIN, SIGNUP}