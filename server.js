require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());

// Routes
app.get('/', (req, res) => {
    res.send('hello world!');
});
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);



// Basic error handler
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({
        'message' : 'Something went wrong!',
        'error': err.message
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});