const { oauth2Client, SCOPES } = require('../config/google');
const { generateToken } = require('../utils/jwt');
const User = require('../models/User');
const { google } = require('googleapis');
const bcrypt = require('bcrypt');
const { z } = require('zod');

const saltRounds = 10;

const signupSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    address: z.string().min(1, 'Address is required'),
    bio: z.string().optional(),
    profilePicture: z.string().optional(),
});


exports.googleAuth = (req, res) => {
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
        prompt: 'consent'
    });
    res.redirect(authUrl);
};

exports.googleCallback = async (req, res, next) => {
    try {
        const code = req.query.code;
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
        
        // Get user profile info
        const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
        const { data } = await oauth2.userinfo.get();

        // Find or create user in MongoDB
        let user = await User.findOne({ email: data.email });
        if (!user) {
            user = new User({
                googleId: data.id,
                email: data.email,
                name: data.name,
                profilePicture: data.picture,
                address: 'Not provided',
                provider: "google"
            });
        }
        await user.save();

        // Generate JWT and set in HTTP-only cookie
        const payload = {
            id: user._id.toString(), 
            email: user.email
        };
        const jwtToken = generateToken(payload);
        res.cookie('token', jwtToken, {httpOnly: true});
        res.redirect('/api/profile/');  
    } catch(error) {
        next(error);
    }
};

exports.signup = async (req, res, next) => {
    try {
        const parsedData = signupSchema.parse(req.body);
        const { name, email, password, address, bio, profilePicture} = parsedData;

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        let user = await User.findOne({ email});
        if (user) {
            return res.json({message: 'User already exists.'});
        }
        user = new User({ 
            name, 
            email, 
            password: hashedPassword,
            address, 
            bio, 
            profilePicture
        });
        await user.save(); 
        res.status(201).json({message: 'User signup successful.'});
    } catch(error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials. '});
        }

        // Generate JWT and set in HTTP-only cookie
        const payload = {
            id: user._id.toString(), 
            email: user.email
        };
        const jwtToken = generateToken(payload);
        res.cookie('token', jwtToken, {httpOnly: true});
        res.redirect('/api/profile/'); 
    } catch(error) {
        next(error);
    }
};


