import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type TTodo = {
  title: string;
  description: string;
  isCompleted?: boolean;
  priority: string;
};

type TInitialState = {
  todos: TTodo[];
};

const initialState: TInitialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TTodo>) => {
      state.todos.push({ ...action.payload, isCompleted: false });
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((item) => item.id !== action.payload);
    },
    toggleComplete: (state, action: PayloadAction<string>) => {
      const task = state.todos.find((todo) => todo.id === action.payload);

      // by using [!], I am enforcing that state.isCompleted is not undefined
      task!.isCompleted = !task?.isCompleted;
    },
    sortByPendingTodoList: (state) => {
      // sort the state todoList array by isCompleted : false first in array
      state.todos = state.todos.sort(
        ({ isCompleted: stateA = false }, { isCompleted: stateB = false }) =>
          Number(stateB) - Number(stateA)
      );
      state.todos = state.todos.reverse();
    },
  },
});

export const { addTodo, removeTodo, toggleComplete, sortByPendingTodoList } =
  todoSlice.actions;

export default todoSlice.reducer;
