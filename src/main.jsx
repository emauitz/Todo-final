import { TaskProvider } from './context/Taskcontext.jsx';
import AuthProvider from './context/AuthContext.jsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';  
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TaskProvider >
      <AuthProvider>
        <App />
      </AuthProvider>
    </TaskProvider>
  </StrictMode>,
);

