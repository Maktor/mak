import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<string[]>([]);
  const [todoInput, setTodoInput] = useState("");

  const handleAddTodo = () => {
    if (todoInput.trim() !== "") {
      setTodos([...todos, todoInput]);
      setTodoInput("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/");
  };

  const handleRemoveTodo = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>Todo List</h2>
        <input type="text" value={todoInput} onChange={(e) => setTodoInput(e.target.value)}/>
        <button onClick={handleAddTodo}>Add</button>
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              {todo}
              <button onClick={() => handleRemoveTodo(index)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
