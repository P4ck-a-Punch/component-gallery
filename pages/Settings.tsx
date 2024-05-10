import React, { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Image, StyleSheet, TouchableHighlight } from 'react-native';
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
import Popup from '../Componants/Popup/Popup';
import SettingsCheckbox from '../Componants/SettingsCheckbox/SettingsCheckbox';


import { UserSettings } from '../types/UserSettings';
import { ValueStatePair } from '../types/ValueStatePair';

const {AuthKitAuthentication} = require('../Authentication');
const {TextEncoder} = require('text-encoding-polyfill');

/**React naviagtion stack for drop downs on click */
const userId: string = '3';

let hardSettings: any = {
	userInfo: {
		userName: 'sam_sulek',
		profilePicture: '../assets/goggins.jpeg',
		phoneNumber: '1-800-1234',
		email: 'samsulekfit@gmail.com',
		usesMetric: 'Imperal'
	},
	permsSettings: [
		{
			value: 'Contacts',
			state: false
		},
		{
			value: 'Camera',
			state: false
		},
		{
			value: 'Calendar',
			state: false
		}
	],
	notifsSettings: {
		type: [
			{
				value: 'Workout Reminders',
				state: false
			},
			{
				value: 'Meal Reminders',
				state: false
			}
		],
		mode: [
			{
				value: 'Push',
				state: false
			},
			{
				value: 'Email',
				state: false
			},
			{
				value: 'Text',
				state: false
			}
		]
	}
};

let modified = false;

/**Returns promise that will resolve to true on successful patch, false otherwise */
const updateSettings = async (settings: UserSettings): Promise<boolean> => {
	const response = await fetch(
		`https://yui8zhx0qj.execute-api.us-west-2.amazonaws.com/testStage/user/settings?userId=${userId}`,
		{
			method: 'PATCH',
			body: JSON.stringify(settings),
			headers: {
				'x-api-key': `${process.env.AWS_API_KEY}`
			}
		}
	);

	if (response.ok) return true;
	else {
		console.error(
			`Settings failed to update.\nReceived error from API: \n ${response.status} ${response.body}`
		);
		return false;
	}
};

/**Change get path to access user settings */
const fetchSettings = async (userId: string) => {
	try {
		const response = await fetch(
			`https://yui8zhx0qj.execute-api.us-west-2.amazonaws.com/testStage/user/settings?userId=${userId}`,
			{
				headers: {
					'x-api-key': `${process.env.AWS_API_KEY}`
				}
			}
		);
		return response.json();
	} catch (error) {
		console.log(error);
	}
};

