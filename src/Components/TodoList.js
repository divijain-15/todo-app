import React, { useState,useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

function TodoList() {
  const [todos, setTodos] = useState([]); 
  
  const [newTodo, setNewTodo] = useState("");

  const saveData = (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };
  
  useEffect(() => {
    if (localStorage.getItem("todos")) {
      setTodos(JSON.parse(localStorage.getItem("todos")));
    }
  }, []);

  const addTodo = todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
    setNewTodo("")
    saveData(newTodos);
  };

  const clearButton = ()=>{
    setTodos([]);
  }
  
  const completeTodo = id => {
    let updatedTodos = todos.slice(0).reverse().map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };


  return (
    <>
    <div>
     <button onClick={clearButton} className="todo-button1">Reset</button>
    </div>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}

      />
    </>
  );
}

export default TodoList;
