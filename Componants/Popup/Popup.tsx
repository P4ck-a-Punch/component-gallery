import React from 'react';
import { useState } from 'react';
import {
	View,
	StyleSheet,
	StyleProp,
	ViewStyle,
	TouchableHighlight
} from 'react-native';
import {
	Text,
	Button,
	Modal,
	ModalBody,
	ModalFooter,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	CloseIcon,
	CheckIcon,
	Icon,
	Pressable,
	Box,
	Checkbox,
	CheckboxIcon,
	CheckboxIndicator,
	CheckboxLabel,
	VStack
} from '@gluestack-ui/themed';
import styles from './StyleSheet';

type PopupProps = {
	name: string;
	body: React.ReactNode;
	showBox: boolean;
	setShowBox: React.Dispatch<React.SetStateAction<boolean>>;
};

const Popup: React.FC<PopupProps> = ({ name, body, showBox, setShowBox }) => {
	const handleClick = () => {
		setShowBox(!showBox);
	};

	return (
		<Modal isOpen={showBox} onClose={handleClick}>
			<View style={styles.PopupViewStyle}>
				<ModalContent
					style={{
						height: 530,
						width: 324
					}}
				>
					<ModalHeader>
						<ModalCloseButton>
							<Icon as={CloseIcon} />
						</ModalCloseButton>
						<Text style={styles.PopupHeader}>{name}</Text>
					</ModalHeader>
					<ModalBody>{body}</ModalBody>
				</ModalContent>
			</View>
		</Modal>
	);
};

export default Popup;
