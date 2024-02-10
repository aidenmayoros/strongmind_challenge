import React, { useState, useEffect } from 'react';
import { Box, TextField, Button } from '@mui/material';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';

function EditPizza({
	pizza,
	pizzaName,
	setPizzaName,
	toppings,
	toppingsList,
	handleSaveClick,
}) {
	const [draftToppings, setDraftToppings] = useState(toppings);

	const toppingsNotOnPizza = toppingsList.filter((toppingFromList) => {
		return !draftToppings.includes(toppingFromList);
	});

	function handleAddToppingToPizza(toppingToAdd) {
		setDraftToppings([...draftToppings, toppingToAdd]);
	}

	function handleDeleteToppingFromPizza(toppingToDelete) {
		setDraftToppings(
			draftToppings.filter((topping) => {
				return topping !== toppingToDelete;
			})
		);
	}

	function handleSaveDraft() {
		handleSaveClick(pizzaName, draftToppings);
	}

	function handleCancelDraft() {}

	function renderToppingsOnPizza() {
		return draftToppings.map((draftTopping) => {
			return (
				<Chip
					key={draftTopping}
					onDelete={() => handleDeleteToppingFromPizza(draftTopping)}
					label={draftTopping}
				/>
			);
		});
	}

	function renderToppingsNotOnPizza() {
		return toppingsNotOnPizza.map((toppingNotOnPizza) => {
			return (
				<Chip
					key={toppingNotOnPizza}
					onClick={() => handleAddToppingToPizza(toppingNotOnPizza)}
					label={toppingNotOnPizza}
				/>
			);
		});
	}

	return (
		<>
			<TextField
				label='Pizza Name'
				value={pizzaName}
				onChange={(e) => setPizzaName(e.target.value)}
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
