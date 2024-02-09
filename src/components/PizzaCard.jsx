import React from 'react';
import {
	Card,
	CardMedia,
	CardContent,
	Typography,
	Box,
	Grid,
} from '@mui/material';

const PizzaCard = ({ pizza }) => {
	const { name, image, toppings } = pizza;

	return (
		<Card sx={{ minHeight: '375px', maxHeight: '375px' }}>
			<CardMedia component='img' height='240' image={image} alt={name} />
			<CardContent>
				<Typography variant='h5' component='div'>
					{name}
				</Typography>
				<Typography
					variant='body2'
					color='text.secondary'
					sx={{ overflow: 'hidden' }}>
					Toppings: {toppings.join(', ')}
				</Typography>
				<Box mt={2}></Box>
			</CardContent>
		</Card>
	);
};

export default PizzaCard;
