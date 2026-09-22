import { Stack } from 'expo-router';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { TasksProvider } from '../hooks/useTasks';
import Toast from 'react-native-toast-message';

export default function RootLayout() {
	return (
		<KeyboardProvider>
			<TasksProvider>
				<Stack screenOptions={{ headerShown: false }}>
					<Stack.Screen name='index' />
					<Stack.Screen
						name='Detalhes'
						options={{
							headerShown: true,
							headerTitle: 'Detalhes da Tarefa',
						}}
					/>
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
				<Toast />
			</TasksProvider>
		</KeyboardProvider>
	);
}
