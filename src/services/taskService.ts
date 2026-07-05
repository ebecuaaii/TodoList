import axios from 'axios';
import { Task, TaskRequestDto } from '../types';

const API_BASE_URL = 'https://todolist-production-81f3.up.railway.app/api';

interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export const taskService = {
  getTasks: async (
    search: string,
    completed: boolean | null,
    page: number = 0,
    size: number = 5,
    sortBy: string = 'createdAt',
    direction: string = 'desc'
  ): Promise<PageResponse<Task>> => {
    const params: Record<string, any> = { page, size, sortBy, direction };
    if (search) params.search = search;
    if (completed !== null && completed !== undefined) params.completed = completed;

    const response = await axios.get<PageResponse<Task>>(`${API_BASE_URL}/tasks`, { params });
    return response.data;
  },

  getTaskById: async (id: number): Promise<Task> => {
    const response = await axios.get<Task>(`${API_BASE_URL}/tasks/${id}`);
    return response.data;
  },
  createTask: async (taskData: TaskRequestDto): Promise<Task> => {
    const response = await axios.post<Task>(`${API_BASE_URL}/tasks`, taskData);
    return response.data;
  },

  updateTask: async (id: number, taskData: TaskRequestDto): Promise<Task> => {
    const response = await axios.put<Task>(`${API_BASE_URL}/tasks/${id}`, taskData);
    return response.data;
  },

  deleteTask: async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/tasks/${id}`);
  },
  toggleTaskStatus: async (id: number): Promise<Task> => {
    const response = await axios.patch<Task>(`${API_BASE_URL}/tasks/${id}/toggle`);
    return response.data;
  }
};
