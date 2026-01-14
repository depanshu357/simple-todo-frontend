import axios from "axios";
import type { Task, TaskRequest } from "../../types/Task";
import client from "../client";

const taskClient = axios.create({
    baseURL: `${client.defaults.baseURL}/tasks`,
    headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',  // Skip ngrok interstitial page
    }
})

taskClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('todoAuthToken');
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

// Handle 401/403 responses (expired token, unauthorized)
taskClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            // Token is invalid or expired - clear it and redirect to login
            localStorage.removeItem('todoAuthToken');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
)

export const taskService = {
    async getAllTasks(): Promise<Task[]> {
        const response = taskClient.get('/all')
        return (await response).data;
    },
    async createTask(task: TaskRequest): Promise<string> {
        const response = taskClient.post('/create', task);
        return (await response).data;
    },
    async editTask(task: Partial<Task>): Promise<Task> {
        const response = taskClient.put('/edit', task);
        return (await response).data;
    },
    async toggleDone(taskId: number): Promise<string> {
        const response = taskClient.put(`/${taskId}/toggle-done`);
        return (await response).data;
    },
    async deleteTask(taskId: number) {
        const response = taskClient.delete(`/${taskId}`);
        return (await response).data;
    }
}