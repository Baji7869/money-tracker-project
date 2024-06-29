// app.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Connect to MongoDB (make sure MongoDB is running on localhost)
mongoose.connect('mongodb://localhost:27017/moneytracker', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Middleware
app.set('view engine', 'ejs'); // Set EJS as the view engine
app.use(bodyParser.urlencoded({ extended: true })); // Parse application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from public directory

// Routes
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
