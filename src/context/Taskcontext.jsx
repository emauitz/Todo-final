import { createContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';

// Crear el contexto para el manejo de tareas
const TaskContext = createContext();

// Definimos el proveedor del contexto y el inicializador del estado
export const TaskProvider = ({ children }) => {
    const initialState = {
        user: {
            username: 'Usuario de ejemplo',
            email: 'usuario@example.com'
        },
        tasks: []
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case 'ADD_TASK':
                return {
                    ...state,
                    tasks: [...state.tasks, action.payload]
                };
            case 'DELETE_TASK':
                return {
                    ...state,
                    tasks: state.tasks.filter(task => task.id !== action.payload.id)
                };
            case 'TOGGLE_TASK':
                return {
                    ...state,
                    tasks: state.tasks.map(task =>
                        task.id === action.payload.id ? { ...task, completed: !task.completed } : task
                    )
                };
            case 'LOAD_TASKS':
                return {
                    ...state,
                    tasks: action.payload
                };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const tareasGuardadas = JSON.parse(localStorage.getItem('tareas')) || [];
        dispatch({ type: 'LOAD_TASKS', payload: tareasGuardadas });
    }, []);

    useEffect(() => {
        localStorage.setItem('tareas', JSON.stringify(state.tasks));
    }, [state.tasks]);

    return (
        <TaskContext.Provider value={{ state, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
};

TaskProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default TaskContext;
