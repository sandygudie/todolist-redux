import { createSlice } from "@reduxjs/toolkit";
import { Todo } from "../types";

const initialState = [] as Todo[];
const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };
      state.push(newTodo);
    },
    editTodo: (state, action) => {

      const todo = state.find((todo) => todo.id === action.payload.editItemId);
      if (todo) {
        todo.text = action.payload.text;
      }
      console.log(state)
return {...state,todo}
    
    },
    toggleComplete: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});
export const { addTodo, editTodo, toggleComplete, deleteTodo } =
  todoSlice.actions;
export default todoSlice.reducer;
