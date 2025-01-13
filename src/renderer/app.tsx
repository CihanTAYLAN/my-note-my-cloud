import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '../theme/ThemeContext';
import Layout from './layout';
import '../theme/default/index.css';

const root = document.getElementById('app');
if (!root) throw new Error('Root element not found');

const App: React.FC = () => {
    return (
        <ThemeProvider>
            <Layout />
        </ThemeProvider>
    );
};

createRoot(root).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);