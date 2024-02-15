const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const path = require('path');

// const allowedOrigins = ['http://localhost:3000', 'http://54.81.36.144:8080'];

// const corsOptions = {
// 	origin: function (origin, callback) {
// 		// Check if the origin is in the list of allowed origins
// 		const isAllowed = allowedOrigins.includes(origin) || !origin;
// 		callback(null, isAllowed);
// 	},
// };

// // Middleware to enable CORS
// app.use(cors(corsOptions));

// CORS for anywhere
app.use(cors({ origin: '*' }));

// Body parser middleware to handle JSON data
app.use(express.json());

// MongoDB connection URI
const mongoURI = process.env.MONGOOSE_URL;

mongoose.connect(mongoURI);

// Check MongoDB connection status
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
	console.log('Connected to MongoDB');
});

// Toppings Schema
const globalToppingsSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
});

let GlobalToppings = mongoose.model('GlobalToppings', globalToppingsSchema);

// Pizzas Schema
let pizzaSchema = new mongoose.Schema({
	name: String,
	toppings: [String],
	image: String,
});

let Pizza = mongoose.model('Pizza', pizzaSchema);

// Endpoint to get all pizzas in database
app.get('/pizzas', async (req, res) => {
	const allPizzas = await Pizza.find();

	res.send(allPizzas);
});

// Endpoint to create a new pizza
app.post('/create-pizza', async (req, res) => {
	const { name, toppings, image } = req.body;
	console.log(name, toppings, image);

	try {
		const newPizza = await Pizza.create({
			name,
			toppings,
			image,
		});

		res.status(200).json(newPizza);
	} catch (error) {
		console.error('Error creating a new pizza:', error);
		res.status(500).json({ error: 'Error creating a new pizza' });
	}
});

// Endpoint to delete a single pizza
app.delete('/delete-pizza/:id', async (req, res) => {
	const { id } = req.params;

	try {
		const deletedPizza = await Pizza.findByIdAndDelete(id);

		if (!deletedPizza) {
			return res.status(400).json({ error: `Pizza not found with id ${id}` });
		}

		res.json({ message: `Pizza with id ${id} deleted successfully` });
	} catch (error) {
		console.error('Error deleting pizza:', error);
		res.status(500).json({ error: `Error deleting pizza with id: ${id}` });
	}
});

// Endpoint to update a single pizza
app.post('/update-pizza', async (req, res) => {
	const { _id, name, toppings } = req.body;

	try {
		const updatedPizza = await Pizza.findByIdAndUpdate(
			_id,
			{
				name: name,
				toppings: toppings,
			},
			{ new: true }
		);

		res.status(200).json(updatedPizza);
	} catch (err) {
		console.error('Error updating existing pizza:', error);
		res
			.status(500)
			.json({ error: `Error updating existing pizza with id: ${_id}` });
	}
});

// Endpoint to get all pizza toppings
app.get('/global-toppings', async (req, res) => {
	const allToppings = await GlobalToppings.find();

	res.send(allToppings);
});

// Endpoint to create a new pizza topping
app.post('/create-global-topping', async (req, res) => {
	const { name } = req.body;

	try {
		const newGlobalToppings = await GlobalToppings.create({ name });
		res.status(200).json(newGlobalToppings);
	} catch (error) {
		console.error('Error uploading new global topping:', error);
		res.status(500).json({ error: 'Error uploading new global topping' });
	}
});

// Endpoint to delete a single pizza topping
app.delete('/delete-global-topping/:id', async (req, res) => {
	const { id } = req.params;

	try {
		const deletedTopping = await GlobalToppings.findByIdAndDelete(id);

		if (!deletedTopping) {
			return res
				.status(404)
				.json({ error: `Topping not found with id: ${id}` });
		}

		res.json({ message: `Topping with id ${id} deleted successfully` });
	} catch (error) {
		console.error('Error deleting topping:', error);
		res
			.status(500)
			.json({ error: `Error deleting global topping with id: ${id}` });
	}
});

// Endpoint to update a single topping
app.post('/update-global-topping', async (req, res) => {
	const { _id, name } = req.body;

	try {
		const updatedGlobalToppings = await GlobalToppings.findByIdAndUpdate(
			_id,
			{ name: name },
			{ new: true } // Returns the modified doc
		);

		res.status(200).json(updatedGlobalToppings);
	} catch (err) {
		console.error('Error updating new global topping:', error);
		res
			.status(500)
			.json({ error: `Error updating new global topping: ${name}` });
	}
});

app.use(express.static(path.join(__dirname, 'frontend_build')));

const port = process.env.PORT || 3001;

// Start the server
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
