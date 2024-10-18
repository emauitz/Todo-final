import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';

function obtenerSaludo(hora) {
    if (hora >= 6 && hora < 12) {
        return 'buenos días';
    } else if (hora >= 12 && hora < 18) {
        return 'buenas tardes';
    } else {
        return 'buenas noches';
    }
}

function PerfilTodo() {
    const [fecha, setFecha] = useState('');
    const [saludo, setSaludo] = useState('');

    useEffect(() => {
        const ahora = DateTime.now();
        setFecha(ahora.toLocaleString(DateTime.DATE_SHORT));

        const usuario = JSON.parse(localStorage.getItem('login_success'));
        if (usuario && usuario.username) {
            const saludo = obtenerSaludo(ahora.hour);
            setSaludo(`Hola ${usuario.username}, ${saludo}`);
        }
    }, []);

    return (
        <div className="perfil">
            <div id="fecha">{fecha}</div>
            <h2 id="saludo">{saludo}</h2>
            <span>vamos a ordenar tus tareas</span>
        </div>
    );
}

export default PerfilTodo;
