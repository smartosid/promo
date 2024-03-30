import React, { useState } from 'react';
import './App.css'; // Import CSS file for styling

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, newTodo]);
      setNewTodo('');
    }
  };

  const removeTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  return (
    <div className="todo-card">
      <h2 className="todo-title">TASK MASTER</h2>
      <div className="todo-input-container">
        <input type="text" value={newTodo} onChange={handleInputChange} placeholder="Tasks which has to done" className="todo-input" />
        <button onClick={addTodo} className="add-button">Add</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className="todo-item">
            {todo}
            <button onClick={() => removeTodo(index)} className="remove-button">Done</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
