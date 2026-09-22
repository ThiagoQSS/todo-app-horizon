import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors, TextColors } from '../constants/Colors'
import { Checkbox } from 'expo-checkbox';
import InfoLabel from './InfoLabel';
import Animated, { FadeInDown, FadeOutUp, interpolateColor, useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';

export type Task = {
	id: number,
	title: string,
	completed: boolean
}

type TaskCardProps = {
	task: Task,
	onToggle: (id: number) => void,
	isNew: boolean
}

const TaskCard = ({ task, onToggle, isNew }: TaskCardProps) => {
	const router = useRouter();
	const onPress = () => router.navigate({ pathname: '/Detalhes', params: { id: task.id } });
	const scale = useSharedValue(isNew ? 0.95 : 1);
	const borderProgress = useSharedValue(isNew ? 0 : 1);
	const hasAnimated = useRef(false);

	useEffect(() => {
		if (!isNew || hasAnimated.current) return;

		hasAnimated.current = true;

		scale.value = withSequence(
			withTiming(1.15, { duration: 150 }),
			withTiming(1, { duration: 150 })
		);
		borderProgress.value = withTiming(1, { duration: 1200 });

	}, [isNew]);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: scale.value }],
		borderColor: interpolateColor(
			borderProgress.value,
			[0, 0.5, 1],
			[Colors.grayLight, Colors.primaryPurple, Colors.grayLight]
		)
	}));

	return (
		<Animated.View
			entering={FadeInDown.duration(150).springify()}
			exiting={FadeOutUp.duration(100)}
			style={styles.outerContainer}
		>
			<Animated.View
				style={[styles.container, animatedStyle]}
			>
				<TouchableOpacity
					onPress={onPress}
					style={styles.cardPressable}
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
				</TouchableOpacity>
			</Animated.View>
		</Animated.View>
	)
}

export default TaskCard

const styles = StyleSheet.create({
	container: {
		borderRadius: 20,
		borderWidth: 1,
		backgroundColor: 'white',
		borderColor: Colors.grayLight,
		flexDirection: 'row',
		flex: 1
	},
	outerContainer: {
		elevation: 3,
		width: '100%',
		minHeight: 70,
		borderRadius: 20,
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
	cardPressable: {
		flex: 1,
		flexDirection: 'row',
	},
});