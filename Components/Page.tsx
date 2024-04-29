import React from 'react'
import { View, StyleSheet } from 'react-native'

type PageProps = {
	children: React.ReactNode
	title: string
}

const Page = (props: PageProps) => {
	return <View style={styles.outer}>{props.children}</View>
}

const styles = StyleSheet.create({
	outer: {
		flex: 1,
		width: '100%',
		height: '100%',
		marginTop: 70,
		marginBottom: 70,
	},
})

export default Page
