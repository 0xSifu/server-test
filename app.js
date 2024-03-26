'use strict';

const express = require('express');
const app = express();
const connectDatabase = require('./config/db');
const port = process.env.PORT || 3000;

connectDatabase()
    .then(() => {
        const server = app.listen(port, () => {
            console.log('Express server started. Listening on port', port);
        });
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    });

app.set('view engine', 'ejs');

app.use('/', require('./routes/profile')());

