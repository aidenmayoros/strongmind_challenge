import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { setupAxiosDefaults } from './utils/axios-config';

// Import Styles
import './styles/App.css';

setupAxiosDefaults();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
