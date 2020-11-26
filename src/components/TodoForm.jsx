import React, { useState } from "react";
import "../App.css";

function TodoForm({ createTodo }) {
  const [newTodoValue, setNewTodoValue] = useState("");

  const handleCreateButtonClick = (e) => {
    e.preventDefault();
    createTodo(newTodoValue);
    setNewTodoValue("");
  };

  return (
    <>
      <form className="todo-form">
        <h1>What's the plan today?</h1>
        <input
          type="text"
          placeholder="Add a todo?"
          className="todo-input"
          onChange={(event) => setNewTodoValue(event.target.value)}
          value={newTodoValue}
        />
        <button className="todo-button" onClick={handleCreateButtonClick}>
          OK
        </button>
      </form>
    </>
  );
}

export default TodoForm;
