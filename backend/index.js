// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Create an instance of Express
const app = express();

// Middleware to enable CORS
app.use(cors());

const path = require('path');

// Body parser middleware to handle JSON data
app.use(express.json());

// MongoDB connection URI
const mongoURI = `mongodb+srv://aidenmayoros:${process.env.MONGOOSE_PASSWORD}@strongmindcluster0.kxcbhkc.mongodb.net/?retryWrites=true&w=majority`;

// Connect to MongoDB
mongoose.connect(mongoURI);

// Check MongoDB connection status
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
	console.log('Connected to MongoDB');
});

// Toppings
const toppingSchema = new mongoose.Schema({
	name: String,
});

let Topping = mongoose.model('Topping', toppingSchema);

const globalToppingsSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
});

let GlobalToppings = mongoose.model('GlobalToppings', globalToppingsSchema);

// Pizzas
let pizzaSchema = new mongoose.Schema({
	name: String,
	toppings: [String],
});

let Pizza = mongoose.model('Pizza', pizzaSchema);

app.get('/pizzas', async (req, res) => {
	const allPizzas = await Pizza.find();

	res.send(allPizzas);
});

app.post('/create-pizza', async (req, res) => {
	const { name, toppings } = req.body;

	try {
		const newPizza = await Pizza.create({
			name,
			toppings,
		});

		res.status(200).json(newPizza);
	} catch (error) {
		console.error('Error creating a new pizza:', error);
		res.status(500).json({ error: 'Error creating a new pizza' });
	}
});

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

app.get('/global-toppings', async (req, res) => {
	const allToppings = await GlobalToppings.find();

	res.send(allToppings);
});

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
// Replace with the build file name
app.use('*', express.static(path.join(__dirname, '/frontend_build')));

// Set the port for the server to listen on
const port = process.env.PORT || 3001;

// Start the server
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
