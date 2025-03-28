import axios from 'axios';
import { Task } from '../types/task';
import { API_URL } from '@env';


export const taskApi = {
  getTasks: async (): Promise<Task[]> => {
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data;
  },

  getTask: async (id: string): Promise<Task> => {
    const response = await axios.get(`${API_URL}/tasks/${id}`);
    return response.data;
  },

  createTask: async (task: Omit<Task, 'id'>): Promise<Task> => {
    const response = await axios.post(`${API_URL}/tasks`, task);
    return response.data;
  },

  updateTask: async (id: string, task: Partial<Task>): Promise<Task> => {
    const response = await axios.put(`${API_URL}/tasks/${id}`, task);
    return response.data;
  },

  deleteTask: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/tasks/${id}`);
  }
}; 