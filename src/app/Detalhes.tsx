import { StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, TextColors } from '../constants/Colors';
import { pageStyles } from '../constants/commomStyles';
import { useState } from 'react';
import CustomInput from '../components/CustomInput';
import StatusSelector, { Status } from '../components/StatusSelector';
import CustomButton from '../components/CustomButton';
import { useTasks } from '../hooks/useTasks';

const Detalhes = () => {
	const [title, setTitle] = useState('');
	const [focused, setFocused] = useState(false);
	const [status, setStatus] = useState<Status>('Pendente');
	const errorMessage = title.length > 100 || title.length < 3 ? 'Título deve ter entre 3 e 100 caracteres' : '';

	const { updateTask } = useTasks();

	const handleUpdate = () => {

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

			<Text style={styles.text}>Status inicial</Text>
			<StatusSelector
				status={status}
				setStatus={setStatus}
			/>

			<View style={styles.buttonsContainer}>
				<CustomButton title='Salvar Alterações' onPress={handleUpdate} color={Colors.primaryPurple} disabled={errorMessage !== ''} />
				<CustomButton title='Excluir Tarefa' negative onPress={() => { }} textStyle={{ color: Colors.dangerRed }} />
			</View>
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
