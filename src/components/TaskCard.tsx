import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors, TextColors } from '../constants/Colors'
import { Checkbox } from 'expo-checkbox';
import InfoLabel from './InfoLabel';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

export type Task = {
	id: number,
	title: string,
	date: string,
	completed: boolean
}

type TaskCardProps = {
	task: Task,
	onToggle: (id: number | string) => void
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const TaskCard = ({ task, onToggle }: TaskCardProps) => {
	const router = useRouter();
	const onPress = () => router.navigate({ pathname: '/Detalhes', params: { id: task.id } });

	return (
		<AnimatedTouchable
			style={styles.container}
			onPress={onPress}
			entering={FadeInDown.duration(150).springify()}
			exiting={FadeOutUp.duration(100)}
		>
			<Pressable
				style={styles.checkboxContainer}
				onPress={(e) => {
					e.stopPropagation();
					onToggle(task.id);
				}}
			>
				<Checkbox
					value={task.completed}
					onValueChange={() => onToggle(task.id)}
					style={{ borderRadius: 99, width: 20, height: 20 }}
				/>
			</Pressable>

			<View style={styles.textContainer}>
				<Text
					style={[task.completed && styles.completedText]}
					numberOfLines={3}
				>
					{task.title}
				</Text>
			</View>

			<View style={styles.labelContainer}>
				<InfoLabel type={task.completed ? 'Concluída' : 'Pendente'} />
			</View>
		</AnimatedTouchable>
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
		flexDirection: 'row',
	},
	checkboxContainer: {
		padding: 15,
	},
	labelContainer: {
		padding: 15,
		flexGrow: 1,
		alignItems: 'flex-end'
	},
	textContainer: {
		padding: 15,
		flexShrink: 1,
	},
	completedText: {
		textDecorationLine: 'line-through',
		color: TextColors.secondary,
	},
});