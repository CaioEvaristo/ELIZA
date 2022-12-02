require('dotenv').config();
const router = require('./src/config/route')
const express = require('express');

// Start the webapp
const webApp = express();

// Webapp settings
webApp.use(express.urlencoded({
  extended: true
}));
webApp.use(express.json());
webApp.use(router)

// Server Port
const PORT = process.env.PORT || 5000;


// Start the server
webApp.listen(PORT, () => {
  console.log(`Server is up and running at ${PORT}`);
});
