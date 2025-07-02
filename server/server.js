const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  process.env.CLIENT_URL,
  'https://client-domain.com' 
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// DB connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB error:', err));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/rooms', require('./routes/room'));
app.use('/api/facilities', require('./routes/facility'));
app.use('/api/announcements', require('./routes/announcement'));
app.use('/api/foodpoll', require('./routes/foodPoll'));
app.use('/api', require('./routes/user'));
app.use('/api/complaints', require('./routes/complaint'))

// Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
