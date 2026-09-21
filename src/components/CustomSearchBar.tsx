import { StyleSheet, Text, TextInput, View } from 'react-native'
import { Colors } from '../constants/Colors'
import { Ionicons } from '@react-native-vector-icons/ionicons/static';

const CustomSearchBar = () => {
	return (
		<View style={styles.container}>
			<Ionicons name='search-sharp' size={17} color={Colors.gray} />
			<TextInput placeholder='Buscar tarefas...' style={styles.input} placeholderTextColor={Colors.gray} />
		</View>
	)
}

export default CustomSearchBar

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderColor: Colors.grayLight,
		backgroundColor: Colors.grayLight2,
		borderRadius: 10,
		paddingHorizontal: 10,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 5
	},
	input: {
		// backgroundColor: 'pink',
		flex: 1
	}
})