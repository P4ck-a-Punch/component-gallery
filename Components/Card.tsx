import React from 'react'
import { View, StyleSheet } from 'react-native'
import colors from './Colors'
import { TouchableHighlight } from 'react-native-gesture-handler'

type CardProps = {
	children: React.ReactNode
	heading: string
}

const Card = (props: CardProps) => {
	return (
		<TouchableHighlight
			activeOpacity={0.6}
			underlayColor={'pink'}
			onPress={() => true}
			style={cardStyle.highlight}
		>
			<View style={cardStyle.card}>{props.children}</View>
		</TouchableHighlight>
	)
}

const cardStyle = StyleSheet.create({
	card: {
		width: '100%',
		alignItems: 'center',
		elevation: 5,
		backgroundColor: '#fff',
		padding: 20,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: colors.black,
	},
	highlight: {
		borderRadius: 12,
	},
})

export default Card
