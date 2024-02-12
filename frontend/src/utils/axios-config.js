import axios from 'axios';

export function setupAxiosDefaults() {
	const isProduction = process.env.NODE_ENV === 'production';

	if (isProduction) {
		axios.defaults.baseURL = 'http://54.81.36.114:8080';
	} else {
		axios.defaults.baseURL = 'http://localhost:3001';
	}
}
