import * as SQLite from 'expo-sqlite';
import { Task } from '../components/TaskCard';

export type TaskRow = {
	id: number;
	title: string;
	completed: number; // 0 ou 1
};

const getDbConnection = async (): Promise<SQLite.SQLiteDatabase> => {
	const db = await SQLite.openDatabaseAsync('todohorizon.db', {
		useNewConnection: true,
	});
	return db;
};

const initializeDatabase = async () => {
	const db = await getDbConnection();
	await db.execAsync(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY NOT NULL, 
      title TEXT, 
      completed INTEGER NOT NULL DEFAULT 0
    );
  `);
};

const insertTaskInDb = async (
	title: string,
	completed: boolean,
): Promise<number> => {
	const completedValue = completed ? 1 : 0;
	const db = await getDbConnection();

	const result = await db.runAsync(
		'INSERT INTO tasks (title, completed) VALUES ($title,$completed)',
		{
			$title: title,
			$completed: completedValue,
		},
	);

	return result.lastInsertRowId;
};

const insertTaskBatchInDb = async (tasks: Task[]): Promise<void> => {
	if (!tasks || tasks.length === 0) return;

	const db = await getDbConnection();

	const formattedTasks = tasks.map((task) => ({
		id: task.id,
		title: task.title,
		completed: task.completed ? 1 : 0,
	}));

	const jsonPayload = JSON.stringify(formattedTasks);

	await db.runAsync(
		`
      INSERT OR REPLACE INTO tasks (id, title, completed)
      SELECT
        json_extract(value, '$.id'),
        json_extract(value, '$.title'),
        json_extract(value, '$.completed')
      FROM json_each(?)
    `,
		[jsonPayload],
	);
};

async function updateTaskInDb(
	id: number,
	title: string,
	completed: boolean,
): Promise<void> {
	const completedValue = completed ? 1 : 0;

	const db = await getDbConnection();
	await db.runAsync(
		'UPDATE tasks SET title = $title, completed = $completed WHERE id = $id',
		{
			$id: id,
			$title: title,
			$completed: completedValue,
		},
	);
}

async function deleteTaskInDb(id: number): Promise<number> {
	const db = await getDbConnection();
	await db.runAsync('DELETE FROM tasks WHERE id = $id', {
		$id: id,
	});
	return id;
}

async function getAllTasksInDb(): Promise<Task[]> {
	const db = await getDbConnection();
	const tasks: Task[] = (
		await db.getAllAsync<TaskRow>('SELECT * FROM tasks')
	).map((task) => ({
		id: task.id,
		title: task.title,
		completed: task.completed === 1,
	}));
	return tasks;
}

export {
	getDbConnection,
	initializeDatabase,
	insertTaskInDb,
	insertTaskBatchInDb,
	getAllTasksInDb,
	updateTaskInDb,
	deleteTaskInDb,
};
