import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '../constants/Colors'

const InfoLabel = ({ type }: { type: 'Concluída' | 'Pendente' }) => {

	const backStyle = {
		backgroundColor: type === 'Concluída' ? Colors.successBackground : Colors.warningBackground,
	}
	const textStyle = {
		color: type === 'Concluída' ? Colors.darkGreen : Colors.darkOrange,
	}

	return (
		<View style={[styles.container, backStyle]}>
			<View style={[styles.point, { backgroundColor: type === 'Concluída' ? Colors.successPrimary : Colors.warningPrimary }]} />
			<Text style={textStyle}>{type}</Text>
		</View>
	)
}

export default InfoLabel

const styles = StyleSheet.create({
	container: {
		flexShrink: 1,
		alignItems: 'center',
		paddingHorizontal: 7,
		paddingVertical: 3,
		borderRadius: 15,
		flexDirection: 'row',
		gap: 5
	},
	point: {
		width: 5,
		height: 5,
		borderRadius: 99,
	}
})