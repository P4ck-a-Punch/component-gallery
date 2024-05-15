import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

type CardProps = {
	children: React.ReactNode
	heading: React.ReactNode | String
}

const Card = (props: CardProps) => {

	// Wrap the heading in a Text component if it is a string
	return (typeof props.heading) === 'string' ?
		<View style={cardStyle.card}>
			{props.heading}
			{props.children}
		</View>
		:
		<View style={cardStyle.card}>
			<Text style={cardStyle.heading}>{props.heading}</Text>
			{props.children}
		</View>
}

const cardStyle = StyleSheet.create({
	heading: {
		fontSize: 24,
		fontFamily: 'IBMPlexSansCondensed_500Medium',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		width: '100%',
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
