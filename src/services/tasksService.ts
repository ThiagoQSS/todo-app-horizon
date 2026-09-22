import { AxiosError, AxiosResponse } from 'axios';
import { api } from './api';
import { Task } from '../components/TaskCard';
import { AppToast } from '../utils/ToastManager';

export async function fetchInitialTasks(): Promise<Task[]> {
	try {
		const response = await api.get('/todos');
		console.log('Initial data fecthed: ', response.data.length);
		return response.data;
	} catch (e) {
		if (e instanceof AxiosError) console.warn(e.message);
		else console.warn('Error fetching tasks');
		return [];
	}
}

export const createApiTask = async (
	title: string,
	completed: boolean,
): Promise<Task> => {
	try {
		const response = await api.post<Task>('/todos', {
			title,
			completed,
			userId: 1,
		});
		return response.data;
	} catch (error) {
		console.warn('Erro ao criar tarefa na API:', error);
		throw error;
	}
};

/**
 * Atualiza o título e/ou estado de uma tarefa existente na API simulada
 */
export const updateApiTask = async (
	id: number,
	title: string,
	completed: boolean,
): Promise<Task> => {
	try {
		const response = await api.put<Task>(`/todos/${id}`, {
			id,
			title,
			completed,
			userId: 1,
		});
		return response.data;
	} catch (error) {
		console.warn(`Erro ao atualizar tarefa ${id} na API:`, error);
		throw error;
	}
};

/**
 * Remove uma tarefa da API simulada
 */
export const deleteApiTask = async (id: number): Promise<void> => {
	try {
		await api.delete(`/todos/${id}`);
	} catch (error) {
		console.warn(`Erro ao deletar tarefa ${id} na API:`, error);
		throw error;
	}
};
