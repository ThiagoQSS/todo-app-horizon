
import React, { ReactNode } from 'react';
import {
	ActivityIndicator,
	StyleProp,
	StyleSheet,
	Text,
	TextStyle,
	TouchableOpacity,
	TouchableOpacityProps,
	View,
} from 'react-native';
import { Colors } from '../constants/Colors';

interface CustomButtonProps extends TouchableOpacityProps {
	onPress: () => void;
	title: string;
	half?: boolean;
	negative?: boolean;
	positive?: boolean;
	loading?: boolean;
	small?: boolean;
	color?: string;
	icon?: ReactNode;
	textStyle?: StyleProp<TextStyle>;
}

const CustomButton = ({
	onPress,
	title,
	half,
	negative,
	positive,
	loading,
	small,
	color,
	icon,
	textStyle,
	...rest
}: CustomButtonProps) => {
	return (
		<TouchableOpacity
			{...rest}
			style={[
				styles.container,
				rest.style,
				half && styles.half,
				negative && styles.negative,
				positive && styles.positive,
				small && styles.small,
				color && { backgroundColor: color },
				rest.disabled && styles.disabled,
			]}
			onPress={onPress}
		>
			{loading ? (
				<ActivityIndicator
					size='small'
					color={StyleSheet.flatten(textStyle)?.color ?? 'white'}
				/>
			) : (
				<View style={styles.contentRow}>
					<Text style={[styles.text, textStyle]}>{title}</Text>
					{icon}
				</View>
			)}
		</TouchableOpacity>
	);
};

export default CustomButton;

const styles = StyleSheet.create({
	container: {
		alignSelf: 'stretch',
		backgroundColor: Colors.primaryPurple,
		alignItems: 'center',
		justifyContent: 'center',
		height: 50,
		width: 'auto',
		paddingHorizontal: 15,
		borderRadius: 10,
	},
	half: {
		width: '47%',
	},
	negative: {
		backgroundColor: Colors.warningBackground,
	},
	positive: {
		backgroundColor: Colors.successBackground,
	},
	text: {
		color: 'white',
	},
	contentRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	small: {
		alignSelf: 'baseline',
	},
	disabled: {
		backgroundColor: '#b0b0b0',
	},
});
