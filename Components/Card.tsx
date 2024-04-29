import React from 'react'
import { View, StyleSheet } from 'react-native'
import colors from './Colors'

type CardProps = {
	children: React.ReactNode
	heading: string
}

const Card = (props: CardProps) => {
	return <View style={cardStyle.card}>{props.children}</View>
}

const cardStyle = StyleSheet.create({
	card: {
		width: '100%',
		alignItems: 'center',
		elevation: 5,
		backgroundColor: '#fff',
		padding: 20,
		margin: 20,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: colors.black,
	},
})

export default Card
