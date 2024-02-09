import React, { useState } from 'react';
import {
	Card,
	CardMedia,
	CardContent,
	Typography,
	Box,
	IconButton,
	TextField,
	Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const PizzaCard = ({ pizza, onDelete, onEdit }) => {
	const { name: initialName, image, toppings: initialToppings } = pizza;
	const [name, setName] = useState(initialName);
	const [toppings, setToppings] = useState(initialToppings.join(', '));
	const [isEditing, setIsEditing] = useState(false);

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleSaveClick = () => {
		const updatedToppings = toppings.split(',').map((t) => t.trim());
		onEdit({ ...pizza, name, toppings: updatedToppings });
		setIsEditing(false);
	};

	const handleDeleteClick = (pizza) => {
		onDelete(pizza); // Pass the index to onDelete
	};

	return (
		<Card sx={{ minHeight: '400px', maxHeight: 'none' }}>
			<CardMedia component='img' height='240' image={image} alt={name} />
			<CardContent>
				{isEditing ? (
					<>
						<TextField
							label='Pizza Name'
							value={name}
							onChange={(e) => setName(e.target.value)}
							fullWidth
							margin='normal'
						/>
						<TextField
							label='Toppings'
							value={toppings}
							onChange={(e) => setToppings(e.target.value)}
							fullWidth
							margin='normal'
						/>
						<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
							<Button onClick={handleSaveClick}>Save</Button>
						</Box>
					</>
				) : (
					<>
						<Typography variant='h5' component='div'>
							{name}
						</Typography>
						<Typography
							variant='body2'
							color='text.secondary'
							sx={{ overflow: 'hidden' }}>
							Toppings: {toppings}
						</Typography>
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
				)}
			</CardContent>
		</Card>
	);
};

export default PizzaCard;
