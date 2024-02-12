import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import PizzaCard from './PizzaCard';
import { PizzaURL } from '../../utils/pizza_url';

function PizzaList({ pizzas, setPizzas, globalToppings }) {
	async function onEditSave(pizza) {
		let result = await axios.post(`${PizzaURL}/update-pizza`, pizza);

		const pizzaCopies = [...pizzas];

		let index = pizzaCopies.findIndex((pizzaCopy) => {
			return pizzaCopy._id === pizza._id;
		});

		if (index === -1) {
			alert('Could not find pizza in list');
		}

		pizzaCopies.splice(index, 1, result.data);

		setPizzas(pizzaCopies);
	}

	async function handleDelete(pizza) {
		try {
			await axios.delete(`${PizzaURL}/delete-pizza/${pizza._id}`);

			// Update local state.
			let pizzasCopy = [...pizzas];

			let index = pizzasCopy.findIndex((pizzaCopy) => {
				return pizzaCopy._id === pizza._id;
			});

			if (index === -1) {
				alert('There was an issue finding pizza in list');
				return;
			}

			pizzasCopy.splice(index, 1);

			setPizzas(pizzasCopy);
		} catch (error) {
			alert('There was an issue deleting a pizza.');

			throw error;
		} finally {
		}
	}

	async function fetchPizzas() {
		let result = await axios.get(`${PizzaURL}/pizzas`);

		setPizzas(result.data);
	}

	useEffect(() => {
		fetchPizzas();
	}, []);

	return pizzas.map((pizza) => (
		<Grid
			key={pizza._id}
			item
			xs={12}
			sm={6}
			md={4}
			xl={3}
			sx={{ pb: { xs: 2 } }}>
			<PizzaCard
				globalToppings={globalToppings}
				pizza={pizza}
				onEditSave={onEditSave}
				onDelete={handleDelete}
			/>
		</Grid>
	));
}

export default PizzaList;
