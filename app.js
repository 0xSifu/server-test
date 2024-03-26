'use strict';

const express = require('express');
const app = express();
const connectDatabase = require('./config/db');
const port = process.env.PORT || 3000;

// Call the connectDatabase function
connectDatabase()
    .then(() => {
        // MongoDB connected successfully, start the server
        const server = app.listen(port, () => {
            console.log('Express server started. Listening on port', port);
        });
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1); // Exit the process with an error status
    });

// set the view engine to ejs
app.set('view engine', 'ejs');

// routes
app.use('/', require('./routes/profile')());

