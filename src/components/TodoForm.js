import React, { useState } from 'react';

export const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent default action

    const trimmedValue = value.trim(); // Remove spaces

    if (trimmedValue) {
      addTodo(trimmedValue); // add todo
      setValue(''); // clear form after submission
      setError('');
    } else {
      setError('Task cannot be empty');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="todo-input" placeholder="What is the task today?"/>
      <button type="submit" className="todo-btn"> Add Task </button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};
