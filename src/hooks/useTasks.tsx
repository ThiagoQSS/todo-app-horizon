import React, { createContext, useContext, useState } from 'react';
import { Task } from '../components/TaskCard';
import { DATA } from '../utils/tempData';

type TasksContextType = {
	tasks: Task[];
	newestTaskId: number | null;
	toggleTask: (id: number) => void;
	addTask: (task: Task) => void;
	updateTask: (updatedTask: Task) => void;
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
	const [tasks, setTasks] = useState<Task[]>(DATA);
	const [newestTaskId, setNewestTaskId] = useState<number | null>(null);

	const toggleTask = async (id: number | string) => {
		setTasks((prev) =>
			prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
		);

		// TODO: Atualizar no banco de dados local
		// await db.runAsync('UPDATE tasks SET completed = ? WHERE id = ?', ...);
	};

	const addTask = async (task: Task) => {
		setTasks((prev) => [...prev, task]);
		setNewestTaskId(task.id);
		setTimeout(() => setNewestTaskId(null), 1500);
		// TODO: Atualizar no banco de dados local
		// await db.runAsync('INSERT INTO tasks (id, title, date, completed) VALUES (?, ?, ?, ?)', ...);
	}

	const updateTask = async (updatedTask: Task) => {
		setTasks((prev) =>
			prev.map((t) => (t.id === updatedTask.id) ? updatedTask : t)
		);

		// TODO: Atualizar no banco de dados local
		// await db.runAsync('UPDATE tasks SET title = ? WHERE id = ?', ...);
	};

	return (
		<TasksContext.Provider value={{ tasks, newestTaskId, toggleTask, addTask, updateTask }}>
			{children}
		</TasksContext.Provider>
	);
};

export const useTasks = () => {
	const context = useContext(TasksContext);
	if (!context) throw new Error('useTasks deve ser usado dentro de TasksProvider');
	return context;
};