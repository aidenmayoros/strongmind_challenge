import React, { useState } from 'react';
import {
	TextField,
	Button,
	List,
	ListItem,
	ListItemText,
	ListItemSecondaryAction,
	IconButton,
	Modal,
	Box,
	Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CircularProgress from '@mui/material/CircularProgress';
import CircularProgressLoader from './CircularProgressLoader';

const ListWithCRUD = ({
	globalToppings = [],
	removeGlobalTopping,
	addGlobalTopping,
	updateGlobalTopping,
	isGettingGlobalToppings,
	isAddingGlobalTopping,
	isUpdatingGlobalTopping,
	isRemovingGlobalTopping,
}) => {
	const [inputValue, setInputValue] = useState('');
	const [editGlobalTopping, setEditGlobalTopping] = useState(null);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [globalToppingIdToDelete, setGlobalToppingIdToDelete] = useState(null);

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	const validateInput = () => {
		const hasDuplicateGlobalTopping = globalToppings
			.map((topping) => topping.name.toLowerCase())
			.includes(inputValue.toLowerCase());

		if (hasDuplicateGlobalTopping) {
			return {
				error: 'Duplicate topping',
			};
		}

		const isInputEmpty = inputValue.trim() === '';

		if (isInputEmpty) {
			return {
				error: 'Empty input',
			};
		}

		return false;
	};

	const handleAddGlobalTopping = async () => {
		let validation = validateInput();

		if (validation) {
			alert(validation.error);
			return;
		}

		try {
			await addGlobalTopping(inputValue);
			setInputValue('');
		} catch {
			alert('There was an issue adding a global topping. Please try again.');
		}
	};

	const handleUpdateGlobalTopping = async () => {
		let validation = validateInput();

		if (validation) {
			alert(validation.error);
			return;
		}

		try {
			await updateGlobalTopping(editGlobalTopping._id, inputValue);

			setEditGlobalTopping(null);
			setInputValue('');
		} catch {}
	};

	const handleEditItem = (globalTopping) => {
		setInputValue(globalTopping.name);
		setEditGlobalTopping(globalTopping);
	};

	const handleDeleteIconClick = (_id) => {
		setGlobalToppingIdToDelete(_id);
		setDeleteModalOpen(true);
	};

	const handleDeleteItem = async () => {
		try {
			await removeGlobalTopping(globalToppingIdToDelete);
		} catch {
			alert('Unable to delete topping');
		} finally {
			setDeleteModalOpen(false);
			setGlobalToppingIdToDelete(null);
		}
	};

	const handleCancelDelete = () => {
		setDeleteModalOpen(false);
	};

	function renderUpdateButton() {
		return (
			<>
				{isUpdatingGlobalTopping ? (
					<CircularProgress sx={{ p: 2 }} />
				) : (
					<Button
						variant='contained'
						onClick={handleUpdateGlobalTopping}
						sx={{ mt: 1, backgroundColor: '#319b8b' }}>
						Update
					</Button>
				)}
			</>
		);
	}

	function renderAddButton() {
		return (
			<>
				{isAddingGlobalTopping ? (
					<CircularProgress sx={{ p: 2 }} />
				) : (
					<Button
						variant='contained'
						onClick={handleAddGlobalTopping}
						sx={{ mt: 1, backgroundColor: '#319b8b' }}>
						Add
					</Button>
				)}
			</>
		);
	}

	// If there is an index, we are in Edit mode
	const isEditMode = editGlobalTopping;

	const sortedToppingList = globalToppings.sort((a, b) => {
		return a.name.localeCompare(b.name);
	});

	return (
		<Box
			sx={{
				m: 1,
				p: 2,
				maxHeight: '400px',
				overflowY: 'auto',
				minWidth: '300px',
				backgroundColor: '#fedfdf85',
				borderRadius: '4px',
			}}>
			{isGettingGlobalToppings ? (
				<CircularProgressLoader />
			) : (
				<>
					<TextField
						label='Add Topping'
						value={inputValue}
						onChange={handleInputChange}
						fullWidth
					/>
					{isEditMode ? renderUpdateButton() : renderAddButton()}
					<List>
						{sortedToppingList.map((globalTopping) => (
							<ListItem key={globalTopping._id}>
								<ListItemText primary={globalTopping.name} />
								<ListItemSecondaryAction>
									<IconButton
										edge='end'
										aria-label='edit'
										onClick={() => handleEditItem(globalTopping)}>
										<EditIcon />
									</IconButton>
									<IconButton
										edge='end'
										aria-label='delete'
										onClick={() => handleDeleteIconClick(globalTopping._id)}>
										<DeleteIcon />
									</IconButton>
								</ListItemSecondaryAction>
							</ListItem>
						))}
					</List>
				</>
			)}

			<Modal
				open={deleteModalOpen}
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
						p: 6,
						maxWidth: 400,
					}}>
					{isRemovingGlobalTopping ? (
						<CircularProgressLoader />
					) : (
						<>
							<Typography
								id='delete-modal-title'
								variant='h6'
								component='h2'
								gutterBottom>
								Are you sure you want to delete this item?
							</Typography>
							<Box display='flex' justifyContent='flex-end' mt={2}>
								<Button
									onClick={handleCancelDelete}
									color='primary'
									sx={{ mr: 2 }}>
									Cancel
								</Button>
								<Button
									onClick={handleDeleteItem}
									variant='contained'
									color='error'>
									Delete
								</Button>
							</Box>
						</>
					)}
				</Box>
			</Modal>
		</Box>
	);
};

export default ListWithCRUD;
