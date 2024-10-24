
import NewTodo from '../ComponentesContainerTodo/NewTodo.jsx';
import PerfilTodo from '../ComponentesContainerTodo/PerfilTodo.jsx';
import TodoList from '../ComponentesContainerTodo/TodoList.jsx';

function ContainerTodo() {
    return (
        <div className="container-todo">
            <PerfilTodo />
            <NewTodo />
            <TodoList />
        </div>
    );
}

export default ContainerTodo;
