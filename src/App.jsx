import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';

import toppings_image from './images/toppings_image.jpg';
import PizzaCard from './components/PizzaCard';
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
		<Box className='App'>
			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<Typography
					variant='h1'
					fontFamily='League Gothic'
					gutterBottom
					sx={{ color: '#8c0f04', letterSpacing: 1, mb: 0 }}>
					STRONGMIND PIZZA
				</Typography>
			</Box>

			<Box sx={{ backgroundColor: '#f3f2ef' }}>
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<Typography
						variant='h2'
						fontFamily='League Gothic'
						sx={{ color: '#8c0f04', letterSpacing: 1, mb: 0 }}>
						TOPPINGS
					</Typography>
				</Box>

				<Box
					sx={{
						display: 'flex',
						width: '100%',
					}}>
					<div
						style={{
							flex: '0 0 50%', // Ensures the image takes 50% width
							backgroundImage: `url(${toppings_image})`,
							backgroundSize: 'cover', // Ensures the image covers the container
							backgroundPosition: 'center', // Centers the image
							width: '100vw', // Sets the image height to cover the viewport height
						}}></div>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							ml: 'auto',
							mr: 'auto',
						}}>
						<ListWithCRUD
							listItems={toppingsList}
							updateList={setToppingsList}
						/>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}

export default App;

// sx={{
// 	display: 'flex',
// 	flexDirection: 'column',
// 	alignItems: 'center',
// 	width: '50%',
// 	backgroundImage: { toppings_image },
// 	backgroundRepeat: 'no-repeat',
// }}
