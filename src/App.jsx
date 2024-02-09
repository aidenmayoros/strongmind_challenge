import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import Grid from '@mui/material/Grid';

import toppings_image from './images/toppings_image.jpg';
import PizzaList from './components/PizzaList';
import ListWithCRUD from './components/ListWithCRUD';
import PizzaBuilder from './components/PizzaBuilder';

import CheeseImage from './images/pizzas/cheese_pizza.webp';
import HawaiianImage from './images/pizzas/hawaiian_pizza.jpg';
import PepperoniImage from './images/pizzas/pepperoni_pizza.webp';
import SausageImage from './images/pizzas/sausage_pizza.webp';
import SupremeImage from './images/pizzas/supreme_pizza.jpg';

const toppings = [
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
	'Tomato sauce',
	'Mozzarella cheese',
];

const examplePizzas = [
	{
		name: 'Cheese',
		toppings: ['Tomato sauce', 'Mozzarella cheese'],
		image: CheeseImage,
	},
	{
		name: 'Hawaiian',
		toppings: ['Tomato sauce', 'Ham', 'Pineapple', 'Mozzarella cheese'],
		image: HawaiianImage,
	},
	{
		name: 'Pepperoni',
		toppings: ['Tomato sauce', 'Pepperoni', 'Mozzarella cheese'],
		image: PepperoniImage,
	},
	{
		name: 'Sausage',
		toppings: ['Tomato sauce', 'Sausage', 'Mozzarella cheese'],
		image: SausageImage,
	},
	{
		name: 'Supreme',
		toppings: [
			'Tomato sauce',
			'Pepperoni',
			'Sausage',
			'Bell peppers',
			'Onions',
			'Black olives',
			'Mozzarella cheese',
		],
		image: SupremeImage,
	},
];

function App() {
	const [toppingsList, setToppingsList] = useState(
		toppings.sort((a, b) => a.localeCompare(b))
	);
	const [pizzas, setPizzas] = useState(examplePizzas);

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
						p: 2,
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

			<Grid item xs={12} sx={{ p: 2, m: 2 }}>
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
					ALL PIZZAS
				</Typography>
			</Grid>
			<PizzaList pizzas={pizzas} />
			<PizzaBuilder
				toppings={toppingsList}
				pizzaList={pizzas}
				setPizzas={setPizzas}
			/>
		</Grid>
	);
}

export default App;
