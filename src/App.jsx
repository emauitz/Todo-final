import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './Login/LoginPage.jsx';
import MainPage from './Sections/MainPage.jsx';
import Perfil from './ComponentesContainerTodo/PerfilTodo.jsx';
import SettingsModal from './ModalSettings/SettingsModal.jsx'; 
import './App.css';

function App() {
  const usuario = JSON.parse(localStorage.getItem('login_success')) || false;
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={usuario ? <MainPage /> : <Navigate to="/login" />} />
        <Route path="/perfil" element={usuario ? <Perfil nombre={usuario.username} /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </BrowserRouter>
  );
}

export default App;