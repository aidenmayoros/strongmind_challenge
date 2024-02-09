import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';

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
	const [toppingsList, setToppingsList] = useState(toppings);

	return (
		<Box className='App'>
			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<Typography variant='h2' gutterBottom>
					Pizzas
				</Typography>
			</Box>

			<Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
				<ListWithCRUD listItems={toppingsList} />
				<ListWithCRUD />
			</Box>
		</Box>
	);
}

export default App;
