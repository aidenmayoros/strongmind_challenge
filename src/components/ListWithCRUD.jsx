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

const ListWithCRUD = ({ listItems = [] }) => {
	const [items, setItems] = useState(
		listItems.sort((a, b) => a.localeCompare(b))
	);
	const [inputValue, setInputValue] = useState('');
	const [editIndex, setEditIndex] = useState(null);
	const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
	const [itemToDeleteIndex, setItemToDeleteIndex] = useState(null);
	const [showAllItems, setShowAllItems] = useState(false);

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	const handleAddItem = () => {
		if (inputValue.trim() !== '') {
			if (editIndex !== null) {
				const updatedItems = [...items];
				updatedItems[editIndex] = inputValue;
				setItems(updatedItems.sort((a, b) => a.localeCompare(b)));
				setEditIndex(null);
			} else {
				setItems([...items, inputValue].sort((a, b) => a.localeCompare(b)));
			}
			setInputValue('');
		}
	};

	const handleEditItem = (index) => {
		setInputValue(items[index]);
		setEditIndex(index);
	};

	const handleDeleteIconClick = (index) => {
		setItemToDeleteIndex(index);
		setDeleteConfirmationOpen(true);
	};

	const handleDeleteItem = () => {
		const updatedItems = [...items];
		updatedItems.splice(itemToDeleteIndex, 1);
		setItems(updatedItems);
		setDeleteConfirmationOpen(false);
	};

	const handleCancelDelete = () => {
		setDeleteConfirmationOpen(false);
	};

	const toggleShowAllItems = () => {
		setShowAllItems(!showAllItems);
	};

	return (
		<Box sx={{ m: 1 }}>
			<TextField
				label='Add Item'
				value={inputValue}
				onChange={handleInputChange}
				fullWidth
			/>
			<Button
				variant='contained'
				color='primary'
				onClick={handleAddItem}
				sx={{ mt: 1 }}>
				{editIndex !== null ? 'Update' : 'Add'}
			</Button>
			<List>
				{items.slice(0, showAllItems ? items.length : 5).map((item, index) => (
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
			{items.length > 5 && (
				<Button onClick={toggleShowAllItems} variant='outlined' sx={{ mt: 1 }}>
					{showAllItems ? 'Show Less' : 'Show More'}
				</Button>
			)}
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
