const express = require('express');
const axios = require('axios');
const https = require('https'); // Include https module
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 5000;
const API_BASE_URL = 'https://gajmeisoloab24.jio.com';

app.use(express.json());
app.use(cors());

// Create a new instance of https.Agent and set rejectUnauthorized to false
const httpsAgent = new https.Agent({
  rejectUnauthorized: false, // WARNING: setting to false will ignore SSL certificate errors, use with caution
});

app.all('/api/*', async (req, res) => {
  const url = `${API_BASE_URL}${req.originalUrl}`;
  try {
    const response = await axios({
      method: req.method,
      url,
      data: req.body,
      headers: { 'Content-Type': 'application/json' },
      httpsAgent, // Pass the custom https.Agent instance to Axios
    });
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
