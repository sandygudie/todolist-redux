// import { configureStore } from "@reduxjs/toolkit";
// import boardReducer from "./boardSlice";

// const store = configureStore({
//   reducer: {
//     board: boardReducer
//   } ,
// });

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>
// export default store;

import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todoSlice";

export const store = configureStore({
  reducer: todosReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;