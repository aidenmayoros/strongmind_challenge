import React, { useState, useEffect } from 'react';
import {
	Card,
	CardMedia,
	CardContent,
	Typography,
	Box,
	IconButton,
	Modal,
	Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Chip from '@mui/material/Chip';
import EditPizza from './EditPizza';

function ShowPizza({ pizzaName, toppings, onDelete, handleEditClick }) {
	const handleDeleteClick = () => {
		onDelete();
	};

	return (
		<>
			<Typography variant='h5' component='div'>
				{pizzaName}
			</Typography>
			{toppings.map((topping) => (
				<Chip
					key={topping}
					label={topping}
					sx={{ m: 0.5, backgroundColor: '#605a55', color: '#ffffff' }}
				/>
			))}
			<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
				<IconButton onClick={handleEditClick}>
					<EditIcon />
				</IconButton>
				<IconButton onClick={handleDeleteClick} aria-label='delete'>
					<DeleteIcon />
				</IconButton>
			</Box>
		</>
	);
}

const PizzaCard = ({ pizza, toppings, onDelete, onEditSave, toppingsList }) => {
	const [pizzaName, setPizzaName] = useState(pizza.name);
	const [pizzaToppings, setPizzaToppings] = useState(toppings);
	const [isEditing, setIsEditing] = useState(false);
	const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

	useEffect(() => {
		setPizzaName(pizza.name);
		setPizzaToppings(pizza.toppings);
	}, [pizza]);

	const handleSaveClick = (newPizzaName, newToppings) => {
		onEditSave({ ...pizza, name: newPizzaName, toppings: newToppings });
		setIsEditing(false);
	};

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleDeleteClick = () => {
		setDeleteConfirmationOpen(true);
	};

	const handleDeleteConfirmed = (pizza) => {
		onDelete(pizza);
		setDeleteConfirmationOpen(false);
	};

	const handleCancelDelete = () => {
		setDeleteConfirmationOpen(false);
	};

	return (
		<Card
			sx={{
				minHeight: { xs: 'none', md: '450px' },
				maxHeight: 'none',
				backgroundColor: '#fedfdf85',
			}}>
			<CardMedia
				component='img'
				height='240'
				image={pizza.image}
				alt={pizzaName}
			/>
			<CardContent>
				{isEditing ? (
					<EditPizza
						pizzaName={pizzaName}
						setPizzaName={setPizzaName}
						toppings={pizzaToppings}
						toppingsList={toppingsList}
						handleSaveClick={handleSaveClick}
					/>
				) : (
					<ShowPizza
						pizzaName={pizzaName}
						toppings={pizzaToppings}
						onDelete={handleDeleteClick}
						handleEditClick={handleEditClick}
					/>
				)}
			</CardContent>
			<Modal
				open={deleteConfirmationOpen}
				onClose={handleCancelDelete}
				aria-labelledby='delete-modal-title'
				aria-describedby='delete-modal-description'>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						bgcolor: 'background.paper',
						boxShadow: 24,
						p: 4,
						maxWidth: 400,
					}}>
					<Typography
						id='delete-modal-title'
						variant='h6'
						component='h2'
						gutterBottom>
						Are you sure you want to delete this pizza?
					</Typography>
					<Box display='flex' justifyContent='flex-end' mt={2}>
						<Button onClick={handleCancelDelete} color='primary' sx={{ mr: 2 }}>
							Cancel
						</Button>
						<Button
							onClick={() => handleDeleteConfirmed(pizza)}
							variant='contained'
							color='error'>
							Delete
						</Button>
					</Box>
				</Box>
			</Modal>
		</Card>
	);
};

export default PizzaCard;
