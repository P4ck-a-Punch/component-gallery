import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { IBMPlexSansCondensed_500Medium } from '@expo-google-fonts/ibm-plex-sans-condensed'
import { useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading'

type CardProps = {
	children: React.ReactNode
	heading: string
}

const Card = (props: CardProps) => {
	const [fontsLoaded, fontsError] = useFonts({
		IBMPlexSansCondensed_500Medium,
	})

	console.log(fontsError)

	return !fontsLoaded ? (
		<AppLoading />
	) : (
		<View style={cardStyle.card}>
			<Text style={cardStyle.heading}>{props.heading}</Text>
			{props.children}
		</View>
	)
}

const cardStyle = StyleSheet.create({
	heading: {
		fontSize: 24,
		fontFamily: 'IBMPlexSansCondensed_500Medium',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		width: '100%',
		marginBottom: 10,
	},
	card: {
		width: '100%',
		alignItems: 'flex-start',
		elevation: 5,
		backgroundColor: '#fff',
		padding: 20,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: '#000',
	},
	highlight: {
		borderRadius: 12,
	},
})

export default Card
