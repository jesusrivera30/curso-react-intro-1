import { TodoContext } from '../TodoContext';
import './TodoCounter.css';
import React from 'react';

/* const estilos = {
    fontSize: '24px',
    textAlign: 'center',
    margin: 0,
    padding: '48px',
} */

function TodoCounter() {
    const {
        completedTodos,
        totalTodos
    } = React.useContext(TodoContext);
    
    return (
        <h1 className="TodoCounter">
            Haz completado <span>{completedTodos}</span> de <span>{totalTodos}</span> ToDos
        </h1>
    );
}

export { TodoCounter };