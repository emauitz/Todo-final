import { useState } from 'react';
import Swal from 'sweetalert2';
import CustomInput from '../Components/Input.jsx'; // Asegúrate de tener este componente
import CustomButton from '../Components/Button.jsx'; // Asegúrate de tener este componente

export function NewTodo() {
    const [nombre, setNombre] = useState('');
    const [fechaLimite, setFechaLimite] = useState('');
    const [horaLimite, setHoraLimite] = useState('');
    const [tipoTarea, setTipoTarea] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        // Verificación de campos
        if (!nombre || !fechaLimite || !horaLimite || !tipoTarea) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No se completaron todos los campos!",
            });
            return;
        }

        const nuevaTarea = {
            nombre,
            fechaLimite,
            horaLimite,
            tipoTarea,
            realizado: false, // Por defecto la tarea no está realizada
            eliminado: false // Por defecto la tarea no está eliminada
        };

        // Obtener tareas anteriores guardadas en localStorage
        const tareasGuardadas = JSON.parse(localStorage.getItem('tareas')) || [];

        // Agregar la nueva tarea a la lista
        tareasGuardadas.push(nuevaTarea);

        // Guardar la lista actualizada en localStorage
        localStorage.setItem('tareas', JSON.stringify(tareasGuardadas));

        Swal.fire({
            icon: "success",
            title: "Éxito!",
            text: "Tarea agregada correctamente!",
        });

        // Limpiar los campos del formulario
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
            </form>
            <CustomButton type="submit" funcion={handleSubmit} label="Agregar Tarea" />
        </>
    );
}

export default NewTodo;