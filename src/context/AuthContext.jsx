import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto
export const AuthContext = createContext();

// Crear un proveedor que maneje el estado y la autenticación
const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);

    // Cargar los datos del usuario desde localStorage cuando el componente se monta 
    useEffect(() => {
        const storedUser = localStorage.getItem('login_success'); // VER esto si no funciona
        if (storedUser) {
            setUsuario(JSON.parse(storedUser));
        }
    }, []);

    // Función para iniciar sesión (y guardar en localStorage)
    const login = (userData) => {
        setUsuario(userData);
        localStorage.setItem('login_success', JSON.stringify(userData));
    };

    // Función para cerrar sesión (eliminar de localStorage)
    const logout = () => {
        setUsuario(null);
        localStorage.removeItem('login_success');
    };

    return (
        <AuthContext.Provider value={{ usuario, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;