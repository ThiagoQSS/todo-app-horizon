import React, { createContext, useContext, useEffect, useState } from 'react';
import { Task } from '../components/TaskCard';
import { checkIfSeeded, markAsSeeded } from '../database/tasksRepository';
import { deleteTaskInDb, getAllTasksInDb, initializeDatabase, insertTaskBatchInDb, insertTaskInDb, TaskRow, updateTaskInDb } from '../database/db';
import {
	fetchInitialTasks,
	createApiTask,
	updateApiTask,
	deleteApiTask,
} from '../services/tasksService';
import { AppToast } from '../utils/ToastManager';
import Toast from 'react-native-toast-message';

type TasksContextType = {
	tasks: Task[];
	databaseLoading: boolean;
	setDatabaseLoading: (loading: boolean) => void;
	getTasks: () => Promise<Task[]>;
	newestTaskId: number | null;
	toggleTask: (id: number) => void;
	addTask: (task: Task) => void;
	updateTask: (updatedTask: Task) => void;
	deleteTask: (id: number) => void;
	fetchInitialData: () => Promise<Task[]>;
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [newestTaskId, setNewestTaskId] = useState<number | null>(null);
	const [databaseLoading, setDatabaseLoading] = useState(true);

	useEffect(() => {
		const initialize = async () => {
			console.log("Initializing database...");
			await initializeDatabase();
			await fetchInitialData();
			setDatabaseLoading(false);
			console.log("Database initialized.");
		};

		initialize();
	}, []);

	const fetchInitialData = async (): Promise<Task[]> => {
		const has_seeded = await checkIfSeeded();
		if (has_seeded) {
			const tasks: Task[] = await getAllTasksInDb();
			setTasks(tasks);
			return tasks;
		} else {
			try {
				const tasks = await fetchInitialTasks();
				if (tasks.length > 0) {
					setTasks(tasks);
					await insertTaskBatchInDb(tasks);
					await markAsSeeded();
				} else {
					AppToast.offlineWarning();
				}
				return tasks;
			} catch (e) {
				console.warn(e);
				Toast.show({ text1: "Erro ao inicializar", text2: "Algo deu errado ao inicializar as tarefas." });
				return [];
			}
		};
	}

	const getTasks = async (): Promise<Task[]> => {
		const localTasks = await getAllTasksInDb();
		setTasks(localTasks);
		return localTasks;
	};

	const toggleTask = async (id: number) => {
		const currentTask = tasks.find((t) => t.id === id);
		if (!currentTask) return;

		const nextCompletedState = !currentTask.completed;
		// 1. Atualização Otimista na UI
		setTasks((prev) =>
			prev.map((t) => (t.id === id ? { ...t, completed: nextCompletedState } : t))
		);
		// 2. Persistência no SQLite
		try {
			await updateTaskInDb(id, currentTask.title, nextCompletedState);
		} catch (e) {
			console.warn(e);
			AppToast.databaseError();
		}

		// 3. Chamada à API em segundo plano
		updateApiTask(id, currentTask.title, nextCompletedState).catch(() => { });
	};

	const addTask = async (newTaskData: Omit<Task, 'id'>) => {
		// 1. Insere primeiro no SQLite para gerar o autoincrement ID
		try {
			const newId = await insertTaskInDb(newTaskData.title, newTaskData.completed);
			const newTask: Task = {
				id: newId,
				title: newTaskData.title,
				completed: newTaskData.completed,
			};

			setTasks((prev) => [...prev, newTask]);

			setNewestTaskId(newId);

			setTimeout(() => setNewestTaskId(null), 1500);

			// 3. Notifica a API simulada
			createApiTask(newTask.title, newTask.completed).catch((err) =>
				AppToast.syncError()
			).then(() => AppToast.taskCreated(newTask.title));
		} catch (e) {
			console.warn(e);
			AppToast.databaseError();
		}

	};

	const updateTask = async (updatedTask: Task) => {
		// 1. Atualização Otimista na UI
		setTasks((prev) =>
			prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
		);

		// 2. Persistência no SQLite
		try {
			await updateTaskInDb(
				updatedTask.id,
				updatedTask.title,
				updatedTask.completed
			);
		} catch (e) {
			console.warn(e);
			AppToast.databaseError();
		}

		// 3. API Sync
		updateApiTask(
			updatedTask.id,
			updatedTask.title,
			updatedTask.completed,
		).catch(() => AppToast.offlineWarning()).then(() => AppToast.taskUpdated());
	};

	const deleteTask = async (id: number) => {
		// 1. Atualização Otimista na UI
		setTasks((prev) => prev.filter((t) => t.id !== id));

		// 2. Remoção do SQLite
		try {
			await deleteTaskInDb(id);
		} catch (e) {
			console.warn(e);
			AppToast.databaseError();
		}

		// 3. API Sync
		deleteApiTask(id).catch((err) =>
			AppToast.offlineWarning()
		).then(() => AppToast.taskDeleted());
	};

	return (
		<TasksContext.Provider
			value={{
				tasks,
				databaseLoading,
				setDatabaseLoading,
				getTasks,
				newestTaskId,
				toggleTask,
				addTask,
				updateTask,
				deleteTask,
				fetchInitialData
			}}
		>
			{children}
		</TasksContext.Provider>
	);
};

export const useTasks = () => {
	const context = useContext(TasksContext);
	if (!context) throw new Error('useTasks deve ser usado dentro de TasksProvider');
	return context;
};