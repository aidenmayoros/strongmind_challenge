import axios from 'axios';

export function setupAxiosDefaults() {
	const isDevelopment = process.env.NODE_ENV === 'development';

	if (isDevelopment) {
		axios.defaults.baseURL = 'http://localhost:3001';
	}
}
