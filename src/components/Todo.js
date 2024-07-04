import React, { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Todo() {
  // store todos to an array  
  const [todos, setTodos] = useState([]);
  // set todo input from UI
  const [todoInput, setTodoInput] = useState('');
  // store the todo id to edit
  const [editId, setEditId] = useState(null);
  // store the edited todo
  const [editInput, setEditInput] = useState('');
  // store the initial todos list value on page refresh
  const isInitialMount = useRef(true);

  // Load todos from localStorage on component mount
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);
  }, []);

  // Save todos to localStorage whenever they change, except for the initial load
  // this way we can persist the todos list even after page refresh
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  // function to handle the input change and show error message
  const [isAnyInput, setIsAnyInput] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const handleChange = (e) => {
    const value = e.target.value;
    setTodoInput(value);
    // Validate if the input contains more than 5 words
    const letters = value.trim();
    console.log(letters);
    // set the isAnyInput state to true if input is not empty
    setIsAnyInput(letters.length > 0);
    // set the error message if input is less than 3 letters
    if (letters.length > 3) {
      setErrorMessage('');
    } else if (letters.length === 0) {
      setErrorMessage('');
    } else {
      setErrorMessage('Input must be more than 3 letters...');
    }
  };

  // function to add the todo to todos list
  const handleAdd = () => {
    if (!todoInput.trim()) {
      alert('Todo is empty. Please enter a todo item.');
      return;
    }
    const newTodo = {
      // Use current timestamp as a simple unique ID
      id: Date.now(),
      text: todoInput.trim(),
    };
    // Add new todo to the todos list using spread operator (...todos) to preserve the previous todos
    setTodos([...todos, newTodo]);
    // Clear input field after adding
    setTodoInput('');
  };

  // function to delete the todo from todos list
  const handleDelete = (todoId) => {
    // delete the todo value of the given ID
    const updatedTodos = todos.filter(todo => todo.id !== todoId);
    setTodos(updatedTodos);
  };

  // function to edit the todo from todos list
  const handleEdit = (todoId) => {
    // find the todo value of the given ID
    const todo = todos.find(todo => todo.id === todoId);
    // set the same todo Id for edited todo
    setEditId(todoId);
    // set the todo text to edit input field
    setEditInput(todo.text);
  };

  // function to save the edited todo to todos list
  const handleSaveEdit = (todoId) => {
    // find the todo's index with the given ID
    const index = todos.findIndex(todo => todo.id === todoId);
    // if todo is found
    if (index !== -1) {
      // create shallow copy of todos list  
      const updatedTodos = [...todos];
      // update the text value of the todo with the given ID
      updatedTodos[index] = { ...updatedTodos[index], text: editInput.trim() };
      // update the todos list with the updated todos list
      setTodos(updatedTodos);
    }
    // Clear editId and editInput after saving
    setEditId(null);
    setEditInput('');
  };

  // function to check if any checkbox is checked
  const [isAnyChecked, setIsAnyChecked] = useState(false);
  const handleCheckboxChange = () => {
    // will return true if any checkbox is checked
    const anyChecked = Array.from(document.querySelectorAll('input[type="checkbox"]')).some(checkbox => checkbox.checked);
    setIsAnyChecked(anyChecked);
  };
  // function to delete selected todos from todos list
  const handleDeleteSelected = () => {
    // get the todo ids from all the checked checkboxes
    const selectedIds = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => parseInt(checkbox.value));
    console.log(selectedIds);
    // filter out the todos with the selected ids
    const updatedTodos = todos.filter(todo => !selectedIds.includes(todo.id));
    // update the todos list with the updated todos list
    setTodos(updatedTodos);
    // Reset the isAnyChecked state
    setIsAnyChecked(false);
    };

  // Modal to confirm delete all todos
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    // show modal
    setShow(true);
  };
  // function to delete all todos from todos list
  const handleDeleteAll = () => {
    setTodos([]);
    setShow(false);
  };


  return (
    // margin: 0 auto; width: 50%; to center the div
    <div style={{ textAlign: 'center', padding: '20px', border: '1px solid black', margin: '0 auto', width: '50%' }}>
      
      <div style={{ marginBottom: '40px' }}>
        <h1>Todo App</h1>
      </div>
      <div style={{ marginBottom: '10px', border: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Add todo..."
          value={todoInput}
          //onChange={(e) => setTodoInput(e.target.value)}
          onChange={handleChange}
          required
          style={{ marginRight: '50px' }}
        />
        {/* <Button variant="success" onClick={handleAdd}>Add</Button> */}
        {/* If isAnyInput is false, !isAnyInput will be true. */}
        {/* If errorMessage is not null, !!errorMessage will be true. so disabled will be true. */}
        <Button variant="success" disabled={!isAnyInput || !!errorMessage} onClick={handleAdd}>Add</Button>
      </div>
      <div style={{ height: '15px', marginRight: '40px', marginBottom: '40px' }}>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>

      <div className="ToDoContainer" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '0px', padding: '10px', border: '1px solid black' }}>
        
        {/* Display message if no todos found */}
        {todos.length === 0 && <p>No todos found. Add a todo to get started!</p>}

        {/* Display todos list using map function, using key to locate it's value */}
        {todos.map((todo) => (
          <div key={todo.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px', padding: '5px 10px 5px 10px', border: '1px solid black', width: '85%' }}>
            
            {/* <span>{todo.text}</span>
            <Button variant="danger" onClick={() => handleDelete(todo.id)}>Delete</Button> */}

            {/* Display the todo text and edit input field once edit button is clicked*/}
            {editId === todo.id ? (
              <input
                type="text"
                value={editInput}
                onChange={(e) => setEditInput(e.target.value)}
                style={{ marginRight: '10px', flex: 1 }}
              />
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {/* // checkbox to select the todo item */}
                <input 
                  type="checkbox" 
                  value={todo.id} 
                  onChange={handleCheckboxChange}
                  style={{ marginRight: '10px' }} 
                />
                {/* // Display the todo text, large text will go to next line */}
                <span style={{ flex: 1, textAlign: 'left', overflow: 'hidden',  whiteSpace: 'normal', textOverflow: 'break-word', wordBreak: 'break-all', maxWidth: '250px', paddingBottom: '2px' }}>{todo.text}</span>
              </div>
            )}  
            {/* Display Save button if edit button is clicked */}
            {editId === todo.id ? (
              <div>  
                <Button variant="success" onClick={() => handleSaveEdit(todo.id)} style={{ marginRight: '15px' }} >Save</Button>
                <Button variant="secondary" onClick={() => setEditId(null)} style={{ marginLeft: '0px' }}>Cancel</Button>
              </div>
            ) : (
              // Display Edit and Delete buttons*/} 
              <div style={{ display: 'flex', gap: '10px'}}>
                <Button variant="warning" onClick={() => handleEdit(todo.id)} style={{ marginRight: '10px' }}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(todo.id)}>Delete</Button>
              </div>
            )}
            
          </div>
        ))}
      </div>

      {/* render Delete All button if todos list is not empty */}  
      {todos.length > 0 && (
        <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'center',  gap: '50px' }}>
          {/* if isAnyChecked is false (no checkboxes are checked), !isAnyChecked evaluates to true and button will be disabled. */}
          <Button variant="primary" disabled={!isAnyChecked} onClick={handleDeleteSelected}>Delete Selected</Button>
          {/* <Button variant="dark" onClick={handleDeleteAll}>Delete All</Button> */}
          <Button variant="dark" onClick={handleSubmit}>Delete All</Button>
        </div>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete All Alert !!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete all the todos ???</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDeleteAll}>Yes</Button>
          <Button variant="secondary" onClick={handleClose}>No</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default Todo;
