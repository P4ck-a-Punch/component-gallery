import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Card from './assets/Components/Card'
import loadFonts from './loadFonts'

export default function App() {
	if (!loadFonts()) {
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
