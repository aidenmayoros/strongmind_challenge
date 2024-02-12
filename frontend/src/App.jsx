import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import Grid from '@mui/material/Grid';

import toppings_image from './images/toppings_image.jpg';
import GlobalToppingsList from './components/GlobalToppings/GlobalToppingsList';
import PizzaBuilder from './components/PizzaBuilder';
import PizzaList from './components/Pizzas/PizzaList';

function App() {
	const [globalToppings, setGlobalToppings] = useState([]);
	const [pizzas, setPizzas] = useState([]);

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
						<GlobalToppingsList
							globalToppings={globalToppings}
							setGlobalToppings={setGlobalToppings}
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
			<Grid
				container
				spacing={{ xs: 0, sm: 2, md: 5 }}
				sx={{
					pb: 5,
					ml: { xs: 0, md: 2 },
					mr: { xs: 0, md: 2 },
					p: { xs: 0, md: 2 },
				}}>
				<PizzaList
					pizzas={pizzas}
					setPizzas={setPizzas}
					globalToppings={globalToppings}
				/>
			</Grid>
			<PizzaBuilder
				globalToppings={globalToppings}
				pizzas={pizzas}
				setPizzas={setPizzas}
			/>
		</Grid>
	);
}

export default App;
