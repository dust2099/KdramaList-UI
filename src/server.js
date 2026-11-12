// server.js
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Adjust this to your frontend's URL
    credentials: true, // Allow cookies to be sent
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});