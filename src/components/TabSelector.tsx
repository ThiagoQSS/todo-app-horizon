import { Colors } from '../constants/Colors';
import React, { useEffect, useState } from 'react';
import {
	LayoutRectangle,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

type TabSelectorProps<T extends string> = {
	selectedTab: T;
	setSelectedTab: (tab: T) => void;
	tabs: readonly T[];
};

const TabSelector = <T extends string>({
	selectedTab,
	setSelectedTab,
	tabs
}: TabSelectorProps<T>) => {
	const [tabPositions, setPositions] = useState<LayoutRectangle[]>([]);
	const currentTab = useSharedValue<LayoutRectangle>({
		x: 0,
		y: 0,
		width: 0,
		height: 0,
	});

	const animatedStyle = useAnimatedStyle(() => {
		return {
			left: withSpring(currentTab.value.x, { duration: 200 }),
			top: withSpring(currentTab.value.y, { duration: 200 }),
			width: withSpring(currentTab.value.width, { duration: 200 }),
			height: withSpring(currentTab.value.height, { duration: 200 }),
		};
	});

	useEffect(() => {
		const index = tabs.indexOf(selectedTab);
		if (tabPositions[index]) currentTab.value = tabPositions[index];
	}, [selectedTab, tabPositions, tabs, currentTab]);

	return (
		<View style={styles.container}>
			<Animated.View style={[styles.marker, animatedStyle]} />
			{tabs.map((tab, index) => (
				<Pressable
					onPress={() => setSelectedTab(tab)}
					key={`tab-${index}`}
					style={styles.tab}
					onLayout={(e) => {
						const layout = e.nativeEvent.layout;
						setPositions((prev) => {
							const copy = [...prev];
							copy[index] = layout;
							return copy;
						});
					}}
				>
					<Text
						style={[styles.text, selectedTab === tab && styles.selectedText]}
					>
						{tab}
					</Text>
				</Pressable>
			))}
		</View>
	);
};

export default TabSelector;

const styles = StyleSheet.create({
	container: {
		width: '100%',
		flexDirection: 'row',
		flexWrap: 'wrap',
		backgroundColor: Colors.white,
		borderRadius: 8,
	},
	tab: {
		flex: 1,
		paddingVertical: 12,
		margin: 5,
		minWidth: 100,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
	marker: {
		backgroundColor: Colors.primaryPurple,
		borderRadius: 20,
		position: 'absolute',
	},
	text: {
		textAlign: 'center',
	},
	selectedText: {
		fontWeight: 'bold',
		color: Colors.white,
	},
});
