import { createContext, useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';

// Crear el contexto
const TasksContext = createContext();

// Crear un proveedor que maneje el estado y las tareas
const TasksProvider = ({ children }) => {
    const [tareas, setTareas] = useState([]);

    const agregarTarea = (tareaData) => {
        const { nombre, fechaLimite, horaLimite, tipoTarea } = tareaData;
        if (!nombre || !fechaLimite || !horaLimite || !tipoTarea) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor, completa todos los campos!',
            });
            return;
        }
        const id = uuidv4(); // Generar ID único para la tarea
        const nuevaTarea = {
            id,
            nombre,
            fechaLimite,
            horaLimite,
            tipoTarea,
            realizado: false,
            eliminado: false,
        };
        setTareas((prevTareas) => [...prevTareas, nuevaTarea]);
        // Guardar tarea en localStorage para el usuario actual
        const userData = JSON.parse(localStorage.getItem('login_success'));
        if (userData && userData.email) {
            const tareasGuardadas = JSON.parse(localStorage.getItem(`tareas_${userData.email}`)) || [];
            tareasGuardadas.push(nuevaTarea);
            localStorage.setItem(`tareas_${userData.email}`, JSON.stringify(tareasGuardadas));
        }
        Swal.fire({
            icon: 'success',
            title: 'Éxito!',
            text: 'Tu tarea fue creada correctamente!',
        });
    };

    const cargarTareas = () => {
        const userData = JSON.parse(localStorage.getItem('login_success'));
        if (userData && userData.email) {
            const tareasGuardadas = JSON.parse(localStorage.getItem(`tareas_${userData.email}`)) || [];
            setTareas(tareasGuardadas);
        }
    };

    const eliminarTarea = (id) => {
        setTareas((prevTareas) => prevTareas.map((tarea) =>
            tarea.id === id ? { ...tarea, eliminado: true } : tarea
        ));
        const userData = JSON.parse(localStorage.getItem('login_success'));
        if (userData && userData.email) {
            const tareasGuardadas = JSON.parse(localStorage.getItem(`tareas_${userData.email}`)) || [];
            const updatedTareas = tareasGuardadas.map((tarea) =>
                tarea.id === id ? { ...tarea, eliminado: true } : tarea
            );
            localStorage.setItem(`tareas_${userData.email}`, JSON.stringify(updatedTareas));
        }
    };

    const tareaRealizada = (id) => {
        setTareas((prevTareas) => prevTareas.map((tarea) =>
            tarea.id === id ? { ...tarea, realizado: !tarea.realizado } : tarea
        ));
        const userData = JSON.parse(localStorage.getItem('login_success'));
        if (userData && userData.email) {
            const tareasGuardadas = JSON.parse(localStorage.getItem(`tareas_${userData.email}`)) || [];
            const updatedTareas = tareasGuardadas.map((tarea) =>
                tarea.id === id ? { ...tarea, realizado: !tarea.realizado } : tarea
            );
            localStorage.setItem(`tareas_${userData.email}`, JSON.stringify(updatedTareas));
        }
    };

    return (
        <TasksContext.Provider value={{ tareas, agregarTarea, cargarTareas, eliminarTarea, tareaRealizada }}>
            {children}
        </TasksContext.Provider>
    );
};

export default TasksProvider;
