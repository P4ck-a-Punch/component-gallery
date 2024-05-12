import React from 'react'
import { View, StyleSheet } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { IBMPlexSansCondensed_500Medium } from '@expo-google-fonts/ibm-plex-sans-condensed'
import { useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading'

type CardProps = {
	children: React.ReactNode
	heading: React.ReactNode
}

const Card = (props: CardProps) => {
	const [fontsLoaded, fontsError] = useFonts({
		IBMPlexSansCondensed_500Medium,
	})

	console.log(fontsError)

	return !fontsLoaded ? (
		<AppLoading />
	) : (
		// 		<TouchableHighlight
		// 			activeOpacity={0.6}
		// 			underlayColor={'pink'}
		// 			onPress={() => true}
		// 			style={cardStyle.highlight}
		// 			disallowInterruption={true}
		// 		>
		<View style={cardStyle.card}>
			{props.heading}
			{props.children}
		</View>
		//		</TouchableHighlight>
	)
}

const cardStyle = StyleSheet.create({
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
