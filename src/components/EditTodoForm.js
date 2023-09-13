import React, { useState } from 'react';

export const EditTodoForm = ({ editTodo, task }) => {
  const [value, setValue] = useState(task.task);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent default action

    const trimmedValue = value.trim(); // Remove leading and trailing spaces

    if (trimmedValue) {
      editTodo(trimmedValue, task.id); // edit todo
      setError('');
    } else {
      setError('Task cannot be empty');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="todo-input" placeholder="Update task"/>
      <button type="submit" className="todo-btn"> Update Task </button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};
