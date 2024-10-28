import { createContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

// Crear el contexto para el manejo de tareas
const TaskContext = createContext();

// Define el proveedor del contexto y el inicializador del estado
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
                    tasks: state.tasks.filter(task => task.id !== action.payload)
                };
            case 'TOGGLE_TASK':
                return {
                    ...state,
                    tasks: state.tasks.map(task =>
                        task.id === action.payload ? { ...task, completed: !task.completed } : task
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
        const loadTasks = async () => {
            const querySnapshot = await getDocs(collection(db, 'tareas'));
            const tareas = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            dispatch({ type: 'LOAD_TASKS', payload: tareas });
        };
        loadTasks();
    }, []);

    const addTask = async (task) => {
        const docRef = await addDoc(collection(db, 'tareas'), task);
        dispatch({ type: 'ADD_TASK', payload: { id: docRef.id, ...task } });
    };

    const deleteTask = async (id) => {
        await deleteDoc(doc(db, 'tareas', id));
        dispatch({ type: 'DELETE_TASK', payload: id });
    };

    const toggleTask = async (id) => {
        const task = state.tasks.find(task => task.id === id);
        if (task) {
            await updateDoc(doc(db, 'tareas', id), { completed: !task.completed });
            dispatch({ type: 'TOGGLE_TASK', payload: id });
        }
    };

    return (
        <TaskContext.Provider value={{ state, dispatch, addTask, deleteTask, toggleTask }}>
            {children}
        </TaskContext.Provider>
    );
};

TaskProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export { TaskContext };
