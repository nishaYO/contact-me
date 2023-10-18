const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;

// Function to connect to the MongoDB database
const connectToMongo = () => {
  try {
    // Disable strict query mode for better compatibility
    mongoose.set("strictQuery", false);

    mongoose.connect(mongoURI);
    console.log("Connected to Mongo Successfully!");
  } catch (error) {
    console.log(error);
  }
};

// Export the connectToMongo function for use in other parts of the application
module.exports = connectToMongo;
