import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import { setupAxiosDefaults } from './utils/axios-config';

// Import Styles
import './styles/App.css';

setupAxiosDefaults();

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App tab='home' />);
