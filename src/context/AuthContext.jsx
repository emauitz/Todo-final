import { createContext, useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';

// Crear el contexto
export const AuthContext = createContext();

// Crear un proveedor que maneje el estado y la autenticación
const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);

    // Cargar el estado de autenticación
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUsuario(currentUser);
        });
        return () => unsubscribe();
    }, []);

    // Función para iniciar sesión
    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUsuario(userCredential.user);
        } catch (error) {
            console.error('Error al iniciar sesión:', error.message);
            throw error;
        }
    };

    // Función para cerrar sesión
    const logout = async () => {
        try {
            await signOut(auth);
            setUsuario(null);
        } catch (error) {
            console.error('Error al cerrar sesión:', error.message);
        }
    };

    // Función para registrarse
    const signup = async (username, email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // Aquí podrías guardar el usuario en Firestore si deseas
            setUsuario(userCredential.user);
            // Regresar el username a través de Firestore si es necesario
        } catch (error) {
            console.error('Error al registrarse:', error.message);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ usuario, login, logout, signup }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
