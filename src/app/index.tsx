import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, TextColors } from '../constants/Colors';
import { pageStyles } from '../constants/commomStyles';
import CustomSearchBar from '../components/CustomSearchBar';
import TaskCard, { Task } from '../components/TaskCard';
import { DATA } from '../utils/tempData';
import { useState } from 'react';
import FloatingActionButton from '../components/FloatingActionButton';
import TabSelector from '../components/TabSelector';
import Animated, { LinearTransition } from 'react-native-reanimated';

export default function index() {

	const [tasks, setTasks] = useState(DATA);
	const [selectedTab, setSelectedTab] = useState<"Todas" | "Pendentes" | "Concluídas">("Todas");

	return (
		<View style={styles.container}>
			<StatusBar style='auto' />
			<SafeAreaView style={styles.topBox} edges={['top']}>
				<Text style={styles.title}>Minhas Tarefas</Text>
				<Text style={styles.subtitle}>3 tarefas pendentes</Text>
				<CustomSearchBar />
				<TabSelector
					tabs={["Todas", "Pendentes", "Concluídas"]}
					selectedTab={selectedTab}
					setSelectedTab={setSelectedTab}
				/>
			</SafeAreaView>

			<View style={styles.flatlistContainer}>
				<Animated.FlatList
					data={filteredData(tasks, selectedTab)}
					keyExtractor={(item) => `${item.id}`}
					renderItem={({ item }) => <TaskCard task={item} />}
					contentContainerStyle={styles.flatlistContent}
					itemLayoutAnimation={LinearTransition.springify()}
				/>
			</View>

			<SafeAreaView edges={['bottom']} style={styles.floatingButtonContainer}>
				<FloatingActionButton onPress={() => { }} />
			</SafeAreaView>
		</View>
	);
}

const filteredData = (data: Task[], selectedTab: "Todas" | "Pendentes" | "Concluídas") => {
	if (selectedTab === "Todas") return data;
	if (selectedTab === "Pendentes") return data.filter(task => !task.completed);
	if (selectedTab === "Concluídas") return data.filter(task => task.completed);
	return data;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.surface,
	},
	topBox: {
		...pageStyles.hpadding,
		backgroundColor: Colors.white,
		gap: 10,
		borderBottomWidth: 1,
		borderBottomColor: Colors.grayLight,
	},
	title: {
		fontSize: 30,
	},
	subtitle: {
		color: TextColors.secondary,
	},
	flatlistContainer: {
		flex: 1
	},
	flatlistContent: {
		...pageStyles.hpadding,
		paddingVertical: 15,
		gap: 10,
	},
	floatingButtonContainer: {
		...pageStyles.hpadding,
		position: 'absolute',
		bottom: 0,
		right: 0,
		paddingBottom: 20
	}
});
