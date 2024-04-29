import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import colors from './Colors'

type CardProps = {
	children: React.ReactNode
	heading: string
}

const Card = (props: CardProps) => {
	return (
		<View style={cardStyle.card}>
			<Text style={cardStyle.heading}>{props.heading}</Text>
			{props.children}
		</View>
	)
}

const cardStyle = StyleSheet.create({
	heading: {
		fontSize: 24,
		fontFamily: 'IBMPlexSansCondensed-Regular',
		alignItems: 'flex-start',
		width: '100%',
		marginBottom: 20,
	},
	card: {
		width: '85%',
		alignItems: 'center',
		elevation: 5,
		backgroundColor: '#fff',
		padding: 20,
		margin: 20,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: colors.black,
	},
	tag: {},
})

export default Card
