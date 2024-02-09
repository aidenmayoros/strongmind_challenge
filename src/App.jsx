import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import Grid from '@mui/material/Grid';

import toppings_image from './images/toppings_image.jpg';
import PizzaCard from './components/PizzaCard';
import PizzaList from './components/PizzaList';
import ListWithCRUD from './components/ListWithCRUD';

let toppings = [
	'Pepperoni',
	'Mushrooms',
	'Onions',
	'Sausage',
	'Bacon',
	'Extra cheese',
	'Black olives',
	'Green peppers',
	'Pineapple',
	'Spinach',
	'Anchovies',
	'Artichokes',
	'Ham',
	'Tomatoes',
	'Garlic',
	'Jalapenos',
	'Chicken',
	'Bell peppers',
	'Basil',
	'Oregano',
];

function App() {
	const [toppingsList, setToppingsList] = useState(
		toppings.sort((a, b) => a.localeCompare(b))
	);

	return (
		<Grid container className='App'>
			<Grid item xs={12}>
				<Typography
					variant='h1'
					fontFamily='League Gothic'
					gutterBottom
					sx={{
						color: '#8c0f04',
						letterSpacing: 1,
						mb: 0,
						textAlign: 'center',
						fontSize: { xs: '3rem', md: '4rem', lg: '5rem' },
					}}>
					STRONGMIND PIZZA
				</Typography>
			</Grid>

			<Grid item xs={12}>
				<Typography
					variant='h3'
					fontFamily='League Gothic'
					sx={{
						color: '#8c0f04',
						letterSpacing: 1,
						mb: 0,
						textAlign: 'center',
						fontSize: { xs: '2rem', md: '3rem', lg: '3.75rem' },
					}}>
					TOPPINGS
				</Typography>
			</Grid>

			<Grid container item xs={12}>
				{/* Image */}
				<Grid item xs={12} md={6}>
					<div
						style={{
							backgroundImage: `url(${toppings_image})`,
							backgroundSize: 'cover',
							backgroundPosition: 'center',
							height: '100vh',
							maxHeight: 450,
						}}></div>
				</Grid>

				{/* List */}
				<Grid
					item
					xs={12}
					md={6}
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<Box>
						<ListWithCRUD
							listItems={toppingsList}
							updateList={setToppingsList}
						/>
					</Box>
				</Grid>
			</Grid>

			{/* Start of Pizzas */}
		</Grid>
	);
}

export default App;
