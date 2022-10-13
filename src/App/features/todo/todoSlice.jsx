import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [
      { id: 1, title: "Learn Redux", completed: false },
      { id: 2, title: "Create a Todo App", completed: false },
    ],
    category: "All",
  },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    clearCompleted: (state) => {
      state.todos = state.todos.filter((todo) => todo.completed === false);
    },
    categoryFilter: (state, action) =>{
        state.category = action.payload;
    }
  },
});

export const {
  addTodo,
  deleteTodo,
  toggleTodo,
  clearCompleted,
  categoryFilter,
} = todoSlice.actions;

export default todoSlice.reducer;
