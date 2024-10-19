import { useState } from 'react';
import CustomButton from '../Components/Button.jsx';
import CustomInput from '../Components/Input.jsx';
import { useTasks } from '../context/TasksContext';

function NewTodo() {
    const [nombre, setNombre] = useState('');
    const [fechaLimite, setFechaLimite] = useState('');
    const [horaLimite, setHoraLimite] = useState('');
    const [tipoTarea, setTipoTarea] = useState('');
    const { agregarTarea } = useTasks();

    const handleSubmit = (event) => {
        event.preventDefault();
        const tareaData = { nombre, fechaLimite, horaLimite, tipoTarea };
        agregarTarea(tareaData);
        setNombre('');
        setFechaLimite('');
        setHoraLimite('');
        setTipoTarea('');
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
            <CustomInput placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            <CustomInput placeholder="Fecha Límite" value={fechaLimite} onChange={(e) => setFechaLimite(e.target.value)} />
            <CustomInput placeholder="Hora Límite" value={horaLimite} onChange={(e) => setHoraLimite(e.target.value)} />
            <select value={tipoTarea} onChange={(e) => setTipoTarea(e.target.value)}>
                <option value="">Seleccionar tipo de tarea</option>
                <option value="personal">Personal</option>
                <option value="trabajo">Trabajo</option>
                <option value="otro">Otro</option>
            </select>
        </form>
        <CustomButton type="submit" label="Agregar Tarea" />
        </>
        
    )
}

export default NewTodo;
