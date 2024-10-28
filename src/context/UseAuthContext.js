import { useContext } from 'react';
import { AuthProvider } from './AuthContext';

const useAuthContext = () => useContext(AuthProvider);

export default useAuthContext;