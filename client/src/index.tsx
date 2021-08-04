import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import AppProvider from './providers/AppProvider';
import WorkerManager from './services/WorkerManager';
// Входная точка для React.

WorkerManager.initialize();

ReactDOM.render(
  
    <AppProvider>
        <App />
    </AppProvider>,
    document.getElementById('root'),
);
