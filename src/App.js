import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Base URL for backend API
const API_BASE = 'http://localhost:5000/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', dueDate: '' });
  const [statusUpdateId, setStatusUpdateId] = useState(null);
  const [newStatus, setNewStatus] = useState('Pending');

  // Load tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get(API_BASE);
    setTasks(res.data);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // POST a new task to the backend
  const createTask = async () => {
    if (!form.title || !form.dueDate) {
      alert('Title and due date are required.');
      return;
    }

    try {
      await axios.post(API_BASE, {
        ...form,
        status: 'Pending',
      });
      setForm({ title: '', description: '', dueDate: '' });
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating task');
    }
  };

  // Delete a task by ID
  const deleteTask = async (id) => {
    await axios.delete(`${API_BASE}/${id}`);
    fetchTasks();
  };

  // Update task status
  const updateStatus = async () => {
    if (!statusUpdateId) return;
    await axios.patch(`${API_BASE}/${statusUpdateId}/status`, {
      status: newStatus,
    });
    setStatusUpdateId(null);
    setNewStatus('Pending');
    fetchTasks();
  };

  return (
    <div className="App">
      <header> 
        <img className="moj-logo" src="/moj-logo.svg" alt="Ministry of Justice" />
        <h1>Task Manager</h1>

        <div className="form">
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={form.title}
            onChange={handleInput}
          />
          <input
            type="text"
            name="description"
            placeholder="Description (optional)"
            value={form.description}
            onChange={handleInput}
          />
          <input
            type="datetime-local"
            name="dueDate"
            value={form.dueDate}
            onChange={handleInput}
          />
          <button onClick={createTask}>Add Task</button>
        </div>
      </header>

      <h2>Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <p><strong>{task.title}</strong> - {task.status}</p>
              <p>{task.description && <em>{task.description}</em>}</p>
              <p>Due: {new Date(task.dueDate).toLocaleString()}</p>
              <button onClick={() => deleteTask(task._id)}>Delete</button>
              <button onClick={() => setStatusUpdateId(task._id)}>Update Status</button>
            </li>
          ))}
        </ul>
      )}

      {statusUpdateId && (
        <div className="status-update">
          <h3>Update Status</h3>
          <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button onClick={updateStatus}>Update</button>
        </div>
      )}
    </div>
  );
}

export default App;