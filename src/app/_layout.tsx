import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { TasksProvider } from '../hooks/useTasks';

export default function RootLayout() {
	useEffect(() => {
		const initialize = async () => {
			console.log('INICIALIZAR BANCO AQUI');
		};

		initialize();
	}, []);

	return (
		<KeyboardProvider>
			<TasksProvider>
				<Stack screenOptions={{ headerShown: false }}>
					<Stack.Screen name='index' />
					<Stack.Screen name='Detalhes' />
					<Stack.Screen
						name='NovaTarefa'
						options={{
							presentation: 'formSheet',
							sheetAllowedDetents: 'fitToContents',
							sheetInitialDetentIndex: 0,
							sheetGrabberVisible: true,
							sheetCornerRadius: 24,
							sheetLargestUndimmedDetentIndex: 'none',
						}}
					/>
				</Stack>
			</TasksProvider>
		</KeyboardProvider>
	);
}
