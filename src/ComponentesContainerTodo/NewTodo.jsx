import { useState } from 'react';
import CustomButton from '../Components/Button.jsx';
import CustomInput from '../Components/Input.jsx';
import Swal from 'sweetalert2';
import useTaskContext from '../context/UseTaskContext.js';

export function NewTodo() {
    const [nombre, setNombre] = useState('');
    const [fechaLimite, setFechaLimite] = useState('');
    const [horaLimite, setHoraLimite] = useState('');
    const [tipoTarea, setTipoTarea] = useState('');
    const { dispatch } = useTaskContext();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!nombre || !fechaLimite || !horaLimite || !tipoTarea) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No se completaron todos los campos!",
            });
            return;
        }

        const nuevaTarea = {
            id: Date.now(),
            nombre,
            fechaLimite,
            horaLimite,
            tipoTarea,
            completed: false
        };

        dispatch({ type: 'ADD_TASK', payload: nuevaTarea });
        Swal.fire({
            icon: "success",
            title: "Éxito!",
            text: "Tarea agregada correctamente!",
        });

        setNombre('');
        setFechaLimite('');
        setHoraLimite('');
        setTipoTarea('');
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CustomInput placeholder="Nombre" type="text" name="inp-Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                <CustomInput placeholder="Fecha Límite" type="date" name="inp-Fecha" value={fechaLimite} onChange={(e) => setFechaLimite(e.target.value)} />
                <CustomInput placeholder="Hora Límite" type="time" name="inp-Hora" value={horaLimite} onChange={(e) => setHoraLimite(e.target.value)} />
                <select value={tipoTarea} onChange={(e) => setTipoTarea(e.target.value)}>
                    <option value="">Seleccionar tipo de tarea</option>
                    <option value="personal">Personal</option>
                    <option value="trabajo">Trabajo</option>
                    <option value="otro">Otro</option>
                </select>
                <CustomButton type="submit" funcion={handleSubmit} label="Agregar Tarea" />
            </form>
        </>
    );
}

export default NewTodo;
