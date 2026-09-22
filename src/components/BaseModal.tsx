import { Modal, ModalProps, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';

const BaseModal = ({ children, ...rest }: ModalProps) => {
	return (
		<Modal
			{...rest}
			statusBarTranslucent
			navigationBarTranslucent
			backdropColor='rgba(0, 0, 0, 0.5)'
			animationType='fade'
		>
			<View style={styles.flex}>
				<KeyboardAwareScrollView
					contentContainerStyle={styles.modalContainer}
					style={styles.flex}
				>
					{children}
				</KeyboardAwareScrollView>
			</View>
		</Modal>
	);
};

export default BaseModal;

const styles = StyleSheet.create({
	flex: {
		flex: 1,
	},
	modalContainer: {
		flexGrow: 1,
	},
});