export default function SettingsScreen() {
	const [showAccount, setShowAccount] = useState<boolean>(false);
	const [showNotifs, setShowNotifs] = useState<boolean>(false);
	const [showPerms, setShowPerms] = useState<boolean>(false);
	const [showAbout, setShowAbout] = useState<boolean>(false);
	const [logoutProcess, setLogoutProcess] = useState(false);

	const [settings, setSettings] = useState<UserSettings>({
		userInfo: {
			userName: '',
			profilePicture: '',
			phoneNumber: '',
			email: '',
			usesMetricSystem: true
		},
		permsSettings: [],
		notifsSettings: {
			type: [],
			mode: []
		}
	});

	useEffect(() => {
		// The following check prevents unnecessary API calls, so that it only happens when all windows are closed
			fetchSettings(userId).then((response) => {
				if (response) {
					handleSettings(response);
				} else
					console.log(
						`User settings for user with id "${userId}" failed to load`
					);
			});
	}, []);

	const handleSettings = (newSettings: UserSettings) => {
		setSettings(newSettings);
	};

	const handleAccount = () => {
		setShowAccount(!showAccount);

		if (modified)
			modified = !updateSettings(settings).then((resolve) => {
				return resolve ? true : false;
			});
	};
	const handleNotifs = () => {
		setShowNotifs(!showNotifs);

		if (modified)
			modified = !updateSettings(settings).then((resolve) => {
				return resolve ? true : false;
			});
	};
	const handlePerms = () => {
		setShowPerms(!showPerms);

		if (modified)
			modified = !updateSettings(settings).then((resolve) => {
				return resolve ? true : false;
			});
	};
	const handleAbout = () => {
		setShowAbout(!showAbout);
	};
	const handleLogout = () => {
		if (!logoutProcess) {
			setLogoutProcess(true);
			navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
		}
	};

	/**Returns an array with checkboxes for each of the elements in the array */
	const boxesToRender = (path: Paths<typeof settings>) => {
		if (path == undefined) {
			console.log('Path is undefined in boxesToRender call');
			return <View></View>;
		}

		return path.map((obj: ValueStatePair, i: number) => (
			<SettingsCheckbox
				key={i}
				label={obj['value']}
				state={obj['state']}
				onChange={() => {
					obj['state'] = !obj['state'];
					modified = true;
				}}
			></SettingsCheckbox>
		));
	};

	const handleAuth = () => {
		console.log("Handling Auth");
		AuthKitAuthentication().then((res) => {
			console.log("Resolved");
			console.log(JSON.stringify(res, undefined, 4))
		}, 
		(rej) => {
			console.log("Rejected");
			console.log(JSON.stringify(rej, undefined, 4))
		});
	}

	let pfpRadius = 215;

	const navigation = useNavigation();

	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: '#F8FDFF'
			}}
		>
			{/*Buttons*/}
			<Pressable style={styles.settingsButton} onPress={handleAccount}>
				<Text style={styles.settingsText}>Account</Text>
			</Pressable>
			<Line />
			<Pressable style={styles.settingsButton}>
				<Text style={styles.settingsText} onPress={handleNotifs}>
					Notifications
				</Text>
			</Pressable>
			<Line />
			<Pressable style={styles.settingsButton} onPress={handlePerms}>
				<Text style={styles.settingsText}>Permissions</Text>
			</Pressable>
			<Line />
			<Pressable style={styles.settingsButton} onPress={handleAbout}>
				<Text style={styles.settingsText}>About</Text>
			</Pressable>
			<Line />
			<Pressable style={styles.settingsButton} onPress={handleLogout}>
				<Text style={styles.settingsText}>Log Out</Text>
			</Pressable>
			<Line />

			{/**Functionality */}
			{/**Account Popup*/}
			<Popup
				name="Account"
				showBox={showAccount}
				setShowBox={setShowAccount}
				body={
					<ModalBody>
						<TouchableHighlight
							style={{
								borderRadius: pfpRadius / 2,
								width: pfpRadius,
								height: pfpRadius,
								marginHorizontal: 22,
								backgroundColor: 'grey',
								borderWidth: 5,
								borderColor: 'black',
								overflow: 'hidden'
							}}
						>
							<Image
								style={{
									justifyContent: 'center',
									width: pfpRadius,
									height: pfpRadius
								}}
								source={require('../assets/Sam Sulek Curling.jpg')}
							/>
						</TouchableHighlight>

						<Text></Text>
						<Text>Username: {settings['userInfo']['userName']}</Text>
						<Text>Phone Number: {settings['userInfo']['phoneNumber']}</Text>
						<Text>Email: {settings['userInfo']['email']}</Text>
						<Text>
							Metrics:{' '}
							{settings['userInfo']['usesMetricSystem'] ? 'Metric' : 'Imperial'}
						</Text>
					</ModalBody>
				}
			></Popup>

			{/**Notifications Popup */}
			<Popup
				name="Notifications"
				showBox={showNotifs}
				setShowBox={handleNotifs}
				body={
					<VStack space="4xl">
						<Text>Type</Text>
						{boxesToRender(settings['notifsSettings']['type'])}
						<Text>Mode</Text>
						{boxesToRender(settings['notifsSettings']['mode'])}
					</VStack>
				}
			></Popup>

			{/**Permissions Popup*/}
			<Popup
				name="Permissions"
				showBox={showPerms}
				setShowBox={handlePerms}
				body={
					<VStack space="4xl">
						{boxesToRender(settings['permsSettings'])}
					</VStack>
				}
			></Popup>

			{/**About Popup */}
			<Popup
				name="About"
				showBox={showAbout}
				setShowBox={handleAbout}
				body={
					<ModalBody>
						<Text style={styles.PopupText} fontWeight="bold">
							We Are Pack-A_Punch
						</Text>
						<Text style={styles.PopupText} fontWeight="bold">
							Hear Us Roar!!!
						</Text>
						<Text></Text>
						<Text style={styles.PopupText}>
							We are four dudes on a mission to help you become your best you.
						</Text>
						<Text style={styles.PopupText}>
							Wherever you train, train with Workout Tracker App by your side.
						</Text>
						<Text></Text>
						<Text></Text>
						<Text></Text>
						<Text></Text>
						<Text></Text>
						<Text></Text>
						<Text></Text>
						<Text style={styles.PopupText}>
							Be sure to follow us on Instagram to keep up with our latest
							updates.
						</Text>
					</ModalBody>
				}
			></Popup>
		</View>
	);
}

function Line() {
	return (
		<View style={{ flexDirection: 'row', alignItems: 'center' }}>
			<View
				style={{
					flex: 1,
					maxWidth: 300,
					borderRadius: 20,
					height: 10,
					backgroundColor: 'orange'
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	settingsButton: {
		height: 50,
		marginBottom: 20,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	settingsText: {
		fontSize: 40,
		lineHeight: 55
	},
	Box: {
		backgroundColor: '#FAF7F7',
		borderWidth: 1,
		borderRadius: 20,
		width: 324,
		height: 473,
		display: 'flex',
		alignContent: 'center',
		justifyContent: 'center'
	},
	PopupViewStyle: {
		backgroundColor: 'transparent',
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 2,
		shadowRadius: 50,
		elevation: 5
	},
	PopupHeader: {
		fontWeight: 'bold'
	},
	PopupText: {
		textAlign: 'center',
		textAlignVertical: 'center'
	},
	CheckBoxes: {
		isInvalid: false,
		isDisabled: false,
		display: 'flex'
	}
});
