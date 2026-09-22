import AsyncStorage from '@react-native-async-storage/async-storage';

const HAS_SEEDED_KEY = '@horizon_todo:has_seeded_data';

export async function markAsSeeded(): Promise<void> {
	await AsyncStorage.setItem(HAS_SEEDED_KEY, 'true');
}

export async function checkIfSeeded(): Promise<boolean> {
	const value = await AsyncStorage.getItem(HAS_SEEDED_KEY);
	return value === 'true';
}
