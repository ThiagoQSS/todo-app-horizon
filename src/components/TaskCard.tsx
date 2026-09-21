import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '../constants/Colors'
import { Checkbox } from 'expo-checkbox';
import InfoLabel from './InfoLabel';
import { useState } from 'react';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';

export type Task = {
	id: number,
	title: string,
	date: string,
	completed: boolean
}

type TaskCardProps = {
	task: Task
}

const TaskCard = ({ task }: TaskCardProps) => {
	const [checked, setChecked] = useState(task.completed);

	return (
		<Animated.View
			style={styles.container}
			entering={FadeInDown.duration(150).springify()}
			exiting={FadeOutUp.duration(100)}
		>
			<View style={styles.innerRow}>
				<Checkbox
					value={checked}
					onValueChange={setChecked}
					style={{ borderRadius: 99, width: 20, height: 20 }}
				/>
				<Text style={{ textDecorationLine: checked ? 'line-through' : 'none', flexShrink: 1 }}>{task.title}</Text>
			</View>

			<View>
				<InfoLabel type={checked ? 'Concluída' : 'Pendente'} />
			</View>
		</Animated.View>
	)
}

export default TaskCard

const styles = StyleSheet.create({
	container: {
		width: '100%',
		minHeight: 70,
		backgroundColor: 'white',
		borderRadius: 20,
		elevation: 3,
		borderWidth: 1,
		borderColor: Colors.grayLight,
		padding: 15,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	innerRow: {
		flexDirection: 'row',
		flexShrink: 1,
		gap: 10,
		paddingRight: 5,
		// backgroundColor: 'pink'
	}
});