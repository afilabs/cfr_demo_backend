const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 3000; // You can change the port as needed

// Google Directions API endpoint and your API key
const apiUrl = 'https://maps.googleapis.com/maps/api/directions/json';
const apiKey = process.env.API_KEY;;

// Add headers before the routes are defined
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/directions', async (req, res) => {
  try {
    const { origin, destination, waypoints } = req.query;
    if (!origin || !destination) {
      return res.status(400).json({ error: 'Please provide both origin and destination.' });
    }

    // Make a request to the Google Directions API
    const response = await axios.get(apiUrl, {
      params: {
        origin,
        destination,
        waypoints,
        key: apiKey,
      },
    });

    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error("error");
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching directions.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
