import React, { useState } from "react";
import * as uuid from "uuid";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  deleteTodo,
  toggleTodo,
  clearCompleted,
  categoryFilter,
} from "./todoSlice";

function Todo() {
  const [todoItem, setTodoItem] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const state = useSelector((state) => state.todo);
  console.log(state, "state");
  const todoArray = useSelector((state) => state.todo.todos);

  const categoryState = useSelector((state) => state.todo.category);

  let filteredTodos = [];

  if (categoryState === "All") {
    filteredTodos = todoArray;
  } else if (categoryState === "Completed") {
    filteredTodos = todoArray.filter((todo) => todo.completed === true);
  } else if (categoryState === "Active") {
    filteredTodos = todoArray.filter((todo) => todo.completed === false);
  }

  const numberOfTodosLeft = todoArray.filter(
    (todo) => todo.completed === false
  ).length;
  const dispatch = useDispatch();

  return (
    <div className="App">
      <div className="todos">
        <header>
          <h1>todos</h1>
          <div className="new-todo">
            <input
              onChange={(e) => setTodoItem(e.target.value)}
              className="enter-todo"
              type="text"
              placeholder="What needs to be done?"
              autoFocus
            />
            <button
              onClick={() =>
                dispatch(
                  addTodo({ id: uuid.v4(), title: todoItem, completed: false })
                )
              }
            >
              Add Todo
            </button>
          </div>
        </header>

        <section className="todo-list">
          <ul style={{ listStyle: "none" }}>
            {filteredTodos.map((todo) => (
              <li key={todo.id} className="todo-item">
                <input
                  className="checkbox-round"
                  type="checkbox"
                  onClick={() => {
                    dispatch(toggleTodo(todo.id));
                  }}
                />
                {todo.completed ? (
                  <label style={{ textDecoration: "line-through" }}>
                    {todo.title}
                  </label>
                ) : (
                  <label>{todo.title}</label>
                )}
                <div>
                  <button
                    onClick={() => dispatch(deleteTodo(todo.id))}
                    className="delete-button"
                  >
                    X
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="todo-info">
            <span>
              {numberOfTodosLeft} Todo{numberOfTodosLeft > 1 ? "s" : ""} Left
            </span>
            <div className="todo-info-buttons">
              <button
                style={{
                  backgroundColor: activeFilter === "All" ? "pink" : "",
                }}
                onClick={(e) => {
                  setActiveFilter(e.target.innerHTML);
                  dispatch(categoryFilter(e.target.innerHTML));
                }}
              >
                All
              </button>
              <button
                style={{
                  backgroundColor: activeFilter === "Active" ? "pink" : "",
                }}
                onClick={(e) => {
                  setActiveFilter(e.target.innerHTML);
                  dispatch(categoryFilter(e.target.innerHTML));
                }}
              >
                Active
              </button>
              <button
                style={{
                  backgroundColor: activeFilter === "Completed" ? "pink" : "",
                }}
                onClick={(e) => {
                  setActiveFilter(e.target.innerHTML);
                  dispatch(categoryFilter(e.target.innerHTML));
                }}
              >
                Completed
              </button>
            </div>
            <button onClick={() => dispatch(clearCompleted())}>
              Clear Completed
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Todo;
