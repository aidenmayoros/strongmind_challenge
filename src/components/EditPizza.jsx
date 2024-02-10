import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';

function EditPizza({
	pizzaName,
	setPizzaName,
	toppings,
	toppingsList,
	handleSaveClick,
}) {
	const [draftToppings, setDraftToppings] = useState(toppings);
	const [initialPizzaName, setInitialPizzaName] = useState(pizzaName);
	const [initialToppings, setInitialToppings] = useState(toppings);

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

	function handleCancelDraft() {
		handleSaveClick(initialPizzaName, initialToppings);
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
					key={toppingNotOnPizza}
					onClick={() => handleAddToppingToPizza(toppingNotOnPizza)}
					label={toppingNotOnPizza}
					sx={{ m: 1 }}
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
