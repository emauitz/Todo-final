
import { createContext, useContext, useReducer } from 'react';

// Creamos un contexto para el manejo de tareas
const TaskContext = createContext();

// Definimos el proveedor del contexto y el inicializador del estado
export const TaskProvider = ({ children }) => {
    // Creamos un estado inicial con una lista de tareas vacía
    const initialState = {
        user: {
            // Aquí podrías agregar campos del usuario (nombre, correo, etc.)
            username: 'Usuario de ejemplo',
            email: 'usuario@example.com'
        },
        tasks: [
            // Ejemplo de tarea predeterminada
            {
                id: 1,
                name: "Ejemplo de tarea",
                completed: false
            }
        ]
    };

    // Definimos las acciones para las operaciones CRUD
    const reducer = (state, action) => { // Reducer opera como un gestor, recibe vun estado y una accion. La accion puede ser Add_task, delete_task o toggle_task
        switch (action.type) {
            case 'ADD_TASK':
                // Lógica para agregar una nueva tarea
                return { 
                    ...state, 
                    tasks: [...state.tasks, action.payload] 
                };
            case 'DELETE_TASK':
                // Lógica para eliminar una tarea
                return { 
                    ...state, 
                    tasks: state.tasks.filter(task => task.id !== action.payload.id) 
                };
            case 'TOGGLE_TASK':
                // Lógica para marcar como completada o pendiente una tarea
                return {
                    ...state,
                    tasks: state.tasks.map(task =>
                        task.id === action.payload.id ? { ...task, completed: !task.completed } : task
                    )
                };
            default:
                return state;
        }
    };

    // Creamos el estado con el reducer y el estado inicial
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <TaskContext.Provider value={{ state, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
};

// Hook para usar el contexto en cualquier componente
export const useTaskContext = () => {
    return useContext(TaskContext);
};