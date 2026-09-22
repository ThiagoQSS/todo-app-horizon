import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, TextColors } from '../constants/Colors';
import { pageStyles } from '../constants/commomStyles';
import CustomSearchBar from '../components/CustomSearchBar';
import TaskCard, { Task } from '../components/TaskCard';
import { useState } from 'react';
import FloatingActionButton from '../components/FloatingActionButton';
import TabSelector from '../components/TabSelector';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { useTasks } from '../hooks/useTasks';
import ListaVazia from '../components/ListaVazia';

export type Tab = "Todas" | "Pendentes" | "Concluídas"

export default function index() {
	const [selectedTab, setSelectedTab] = useState<Tab>("Todas");
	const [searchQuery, setSearchQuery] = useState('');
	const router = useRouter();

	const { tasks, newestTaskId, toggleTask } = useTasks();
	const filteredTasks = searchFilteredData(
		tabFilteredData(tasks, selectedTab),
		searchQuery
	);

	return (
		<View style={styles.container}>
			<StatusBar style='auto' />

			<SafeAreaView style={styles.topBox} edges={['top']}>
				<Text style={styles.title}>Minhas Tarefas</Text>
				<Text style={styles.subtitle}>{tasks.filter((task) => !task.completed).length} tarefas pendentes</Text>
				<CustomSearchBar
					value={searchQuery}
					onChangeText={setSearchQuery}
				/>
				<TabSelector
					tabs={["Todas", "Pendentes", "Concluídas"]}
					selectedTab={selectedTab}
					setSelectedTab={setSelectedTab}
				/>
			</SafeAreaView>

			<View style={styles.flatlistContainer}>
				<Animated.FlatList
					data={filteredTasks.toReversed()}
					keyExtractor={(item) => `${item.id}`}
					renderItem={({ item }) => <TaskCard task={item} isNew={item.id === newestTaskId} onToggle={toggleTask} />}
					contentContainerStyle={styles.flatlistContent}
					itemLayoutAnimation={LinearTransition.springify()}
					ListEmptyComponent={() => <ListaVazia selectedTab={selectedTab} />}
				/>
			</View>

			<SafeAreaView edges={['bottom']} style={styles.floatingButtonContainer}>
				<FloatingActionButton onPress={() => router.navigate('/NovaTarefa')} />
			</SafeAreaView>
		</View>
	);
}

const tabFilteredData = (data: Task[], selectedTab: "Todas" | "Pendentes" | "Concluídas") => {
	if (selectedTab === "Todas") return data;
	if (selectedTab === "Pendentes") return data.filter(task => !task.completed);
	if (selectedTab === "Concluídas") return data.filter(task => task.completed);
	return data;
}

const searchFilteredData = (data: Task[], searchQuery: string) => {
	if (searchQuery === '') return data;
	return data.filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase()));
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
		paddingBottom: 5
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
		paddingTop: 15,
		paddingBottom: 100,
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
