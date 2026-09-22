import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { pageStyles } from '../constants/commomStyles';
import { Colors, TextColors } from '../constants/Colors';

export type Status = 'Pendente' | 'Concluída';

export type StatusSelectorProps = {
	status: Status;
	setStatus: (status: Status) => void;
}

const StatusSelector = ({ status, setStatus }: StatusSelectorProps) => {
	return (
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
	)
}

export default StatusSelector

const styles = StyleSheet.create({
	optionsRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 10,
		gap: 10,
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