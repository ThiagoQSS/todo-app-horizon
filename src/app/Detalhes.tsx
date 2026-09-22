import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, TextColors } from '../constants/Colors';
import { pageStyles } from '../constants/commomStyles';
import { useState } from 'react';
import CustomInput from '../components/CustomInput';
import StatusSelector, { Status } from '../components/StatusSelector';
import CustomButton from '../components/CustomButton';
import { useTasks } from '../hooks/useTasks';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ConfirmationModal from '../components/ConfirmationModal';

const Detalhes = () => {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { tasks, updateTask, deleteTask } = useTasks();
	const task = tasks.find((t) => t.id === Number(id));

	const [title, setTitle] = useState(task?.title || '');
	const [focused, setFocused] = useState(false);
	const [status, setStatus] = useState<Status>(task?.completed ? 'Concluída' : 'Pendente');
	const [visible, setVisible] = useState(false);
	const router = useRouter();
	const errorMessage = title.length > 100 || title.length < 3 ? 'Título deve ter entre 3 e 100 caracteres' : '';

	const handleUpdate = () => {
		if (task) {
			updateTask({ ...task, title, completed: status === 'Concluída' });
			router.back();
		}
	}

	const handleDelete = () => {
		if (task) {
			deleteTask(task.id);
			router.back();
		} else {
			Alert.alert("Erro", "Tarefa não encontrada");
		}
	}

	return (
		<SafeAreaView style={styles.container} edges={['bottom']}>
			<CustomInput
				title='Título'
				placeholder='Descreva sua tarefa...'
				value={title}
				setValue={(value) => setTitle(value.substring(0, 100))}
				focused={focused}
				setFocused={setFocused}
				errorMessage={errorMessage}
			/>

			<Text style={styles.text}>Status atual</Text>
			<StatusSelector
				status={status}
				setStatus={setStatus}
			/>

			<View style={styles.buttonsContainer}>
				<CustomButton title='Salvar Alterações' onPress={handleUpdate} color={Colors.primaryPurple} disabled={errorMessage !== ''} />
				<CustomButton title='Excluir Tarefa' negative onPress={() => setVisible(true)} textStyle={{ color: Colors.dangerRed }} />
			</View>

			<ConfirmationModal
				visible={visible}
				onCancel={() => setVisible(false)}
				onConfirm={handleDelete}
			/>
		</SafeAreaView>
	);
};

export default Detalhes;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		...pageStyles.hpadding,
		paddingTop: 20,
		gap: 10,
	},
	text: {
		color: TextColors.secondary,
		fontSize: 20,
	},
	buttonsContainer: {
		gap: 10,
		marginTop: 40
	}
})
