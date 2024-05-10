import React from 'react'
import { StyleSheet } from 'react-native'
import {
	GestureHandlerRootView,
	ScrollView,
} from 'react-native-gesture-handler'

import { View } from 'react-native'

type cardContainerProps = {
	children?: React.ReactNode | React.ReactNode[] // An array of cards to wrap
}

const cardContainerStyle = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		height: '100%',
		paddingLeft: 24,
		paddingRight: 24,
		paddingTop: 0,
	},
	scrollview_spacing: {
		flexDirection: 'column',
		rowGap: 20,
		columnGap: 20,
		paddingBottom: 36,
		width: '100%',
	},
	scrollview: {
		width: '100%',
	},
})

/**
 * Wraps multiple card children in a scrollable container.
 * */
export default function CardContainer(props: cardContainerProps) {
	return (
		<GestureHandlerRootView style={cardContainerStyle.container}>
			<ScrollView style={cardContainerStyle.scrollview}>
				<View style={cardContainerStyle.scrollview_spacing}>
					{props.children}
				</View>
			</ScrollView>
		</GestureHandlerRootView>
	)
}
