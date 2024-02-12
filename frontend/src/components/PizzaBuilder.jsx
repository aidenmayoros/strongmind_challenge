import React, { useState } from 'react';
import {
	Box,
	Button,
	Typography,
	Grid,
	TextField,
	Chip,
	Card,
	CardContent,
} from '@mui/material';
import DefaultPizzaImage from '../images/pizzas/default_pizza.jpg';
import axios from 'axios';

import CheesePizzaImage from '../images/pizzas/cheese_pizza.webp';
import HawaiianPizzaImage from '../images/pizzas/hawaiian_pizza.jpg';
import PepperoniImage from '../images/pizzas/pepperoni_pizza.webp';
import SausageImage from '../images/pizzas/sausage_pizza.webp';
import SupremeImage from '../images/pizzas/supreme_pizza.jpg';

function PizzaBuilder({ globalToppings, pizzas, setPizzas }) {
	const [selectedToppings, setSelectedToppings] = useState([]);
	const [newPizzaName, setNewPizzaName] = useState('');

	const handleAddTopping = (topping) => {
		if (!selectedToppings.includes(topping)) {
			setSelectedToppings([...selectedToppings, topping]);
		}
	};

	const createNewPizza = async (pizza) => {
		try {
			let result = await axios.post('/create-pizza', pizza);

			setPizzas([...pizzas, result.data]);

			// Reset state for the next pizza
			setSelectedToppings([]);
			setNewPizzaName('');
		} catch (err) {
			alert('There was an issue creating a new pizza');
		}
	};

	const handleRemoveTopping = (topping) => {
		setSelectedToppings(selectedToppings.filter((item) => item !== topping));
	};

	const handleCreatePizza = async () => {
		if (!newPizzaName.trim()) {
			alert('Please enter a name for the pizza.');
			return;
		}

		if (selectedToppings.length === 0) {
			alert('Please select at least one topping for the pizza.');
			return;
		}

		// Check if pizza with the same name or toppings already exists
		const existingPizza = pizzas.find(
			(pizza) =>
				pizza.name.toLowerCase() === newPizzaName.toLowerCase() ||
				JSON.stringify(pizza.toppings.sort()) ===
					JSON.stringify(selectedToppings.sort())
		);

		if (existingPizza) {
			alert('Pizza with the same name or toppings already exists.');
			return;
		}

		// If name is one of the common pizzas use their locally saved images
		function checkDefaultPizzaImages(name) {
			const pizzaImages = {
				cheese: CheesePizzaImage,
				pepperoni: PepperoniImage,
				hawaiian: HawaiianPizzaImage,
				sausage: SausageImage,
				supreme: SupremeImage,
			};

			const lowercaseName = name.toLowerCase();
			return pizzaImages[lowercaseName] || DefaultPizzaImage;
		}

		const newPizza = {
			name: newPizzaName,
			toppings: selectedToppings,
			image: checkDefaultPizzaImages(newPizzaName),
		};

		await createNewPizza(newPizza);
	};

	return (
		<Box sx={{ m: 5 }}>
			<Typography
				variant='h3'
				fontFamily='League Gothic'
				sx={{
					color: '#8c0f04',
					letterSpacing: 1,
					mb: 0,
					p: 2,
					textAlign: 'center',
					fontSize: { xs: '2rem', md: '3rem', lg: '3.75rem' },
				}}>
				BUILD YOUR PIZZA
			</Typography>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
				<Typography variant='h6' gutterBottom sx={{ color: '#8c0f04' }}>
					New Pizza Name:
				</Typography>
				<TextField
					variant='outlined'
					value={newPizzaName}
					onChange={(e) => setNewPizzaName(e.target.value)}
					sx={{ minWidth: '300px' }}
				/>
				<Button
					variant='contained'
					color='primary'
					onClick={handleCreatePizza}
					sx={{ m: 1 }}>
					Add Pizza
				</Button>
			</Box>
			<Grid container spacing={2}>
				{/* Available Toppings section */}
				<Grid
					item
					xs={12}
					md={6}
					sx={{ order: { xs: 2, md: 1 }, minHeight: { md: '50vh' } }}>
					<Typography
						variant='h6'
						gutterBottom
						sx={{
							color: '#8c0f04',
							letterSpacing: 1,
							mb: 0,
							p: 2,
							textAlign: 'center',
						}}>
						Available Toppings:
					</Typography>

					<Card variant='outlined' sx={{ minWidth: 275, minHeight: 300 }}>
						<CardContent>
							<Grid
								container
								spacing={1}
								sx={{ maxHeight: '400px', overflowY: 'auto' }}>
								{globalToppings.map((globalTopping) => (
									<Grid item key={globalTopping._id}>
										<Chip
											label={globalTopping.name}
											onClick={() => handleAddTopping(globalTopping.name)}
										/>
									</Grid>
								))}
							</Grid>
						</CardContent>
					</Card>
				</Grid>
				{/* Selected Toppings section */}
				<Grid
					item
					xs={12}
					md={6}
					sx={{ order: { xs: 1, md: 2 }, minHeight: { md: '50vh' } }}>
					<Typography
						variant='h6'
						gutterBottom
						sx={{
							color: '#8c0f04',
							letterSpacing: 1,
							mb: 0,
							p: 2,
							textAlign: 'center',
						}}>
						Selected Toppings:
					</Typography>

					<Card variant='outlined' sx={{ minWidth: 275, minHeight: 300 }}>
						<CardContent>
							<Grid container spacing={1}>
								{selectedToppings.map((topping, index) => {
									return (
										<Chip
											sx={{ m: '4px' }}
											key={index}
											label={topping}
											onDelete={() => handleRemoveTopping(topping)}
										/>
									);
								})}
							</Grid>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Box>
	);
}

export default PizzaBuilder;
