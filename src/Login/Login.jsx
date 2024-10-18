import { useState } from 'react';
import Swal from 'sweetalert2';
import CustomInput from '../Components/Input';
import CustomButton from '../Components/Button';
import { useNavigate } from 'react-router-dom';
function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        iniciarSesion(email, password);
    };

    const iniciarSesion = (userEmail, userPassword) => {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        try {
            if (userEmail && userPassword) {
                const usuario = usuarios.find(user => user.email === userEmail && user.password === userPassword);
                if (!usuario) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Credenciales incorrectas. Por favor, intenta de nuevo.',
                    });
                    throw new Error('Usuario no encontrado.');
                }
                localStorage.setItem('login_success', JSON.stringify({ email: usuario.email, username: usuario.username }));
                navigate('/');
            } else {
                throw new Error('Faltan datos de inicio de sesión.');
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
            });
        }
    };

    return (
        <form className="Log-In" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <span>Carga tus datos para comenzar</span>
            <CustomInput
                placeholder="Email"
                type="text"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <CustomInput
                placeholder="Password"
                type="password"
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <CustomButton
                type="submit"
                label="Iniciar Sesión"
                funcion={handleSubmit} 
            />
        </form>
    );
}

export default LoginForm;
