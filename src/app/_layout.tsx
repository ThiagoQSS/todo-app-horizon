import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { KeyboardProvider } from 'react-native-keyboard-controller';

export default function RootLayout() {
	useEffect(() => {
		const initialize = async () => {
			console.log('INICIALIZAR BANCO AQUI');
		};

		initialize();
	}, []);

	return (
		<KeyboardProvider>
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name='index' />
				<Stack.Screen name='Detalhes' />
			</Stack>
		</KeyboardProvider>
	);
}
