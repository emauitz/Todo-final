import { useState } from 'react';
import Swal from 'sweetalert2';
import CustomInput from '../Input.jsx';
import CustomButton from '../Button.jsx';
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
        console.log('Recibi un email: ' + userEmail + '. ' + 'Recibi un password: ' + userPassword); //
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        try {
            if (userEmail && userPassword) {
                const usuario = usuarios.find(user => user.email === userEmail && user.password === userPassword);
                let existe;
                try {
                    if (usuario) {
                        existe = true;  // Asignación correcta
                        console.log('el usuario es: ' + existe);
                    } else {
                        existe = false;  // Si alguno de los valores es falso
                        console.log('el usuario es: ' + existe);
                    }
                } catch (error) {
                    console.log('La variable "user" no existe.');
                    existe = false;  // Si hay error, la variable no existe
                }
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
        <form className="FormField" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <span>Carga tus datos para comenzar</span>
            <CustomInput
                placeholder="Email"
                type="text"
                value={email}
                name="email"
                clase=""
                onChange={(e) => setEmail(e.target.value)}
            />
            <CustomInput
                placeholder="Password"
                type="password"
                value={password}
                name="password"
                clase=""
                onChange={(e) => setPassword(e.target.value)}
            />
            <CustomButton
                clase=""
                label="Iniciar Sesión"
                funcion={handleSubmit}
            />
        </form>
    );
}

export default LoginForm;
