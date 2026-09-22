import { ModalProps, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BaseModal from './BaseModal'
import CustomButton from './CustomButton'
import { Colors, TextColors } from '../constants/Colors'
import Ionicons from '@react-native-vector-icons/ionicons/static'

export type ConfirmationModalProps = ModalProps & {
	onCancel: () => void,
	onConfirm: () => void
}

const ConfirmationModal = ({ onCancel, onConfirm, ...rest }: ConfirmationModalProps) => {
	return (
		<BaseModal {...rest}>
			<View style={styles.centererContainer}>
				<View style={styles.container}>
					<View style={styles.iconBox}>
						<Ionicons name='warning-outline' size={45} color={Colors.dangerRed} />
					</View>

					<Text style={styles.title}>Excluir Tarefa?</Text>
					<Text style={styles.subtitle}>Esta ação não pode ser desfeita.</Text>

					<View style={styles.row}>
						<CustomButton
							title='Cancelar'
							onPress={onCancel}
							style={styles.cancelButton}
							textStyle={styles.cancelText}
						/>
						<CustomButton
							title='Excluir'
							onPress={onConfirm}
							style={styles.confirmButton}
						/>
					</View>
				</View>

			</View>
		</BaseModal>
	)
}

export default ConfirmationModal

const styles = StyleSheet.create({
	centererContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	iconBox: {
		backgroundColor: Colors.softRed,
		padding: 10,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 20
	},
	container: {
		backgroundColor: 'white',
		borderRadius: 15,
		padding: 20,
		paddingVertical: 30,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: 20,
	},
	subtitle: {
		fontSize: 16,
		color: 'gray',
		marginTop: 10,
	},
	row: {
		flexDirection: 'row',
		width: '80%',
		gap: 10,
		marginTop: 20
	},
	cancelButton: {
		flex: 1,
		backgroundColor: Colors.white,
		borderColor: TextColors.tertiary,
		borderWidth: 1
	},
	cancelText: {
		color: TextColors.primary
	},
	confirmButton: {
		flex: 1,
		backgroundColor: Colors.dangerRed
	},
	confirmText: {
		color: Colors.white
	}
})