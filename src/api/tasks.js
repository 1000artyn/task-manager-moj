import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' }); // Adjust to backend port

export const getTasks = () => API.get('/tasks');
export const getTask = (id) => API.get(`/tasks/${id}`);
export const createTask = (task) => API.post('/tasks', task);
export const updateStatus = (id, status) => API.patch(`/tasks/${id}/status`, { status });
export const deleteTask = (id) => API.delete(`/tasks/${id}`);