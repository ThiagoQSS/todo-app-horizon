import { StyleSheet, Text, TextInput, View } from 'react-native'
import { Colors, TextColors } from '../constants/Colors'

export type CustomInputProps = {
	title: string,
	placeholder: string,
	value: string,
	setValue: (value: string) => void,
	focused?: boolean,
	setFocused?: (value: boolean) => void,
	errorMessage: string,
}

const CustomInput = ({
	title,
	placeholder,
	value,
	setValue,
	focused,
	setFocused = () => { },
	errorMessage
}: CustomInputProps) => {
	return (
		<View>
			<View style={styles.titleRow}>
				<Text style={styles.text}>{title}</Text>
				<Text style={styles.error}>{errorMessage}</Text>
			</View>
			<TextInput
				style={[styles.textinput, focused && styles.focusedInput]}
				placeholder={placeholder}
				placeholderTextColor={Colors.gray2}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				value={value}
				onChangeText={setValue}
				multiline
			/>
			<Text style={[
				styles.smalltext,
				value.length >= 70 && styles.inputWarning,
				value.length === 100 && styles.inputError,
			]}>{100 - value.length} restantes</Text>
		</View>
	)
}

export default CustomInput

const styles = StyleSheet.create({
	titleRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 20
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
})