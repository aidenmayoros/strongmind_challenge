import React, { useState } from 'react';
import {
	Box,
	Button,
	List,
	ListItem,
	ListItemText,
	IconButton,
	Typography,
	Grid,
	TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function PizzaBuilder({ toppings, pizzaList, setPizzas }) {
	const [selectedToppings, setSelectedToppings] = useState([]);
	const [newPizzaName, setNewPizzaName] = useState('');

	const handleAddTopping = (topping) => {
		if (!selectedToppings.includes(topping)) {
			setSelectedToppings([...selectedToppings, topping]);
		}
	};

	const handleRemoveTopping = (topping) => {
		setSelectedToppings(selectedToppings.filter((item) => item !== topping));
	};

	const handleAddPizza = () => {
		if (!newPizzaName.trim()) {
			alert('Please enter a name for the pizza.');
			return;
		}

		if (selectedToppings.length === 0) {
			alert('Please select at least one topping for the pizza.');
			return;
		}

		// Check if pizza with the same name or toppings already exists
		const existingPizza = pizzaList.find(
			(pizza) =>
				pizza.name.toLowerCase() === newPizzaName.toLowerCase() ||
				JSON.stringify(pizza.toppings.sort()) ===
					JSON.stringify(selectedToppings.sort())
		);

		if (existingPizza) {
			alert('Pizza with the same name or toppings already exists.');
			return;
		}

		// Create a new pizza object and add it to the pizza list
		const newPizza = {
			name: newPizzaName,
			toppings: selectedToppings,
		};

		setPizzas([...pizzaList, newPizza]);

		// Reset state for the next pizza
		setSelectedToppings([]);
		setNewPizzaName('');
	};

	return (
		<Box>
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
					onClick={handleAddPizza}
					sx={{ m: 1 }}>
					Add Pizza
				</Button>
			</Box>
			<Grid container spacing={2}>
				<Grid item xs={12}>
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
					<List
						sx={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
						}}>
						{selectedToppings.map((topping, index) => (
							<ListItem key={index} sx={{ maxWidth: '300px' }}>
								<ListItemText primary={topping} />
								<IconButton
									edge='end'
									aria-label='delete'
									onClick={() => handleRemoveTopping(topping)}>
									<DeleteIcon />
								</IconButton>
							</ListItem>
						))}
					</List>
				</Grid>
				<Grid item xs={12} sx={{ minHeight: '50vh' }}>
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
					<Grid container spacing={1}>
						{toppings.map((topping, index) => (
							<Grid item xs={12} sm={6} md={3} key={index} sx={{ mb: 1 }}>
								<Button
									variant='contained'
									color='primary'
									sx={{
										mt: 1,
										mb: 1,
										backgroundColor: '#319b8b',
										width: '100%',
									}}
									onClick={() => handleAddTopping(topping)}>
									{topping}
								</Button>
							</Grid>
						))}
					</Grid>
				</Grid>
			</Grid>
		</Box>
	);
}

export default PizzaBuilder;
