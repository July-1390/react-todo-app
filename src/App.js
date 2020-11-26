import React, {useState} from "react";
import TodoForm from './components/TodoForm'
import TodoList from "./components/TodoList";
import "./App.css";


function App() {

  const defaultTodos = [
    {
      id: 1,
      text: "walk with a dog",
      isCompleted: false,
    },
    {
      id: 2,
      text: "buy bread",
      isCompleted: true,
    },
  ];
  
  const [todos, setTodos] = useState(defaultTodos);

  const createTodo = (text) => {
    if (text === "") {
      return;
    }

    const newTodo = {
      id: Math.floor(Math.random() * 10000),
      text: text,
      isCompleted: false,
    };

    const newTodos = [...todos, newTodo];

    setTodos(newTodos);
  };

  const removeTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const updateTodo = (id, newTodo) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return newTodo;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const completeTodo = (id) => {
    const updatedTodoComplete = todos.map(todo => {
      if(todo.id === id) {
        todo.isCompleted = !todo.isCompleted
      }
      return todo
    })
    setTodos(updatedTodoComplete);
  }

  return (
    <div className='todo-app'>
      <TodoForm createTodo={createTodo} />
        <TodoList todos={todos} removeTodo={removeTodo} updateTodo={updateTodo} updateTodoList={setTodos} completeTodo={completeTodo}/>
    </div>
  );
}

export default App;
