import useTaskContext from '../context/UseTaskContext.js';
import CardTarea from '../Components/CardTarea.jsx';

const TodoList = () => {
    const { state } = useTaskContext();
    const { tasks } = state;

    if (!tasks || tasks.length === 0) {
        return <p>No hay tareas disponibles</p>;
    }

    return (
        <div className="todo-list">
            {tasks.map((tarea) => (
                <CardTarea key={tarea.id} tarea={tarea} />
            ))}
        </div>
    );
};

export default TodoList;
