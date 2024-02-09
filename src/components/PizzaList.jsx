import React from 'react';
import { Grid } from '@mui/material';
import PizzaCard from './PizzaCard';

function PizzaList({ pizzas }) {
	return (
		<Grid container spacing={2} sx={{ pb: 5, ml: 2, mr: 2 }}>
			{pizzas.map((pizza, index) => (
				<Grid key={index} item xs={12} sm={6} md={4} xl={3}>
					<PizzaCard pizza={pizza} />
				</Grid>
			))}
		</Grid>
	);
}

export default PizzaList;
