import React, { useState, useEffect } from 'react';
import { TodoForm } from './TodoForm';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';
import { v4 as uuidv4 } from 'uuid';

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));  
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    setError('')
  }, [todos]);

  const addTodo = (todo) => {
    const isDuplicate = todos.some((existingTodo) => existingTodo.task === todo);
  
    if (!isDuplicate) {
      setTodos([...todos, { id: uuidv4(), task: todo, completed: false, isEditing: false }]);
    } else {
      setError('Its a duplicate value');
    }
    
  };
  
  const deleteTodo = (id) => {
    setTodos(
      todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo)));
  };

  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo))
    );
  };

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done !</h1>
      <TodoForm addTodo={addTodo} />
      {error && <p className="error-message">{error}</p>}
     
      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} key={todo.id} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
      
    </div>
  );
};


