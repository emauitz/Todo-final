import { useState } from 'react';
import NewTodo from './NewTodo.jsx';
import PerfilTodo from './PerfilTodo.jsx';
import TodoList from './TodoList.jsx';

function ContainerTodo () {

    return (
        <>
            <PerfilTodo />
            <NewTodo />
            <TodoList />
        </>
    );
};

export default ContainerTodo;