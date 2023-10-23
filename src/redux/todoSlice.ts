import { createSlice} from "@reduxjs/toolkit";
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
      const todoIndex = state.findIndex(
        (todo) => todo.id === action.payload.editItemId
      );
      state[todoIndex].text = action.payload.editedText;

    },
    removedChecked: (state, action) => {
      
     for(let i = 0; i < state.length; i++){
    const ArrIndex = state.findIndex(
      (todo) => todo.completed === action.payload
    );
      if(ArrIndex > -1){
          state.splice(ArrIndex, 1);
      }        
  }
   
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
export const { addTodo, editTodo, removedChecked, toggleComplete, deleteTodo } =
  todoSlice.actions;
export default todoSlice.reducer;
