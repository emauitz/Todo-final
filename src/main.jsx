import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';  // Asegúrate de importar desde 'react-dom/client'
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
