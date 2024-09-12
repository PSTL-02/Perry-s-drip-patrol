// DotEnV
require('dotenv').config()
// Cors
const cors = require('cors');
// Bring in Express
const express = require('express');
// mongoose:
const mongoose = require('mongoose');
// set a variable of app to run the express method
const app = express();
// set a port - listen changes on the port
const port = 4000;
// allow Cross Origin
app.use(cors());

// use json with express
app.use(express.json());

// import routes
const commentRoutes = require ('./routes/comments');

// Attach our route to our app (express)
app.use('/api/comments', commentRoutes);

// Serve static files from public/uploads



//log out path and method of each request:
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

const mongoUsername = process.env.MONGODB_USERNAME
const mongoPassword = process.env.MONGODB_PASSWORD

const mongoURI = `mongodb+srv://${mongoUsername}:${mongoPassword}@cluster0.evt4r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

// Define the home route for the backend
app.get('/', (req, res) => {
    // what happens at that route
    res.send("Hello, this is your express server!");
});

// Listen to changes
app.listen(port, () => {
    console.log(`Express server is running on http://localhost:${port}`);
});

mongoose.connect(mongoURI)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB Atlas:', err);
    });
