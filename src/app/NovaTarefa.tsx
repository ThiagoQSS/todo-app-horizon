import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useEffect, useState } from 'react'
import { pageStyles } from '../constants/commomStyles'
import Ionicons from '@react-native-vector-icons/ionicons/static'
import { Colors, TextColors } from '../constants/Colors'
import CustomButton from '../components/CustomButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'

const NovaTarefa = () => {
	const [status, setStatus] = useState<'Pendente' | 'Concluída'>('Pendente');
	const [title, setTitle] = useState('');
	const [focused, setFocused] = useState(false);
	const router = useRouter();
	const errorMessage =
		title.length > 100 || title.length < 3
			? 'Título deve ter entre 3 e 100 caracteres'
			: '';

	return (
		<KeyboardAvoidingView
			style={styles.container}
			contentContainerStyle={styles.centeredModalContainer}
			behavior='padding'
		>
			<SafeAreaView style={styles.innerContainer} edges={['bottom']}>
				<View style={styles.innerRow}>
					<Text style={styles.title}>Nova Tarefa</Text>
					<Ionicons name='close-circle-sharp' size={30} color={Colors.gray} onPress={() => router.back()} />
				</View>

				<View style={styles.titleRow}>
					<Text style={styles.text}>Título *</Text>
					<Text style={styles.error}>{errorMessage}</Text>
				</View>
				<TextInput
					style={[styles.textinput, focused && styles.focusedInput]}
					placeholder='Descreva sua tarefa...'
					placeholderTextColor={Colors.gray2}
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
					value={title}
					onChangeText={(text) => setTitle(text.substring(0, 100))}
					multiline
				/>
				<Text style={[
					styles.smalltext,
					title.length >= 70 && styles.inputWarning,
					title.length === 100 && styles.inputError,
				]}>{100 - title.length} restantes</Text>

				<Text style={styles.text}>Status inicial</Text>

				<View style={styles.optionsRow}>
					<TouchableOpacity
						style={[styles.buttonOption, status === 'Pendente' && styles.pendenteSelected]}
						onPress={() => setStatus('Pendente')}
					>
						<Text style={status === 'Pendente' && styles.pendenteSelected}>Pendente</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.buttonOption, status === 'Concluída' && styles.concluidaSelected]}
						onPress={() => setStatus('Concluída')}
					>
						<Text style={status === 'Concluída' && styles.concluidaSelected}>Concluída</Text>
					</TouchableOpacity>
				</View>

				<CustomButton
					title='Criar Tarefa'
					onPress={() => router.back()}
					style={{ marginTop: 20 }}
					disabled={title.length < 3 || title.length > 100}
				/>
			</SafeAreaView>
		</KeyboardAvoidingView>
	)
}

export default NovaTarefa

const styles = StyleSheet.create({
	container: {
		// backgroundColor: 'pink',
		flex: 1,
		...pageStyles.hpadding,
	},
	innerContainer: {
		paddingVertical: 20
	},
	title: {
		fontSize: 24
	},
	innerRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	titleRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 20
	},
	optionsRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 10,
		gap: 10,
	},
	text: {
		color: TextColors.secondary,
		fontSize: 20,
	},
	error: {
		color: Colors.dangerRed,
		fontSize: 14
	},
	textinput: {
		borderWidth: 1,
		borderColor: Colors.gray2,
		borderRadius: 10,
		paddingHorizontal: 10,
		fontSize: 15,
		marginTop: 5,
		minHeight: 100,
		textAlignVertical: 'top'
	},
	focusedInput: {
		borderColor: Colors.primaryPurple
	},
	inputWarning: {
		color: Colors.warningPrimary
	},
	inputError: {
		color: Colors.dangerRed,
	},
	smalltext: {
		color: TextColors.tertiary,
		fontSize: 14,
		marginTop: 5,
		textAlign: 'right'
	},
	centeredModalContainer: {
	},
	buttonOption: {
		padding: 20,
		borderRadius: 15,
		borderWidth: 1,
		borderColor: Colors.gray2,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	pendenteSelected: {
		backgroundColor: Colors.warningBackground,
		borderColor: Colors.warningPrimary,
		color: Colors.warningPrimary,
	},
	concluidaSelected: {
		backgroundColor: Colors.successBackground,
		borderColor: Colors.successPrimary,
		color: Colors.successPrimary,
	}
})