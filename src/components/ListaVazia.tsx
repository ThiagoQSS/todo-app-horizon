import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tab } from '../app'
import Ionicons from '@react-native-vector-icons/ionicons/static'
import FontAwesome6 from '@react-native-vector-icons/fontawesome6/static'
import { Colors, TextColors } from '../constants/Colors'

const ListaVazia = ({ selectedTab }: { selectedTab: Tab }) => {

	let text;

	if (selectedTab === 'Pendentes') text = 'Nenhuma tarefa pendente';
	else if (selectedTab === 'Concluídas') text = 'Nenhuma tarefa concluida';
	else if (selectedTab === 'Todas') text = 'Nenhuma tarefa.\nClique no botão abaixo para adicionar uma tarefa';

	return (
		<View style={styles.container}>
			<FontAwesome6 name='clipboard-check' size={70} color={Colors.gray} iconStyle='solid' />
			<Text style={styles.text}>{text}!</Text>
		</View>
	)
}

export default ListaVazia

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		gap: 10
	},
	text: {
		fontSize: 15,
		color: TextColors.secondary,
		textAlign: 'center',
		width: '70%'
	}
})