import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, deleteTodo, allDeleteTodo, editTodo, completeTodo, setTodos } from '../redux/todoSlice';
import '../style/style.css';
import { MdDelete, MdEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

function TodoList() {
  const [inputValue, setInputValue] = useState('');
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todo);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
      dispatch(setTodos(savedTodos));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      dispatch(addTodo(inputValue));
      setInputValue('');
    }
  };

  const handleEdit = (id, text) => {
    setEditId(id);
    setEditValue(text);
  };

  const handleSaveEdit = () => {
    if (editValue.trim()) {
      dispatch(editTodo({
        id: editId,
        newText: editValue
      }));
      setEditId(null);
      setEditValue('');
    }
  };

  return (
    <div className="todo-container">
      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add todo"
        />
        <button type='submit'>Add</button>
      </form>

      <p>Todo:{todos.length}</p>
      
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            {editId === todo.id ? (
              <div>
                <input
                  className='editInput'
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button className='editButton' onClick={handleSaveEdit}>Save</button>
              </div>
            ) : (
              <>
                {todo.text}
                <div className='icons'>
                  <MdEdit onClick={() => handleEdit(todo.id, todo.text)} className="icon" />
                  <MdDelete onClick={() => dispatch(deleteTodo(todo.id))} className="icon delete" />
                  <FaCheck
                    onClick={() => dispatch(completeTodo(todo.id))}
                    className="icon"
                    style={{ color: todo.completed ? 'green' : 'gray' }}
                  />
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      {todos.length > 0 && (
        <button className="all-delete-button" onClick={() => dispatch(allDeleteTodo())}>
          All delete
        </button>
      )}
    </div>
  );
}

export default TodoList;
