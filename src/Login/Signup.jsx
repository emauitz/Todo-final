import { useState } from 'react';
import CustomButton from '../Components/Button';
import CustomInput from '../Components/Input';
import Swal from 'sweetalert2';

function SignupForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repPassword, setRepPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        crearUsuario(username, email, password, repPassword);
    };

    const crearUsuario = (username, email, password, repPassword) => {
        if (!username || !email || !password || !repPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se completaron todos los campos!',
            });
            return;
        }
        if (password !== repPassword || password.length < 6) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Las contraseñas deben coincidir y tener al menos 6 caracteres!',
            });
            return;
        }
        const usuario = { username, email, password };
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const siUsuarioRegistrados = usuarios.find(user => user.email === email);
        if (siUsuarioRegistrados) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El email ya está registrado!',
            });
            return;
        }
        usuarios.push(usuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        Swal.fire({
            icon: 'success',
            title: 'Éxito!',
            text: 'Tu usuario fue creado correctamente!',
        }).then(() => {
            setUsername('');
            setEmail('');
            setPassword('');
            setRepPassword('');
        }).catch((error) => {
            console.error('Error al mostrar SweetAlert2:', error);
        });
    };

    return (
        <form className="Sign-Up" onSubmit={handleSubmit}>
            <h2>Sign-Up</h2>
            <span>Crea un nuevo usuario</span>
            <CustomInput
                placeholder="Nombre"
                type="text"
                value={username}
                name="username" 
                onChange={(e) => setUsername(e.target.value)}
            />
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
            <CustomInput
                placeholder="Confirma Password"
                type="password"
                value={repPassword}
                name="repPassword" 
                onChange={(e) => setRepPassword(e.target.value)}
            />
            <CustomButton funcion={handleSubmit} type="submit" label="Registrarse" />
        </form>
    );
}

export default SignupForm;
