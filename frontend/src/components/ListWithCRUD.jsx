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

const ListWithCRUD = ({ listItems = [], updateList }) => {
	const [inputValue, setInputValue] = useState('');
	const [editItemsIndex, setEditItemsIndex] = useState(null);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [itemToDeleteIndex, setItemToDeleteIndex] = useState(null);

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	const handleAddItem = () => {
		if (
			[...listItems]
				.map((topping) => topping.toLowerCase())
				.includes(inputValue.toLowerCase())
		) {
			alert(`${inputValue} is already in toppings list.`);
			setInputValue('');
			return;
		}

		if (inputValue.trim() !== '' && editItemsIndex !== null) {
			const updatedItems = [...listItems];
			updatedItems[editItemsIndex] = inputValue;
			updateList(updatedItems.sort((a, b) => a.localeCompare(b)));
			setEditItemsIndex(null);
		} else {
			updateList([...listItems, inputValue].sort((a, b) => a.localeCompare(b)));
		}
		setInputValue('');
	};

	const handleEditItem = (index) => {
		setInputValue(listItems[index]);
		setEditItemsIndex(index);
	};

	const handleDeleteIconClick = (index) => {
		setItemToDeleteIndex(index);
		setDeleteModalOpen(true);
	};

	const handleDeleteItem = () => {
		const updatedItems = [...listItems];
		updatedItems.splice(itemToDeleteIndex, 1);
		updateList(updatedItems);
		setDeleteModalOpen(false);
	};

	const handleCancelDelete = () => {
		setDeleteModalOpen(false);
	};

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
			<TextField
				label='Add Item'
				value={inputValue}
				onChange={handleInputChange}
				fullWidth
			/>
			<Button
				variant='contained'
				onClick={handleAddItem}
				sx={{ mt: 1, backgroundColor: '#319b8b' }}>
				{editItemsIndex !== null ? 'Update' : 'Add'}
			</Button>
			<List>
				{listItems.map((item, index) => (
					<ListItem key={index}>
						<ListItemText primary={item} />
						<ListItemSecondaryAction>
							<IconButton
								edge='end'
								aria-label='edit'
								onClick={() => handleEditItem(index)}>
								<EditIcon />
							</IconButton>
							<IconButton
								edge='end'
								aria-label='delete'
								onClick={() => handleDeleteIconClick(index)}>
								<DeleteIcon />
							</IconButton>
						</ListItemSecondaryAction>
					</ListItem>
				))}
			</List>
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
						p: 4,
						maxWidth: 400,
					}}>
					<Typography
						id='delete-modal-title'
						variant='h6'
						component='h2'
						gutterBottom>
						Are you sure you want to delete this item?
					</Typography>
					<Box display='flex' justifyContent='flex-end' mt={2}>
						<Button onClick={handleCancelDelete} color='primary' sx={{ mr: 2 }}>
							Cancel
						</Button>
						<Button
							onClick={handleDeleteItem}
							variant='contained'
							color='error'>
							Delete
						</Button>
					</Box>
				</Box>
			</Modal>
		</Box>
	);
};

export default ListWithCRUD;
