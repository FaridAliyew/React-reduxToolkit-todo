import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todo',
  initialState: [],
  reducers: {
    setTodos: (state, action) => {
      return action.payload;
    },

    addTodo: (state, action) => {
      state.push({
        id: Date.now(),
        text: action.payload,
        completed: false
      });
    },
    
    deleteTodo: (state, action) => {
      return state.filter(todo => todo.id !== action.payload);
    },
    allDeleteTodo: (state) => {
      return [];
    },
    editTodo: (state, action) => {
      const { id, newText } = action.payload;
      const todo = state.find(todo => todo.id === id);
      if (todo) {
        todo.text = newText;
      }
    },
    completeTodo: (state, action) => {
      const todo = state.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    }
  }
});

export const { setTodos, addTodo, deleteTodo, allDeleteTodo, editTodo, completeTodo } = todoSlice.actions;

export default todoSlice.reducer;
