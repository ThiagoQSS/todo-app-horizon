import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { FlashList, FlashListRef, ListRenderItem } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, TextColors } from '../constants/Colors';
import { pageStyles } from '../constants/commomStyles';
import CustomSearchBar from '../components/CustomSearchBar';
import TaskCard, { Task } from '../components/TaskCard';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import FloatingActionButton from '../components/FloatingActionButton';
import TabSelector from '../components/TabSelector';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { useTasks } from '../hooks/useTasks';
import ListaVazia from '../components/ListaVazia';

export type Tab = "Todas" | "Pendentes" | "Concluídas"

const Separador = () => <View style={styles.height} />;

export default function index() {
	const [selectedTab, setSelectedTab] = useState<Tab>("Todas");
	const [searchQuery, setSearchQuery] = useState('');
	const router = useRouter();

	const { tasks, newestTaskId, toggleTask, databaseLoading } = useTasks();
	const flashListRef = useRef<FlashListRef<Task>>(null);

	useEffect(() => {
		const timer = setTimeout(() => {
			flashListRef.current?.scrollToOffset({
				offset: 0,
				animated: true,
			});
		}, 100);

		return () => clearTimeout(timer);
	}, [newestTaskId]);

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

	const filteredTasks = searchFilteredData(
		tabFilteredData(tasks, selectedTab),
		searchQuery
	);

	// 1. Memorize a lista invertida para a referência não mudar à toa no JS
	const reversedTasks = useMemo(() => {
		return [...filteredTasks].reverse();
	}, [filteredTasks]);

	// 2. RenderItem memorizado
	const renderItem: ListRenderItem<Task> = useCallback(
		({ item }) => (
			<TaskCard
				task={item}
				isNew={item.id === newestTaskId}
				onToggle={toggleTask}
			/>
		),
		[newestTaskId, toggleTask]
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

			{databaseLoading ? (
				<View style={styles.loadingContainer}>
					<Text style={styles.subtitle}>Carregando...</Text>
					<ActivityIndicator color={Colors.primaryPurple} size={45} />
				</View>
			) :
				<>
					<View style={styles.flatlistContainer}>
						<FlashList
							data={reversedTasks}
							ref={flashListRef}
							keyExtractor={(item) => `${item.id}`}
							renderItem={renderItem}
							ItemSeparatorComponent={Separador}
							contentContainerStyle={styles.flatlistContent}
							ListEmptyComponent={() => <ListaVazia selectedTab={selectedTab} query={searchQuery} />}
						/>
					</View>

					<SafeAreaView edges={['bottom']} style={styles.floatingButtonContainer}>
						<FloatingActionButton onPress={() => router.navigate('/NovaTarefa')} />
					</SafeAreaView>
				</>
			}
		</View>
	);
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
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	title: {
		fontSize: 30,
	},
	height: {
		height: 10,
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
	},
	floatingButtonContainer: {
		...pageStyles.hpadding,
		position: 'absolute',
		bottom: 0,
		right: 0,
		paddingBottom: 20
	}
});
