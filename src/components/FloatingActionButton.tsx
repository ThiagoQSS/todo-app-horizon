import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'
import Ionicons from '@react-native-vector-icons/ionicons/static'

type FloatingActionButtonProps = {
	onPress: () => void
}

const FloatingActionButton = ({ onPress }: FloatingActionButtonProps) => {
	return (
		<TouchableOpacity style={styles.container} onPress={onPress}>
			<Ionicons name='add' size={40} color={Colors.white} />
		</TouchableOpacity>
	)
}

export default FloatingActionButton

const styles = StyleSheet.create({
	container: {
		borderRadius: 999,
		width: 60,
		height: 60,
		elevation: 3,
		backgroundColor: Colors.primaryPurple,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		color: Colors.white,
		fontSize: 45,
	}
});