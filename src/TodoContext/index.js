import React from "react";
import { useLocalStorage } from "./useLocalStorage";

const TodoContext = React.createContext();

function TodoProvider({children}){
    //ToDos
  const {
    item: todos, 
    saveItem: saveTodos, 
    loading, 
    error
  } = useLocalStorage('ToDos_01', []);
  const completedTodos = todos.filter(todo => !!todo.completed).length;
  const totalTodos = todos.length;

  //ToDo Search
  const [searchValue, setSearchValue] = React.useState('');
  //console.log('Escribiste: ' + searchValue);

  //openModal
  const [openModal, setOpenModal] = React.useState(false);

  const searchTodos = todos.filter((todo) => {
    const todoText = todo.text.toLowerCase();
    const searchText = searchValue.toLowerCase();
    return todoText.includes(searchText);
  }); 

  const completeTodo = (text) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex(
      (todo) => todo.text === text
    );

    if (newTodos[todoIndex].completed === false){
      newTodos[todoIndex].completed = true;
    }
    else{
      newTodos[todoIndex].completed = false;
    }   

    saveTodos(newTodos);
  };

  const deleteTodo = (text) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex(
      (todo) => todo.text === text
    );

    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };

  const addTodo = (text) => {
    const newTodos = [...todos];
    newTodos.push({
      text,
      completed: false
    });
    saveTodos(newTodos);
  }

    return(
        <TodoContext.Provider value={{
            completedTodos,
            totalTodos,
            searchValue,
            setSearchValue,
            searchTodos,
            completeTodo,
            deleteTodo,
            loading,
            error,
            openModal,
            setOpenModal,
            addTodo
          }
        }>
            {children}
        </TodoContext.Provider>
    );
}

export {TodoContext, TodoProvider};