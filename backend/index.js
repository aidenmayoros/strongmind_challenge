// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create an instance of Express
const app = express();

// Middleware to enable CORS
app.use(cors());

// Body parser middleware to handle JSON data
app.use(express.json());

//Aiden TODO: get the mongodb link from atlast
// MongoDB connection URI (replace with your actual MongoDB URI)
const mongoURI = 'mongodb://localhost:27017/your-database-name';

// Connect to MongoDB
mongoose.connect(mongoURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// Check MongoDB connection status
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
	console.log('Connected to MongoDB');
});

// Define a basic route for testing
app.get('/', (req, res) => {
	res.send('Hello, this is your Node.js Express backend!');
});

// Set the port for the server to listen on
const port = process.env.PORT || 5000;

// Start the server
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
