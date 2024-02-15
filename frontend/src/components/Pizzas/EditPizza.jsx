import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';

function EditPizza({
	pizzaName,
	setPizzaName,
	toppings,
	globalToppings,
	handleSaveClick,
	setIsEditing,
}) {
	const [draftToppings, setDraftToppings] = useState(toppings);
	const [draftPizzaName, setDraftPizzaName] = useState(pizzaName);

	// Initial states, used for when hitting Cancel in edit mode
	const [initialPizzaName, setInitialPizzaName] = useState(pizzaName);
	const [initialToppings, setInitialToppings] = useState(toppings);

	const toppingsNotOnPizza = globalToppings.filter((toppingFromList) => {
		return !draftToppings.includes(toppingFromList.name);
	});

	function setDraftPizzaTopping(toppingToAdd) {
		setDraftToppings([...draftToppings, toppingToAdd.name]);
	}

	function handleDeleteToppingFromPizza(toppingToDelete) {
		setDraftToppings(
			draftToppings.filter((topping) => {
				return topping !== toppingToDelete;
			})
		);
	}

	function handleSaveDraft() {
		handleSaveClick(draftPizzaName, draftToppings);
		setPizzaName(draftPizzaName);
	}

	function handleCancelDraft() {
		setDraftToppings(initialToppings);
		setDraftPizzaName(initialPizzaName);
		setIsEditing(false);
	}

	function renderToppingsOnPizza() {
		return draftToppings.map((draftTopping) => {
			return (
				<Chip
					key={draftTopping}
					onDelete={() => handleDeleteToppingFromPizza(draftTopping)}
					label={draftTopping}
					sx={{ m: 1 }}
				/>
			);
		});
	}

	function renderToppingsNotOnPizza() {
		return toppingsNotOnPizza.map((toppingNotOnPizza) => {
			return (
				<Chip
					key={toppingNotOnPizza._id}
					onClick={() => setDraftPizzaTopping(toppingNotOnPizza)}
					label={toppingNotOnPizza.name}
					sx={{ m: 1 }}
				/>
			);
		});
	}

	return (
		<>
			<TextField
				label='Pizza Name'
				value={draftPizzaName}
				onChange={(e) => setDraftPizzaName(e.target.value)}
				fullWidth
				margin='normal'
			/>
			{renderToppingsOnPizza()}
			<Divider />
			{renderToppingsNotOnPizza()}
			<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
				<Button onClick={handleSaveDraft}>Save</Button>
				<Button onClick={handleCancelDraft}>Cancel</Button>
			</Box>
		</>
	);
}

export default EditPizza;
