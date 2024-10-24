import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './Components/Login/LoginPage.jsx';
import MainPage from './Sections/MainPage.jsx';
import SettingsModal from './ModalSettings/SettingsModal.jsx';
import AuthProvider from './context/AuthContext.jsx';
import { TaskProvider } from './context/TaskContext.jsx';
import './App.css';

function App() {
  const usuario = JSON.parse(localStorage.getItem('login_success')) || false;
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <TaskProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<MainPage />} />
          </Routes>
          <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} cassName="ModalSettings" />
        </BrowserRouter>
      </AuthProvider>
    </TaskProvider>
  );
}

export default App;

