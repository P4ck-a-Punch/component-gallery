import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Card from './assets/Components/Card'
import { useFonts } from 'expo-font'

export default function App() {
	const [fontsLoaded] = useFonts({
		'IBMPlexSansCondensed-Bold': require('./assets/fonts/IBMPlexSansCondensed-Bold.ttf'),
		'IBMPlexSansCondensed-Regular': require('./assets/fonts/IBMPlexSansCondensed-Regular.ttf'),
		'IBMPlexSansCondensed-Medium': require('./assets/fonts/IBMPlexSansCondensed-Medium.ttf'),
		'IBMPlexSansCondensed-SemiBold': require('./assets/fonts/IBMPlexSansCondensed-SemiBold.ttf'),
		'IBMPlexSansCondensed-Light': require('./assets/fonts/IBMPlexSansCondensed-Light.ttf'),
		'IBMPlexSansCondensed-ExtraLight': require('./assets/fonts/IBMPlexSansCondensed-ExtraLight.ttf'),
		'IBMPlexSansCondensed-Italic': require('./assets/fonts/IBMPlexSansCondensed-Italic.ttf'),
		'IBMPlexSansCondensed-Thin': require('./assets/fonts/IBMPlexSansCondensed-Thin.ttf'),
		'IBMPlexSansCondensed-ThinItalic': require('./assets/fonts/IBMPlexSansCondensed-ThinItalic.ttf'),
		'IBMPlexSansCondensed-LightItalic': require('./assets/fonts/IBMPlexSansCondensed-LightItalic.ttf'),
		'IBMPlexSansCondensed-ExtraLightItalic': require('./assets/fonts/IBMPlexSansCondensed-ExtraLightItalic.ttf'),
		'IBMPlexSansCondensed-SemiBoldItalic': require('./assets/fonts/IBMPlexSansCondensed-SemiBoldItalic.ttf'),
		'IBMPlexSansCondensed-MediumItalic': require('./assets/fonts/IBMPlexSansCondensed-MediumItalic.ttf'),
		'IBMPlexSansCondensed-BoldItalic': require('./assets/fonts/IBMPlexSansCondensed-BoldItalic.ttf'),
	})

	if (!fontsLoaded) {
		; <Text>Fonts could not be loaded</Text>
	}

	return (
		<View style={styles.container}>
			<Card heading='TestHeading'>
				<Text>Card Component</Text>
			</Card>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
})
