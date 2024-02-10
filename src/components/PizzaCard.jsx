import React, { useState, useEffect } from 'react';
import {
	Card,
	CardMedia,
	CardContent,
	Typography,
	Box,
	IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Chip from '@mui/material/Chip';

import EditPizza from './EditPizza';

function ShowPizza({ pizza, pizzaName, toppings, onDelete, handleEditClick }) {
	const handleDeleteClick = (pizza) => {
		onDelete(pizza);
	};

	return (
		<>
			<Typography variant='h5' component='div'>
				{pizzaName}
			</Typography>
			{toppings.map((topping) => {
				return <Chip key={topping} label={topping} />;
			})}
			<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
				<IconButton onClick={handleEditClick}>
					<EditIcon />
				</IconButton>
				<IconButton
					onClick={() => handleDeleteClick(pizza)}
					aria-label='delete'>
					<DeleteIcon />
				</IconButton>
			</Box>
		</>
	);
}

const PizzaCard = ({ pizza, toppings, onDelete, onEditSave, toppingsList }) => {
	const { image } = pizza;

	const [pizzaName, setPizzaName] = useState(pizza.name);
	const [pizzaToppings, setPizzaToppings] = useState(toppings);
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		setPizzaToppings(pizza.toppings);
	}, [pizza]);

	const handleSaveClick = (newPizzaName, newToppings) => {
		onEditSave({ ...pizza, name: newPizzaName, toppings: newToppings });
		setIsEditing(false);
	};

	const handleEditClick = () => {
		setIsEditing(true);
	};

	return (
		<Card sx={{ minHeight: '400px', maxHeight: 'none' }}>
			<CardMedia component='img' height='240' image={image} alt={pizzaName} />
			<CardContent>
				{isEditing ? (
					<EditPizza
						pizza={pizza}
						pizzaName={pizzaName}
						setPizzaName={setPizzaName}
						toppings={pizzaToppings}
						toppingsList={toppingsList}
						handleSaveClick={handleSaveClick}
					/>
				) : (
					<ShowPizza
						pizza={pizza}
						pizzaName={pizzaName}
						toppings={pizzaToppings}
						onDelete={onDelete}
						handleEditClick={handleEditClick}
					/>
				)}
			</CardContent>
		</Card>
	);
};

export default PizzaCard;
