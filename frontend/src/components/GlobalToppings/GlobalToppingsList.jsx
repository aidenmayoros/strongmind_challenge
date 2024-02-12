import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListWithCRUD from '../ListWithCRUD';
import { PizzaURL } from '../../utils/pizza_url';

function GlobalToppingsList({ globalToppings, setGlobalToppings }) {
	const [isGettingGlobalToppings, setIsGettingGlobalToppings] = useState(false);
	const [isAddingGlobalTopping, setIsAddingGlobalTopping] = useState(false);
	const [isUpdatingGlobalTopping, setIsUpdatingGlobalTopping] = useState(false);
	const [isRemovingGlobalTopping, setIsRemovingGlobalTopping] = useState(false);

	async function getAllGlobalToppings() {
		try {
			setIsGettingGlobalToppings(true);
			const result = await axios.get(`${PizzaURL}/global-toppings`);

			setGlobalToppings(result.data);
		} catch (error) {
			alert('Failed to fetch global toppings');

			throw error;
		} finally {
			setIsGettingGlobalToppings(false);
		}
	}

	async function addGlobalTopping(name) {
		try {
			setIsAddingGlobalTopping(true);
			const result = await axios.post(`${PizzaURL}/create-global-topping`, {
				name: name,
			});

			setGlobalToppings([...globalToppings, result.data]);
		} catch (error) {
			alert('There was an issue adding a topping.');

			throw error;
		} finally {
			setIsAddingGlobalTopping(false);
		}
	}

	async function updateGlobalTopping(_id, name) {
		try {
			setIsUpdatingGlobalTopping(true);
			const result = await axios.post(`${PizzaURL}/update-global-topping`, {
				_id,
				name,
			});

			// Update local state.
			let globalToppingsCopy = [...globalToppings];

			let index = globalToppingsCopy.findIndex((globalTopping) => {
				return globalTopping._id === _id;
			});

			globalToppingsCopy.splice(index, 1, result.data);

			setGlobalToppings(globalToppingsCopy);
		} catch (error) {
			throw error;
		} finally {
			setIsUpdatingGlobalTopping(false);
		}
	}

	async function removeGlobalTopping(_id) {
		try {
			setIsRemovingGlobalTopping(true);

			await axios.delete(`${PizzaURL}/delete-global-topping/${_id}`);

			let globalToppingsCopy = [...globalToppings];
			let index = globalToppingsCopy.findIndex((globalTopping) => {
				return globalTopping._id === _id;
			});

			if (index === -1) {
				alert('There was an issue finding topping in list');
				return;
			}

			globalToppingsCopy.splice(index, 1);

			setGlobalToppings(globalToppingsCopy);
		} catch (error) {
			alert('There was an issue deleting a topping.');

			throw error;
		} finally {
			setIsRemovingGlobalTopping(false);
		}
	}

	useEffect(() => {
		getAllGlobalToppings();
	}, []);

	return (
		<ListWithCRUD
			globalToppings={globalToppings}
			removeGlobalTopping={removeGlobalTopping}
			addGlobalTopping={addGlobalTopping}
			updateGlobalTopping={updateGlobalTopping}
			isGettingGlobalToppings={isGettingGlobalToppings}
			isAddingGlobalTopping={isAddingGlobalTopping}
			isUpdatingGlobalTopping={isUpdatingGlobalTopping}
			isRemovingGlobalTopping={isRemovingGlobalTopping}
		/>
	);
}

export default GlobalToppingsList;
