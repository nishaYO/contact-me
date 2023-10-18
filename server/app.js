const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

// Connect to the MongoDB database
connectToMongo();

const app = express();
const port = 5000;

app.use(cors());

app.use(express.json());

// Import and use the contact routes
app.use('/', require('./routes/contact'));

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`App backend listening at http://localhost:${port}`);
});
