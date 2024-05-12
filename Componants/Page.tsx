import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

type PageProps = {
	children: React.ReactNode
	title: string
}

const PageHeader = (props: { title: string; breadcrumbs: string }) => {
	return (
		<View style={styles.page_header}>
			<Text style={styles.breadcrumbs}>{props.breadcrumbs}</Text>
			<Text style={styles.page_title}>{props.title}</Text>
		</View>
	)
}

const Page = (props: PageProps) => {
	return (
		<View style={styles.outer}>
			<PageHeader title={props.title} breadcrumbs='< Home' />
			{props.children}
		</View>
	)
}

const styles = StyleSheet.create({
	outer: {
		flex: 1,
		width: '100%',
		height: '100%',
		paddingTop: 72,
	},
	page_header: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		paddingRight: 24,
		paddingLeft: 24,
		backgroundColor: 'white',
	},
	page_title: {
		fontFamily: 'IBMPlexSansCondensed_700Bold',
		fontSize: 36,
		fontWeight: 'bold',
		width: '100%',
	},
	breadcrumbs: {
		fontFamily: 'IBMPlexSansCondensed_400Regular',
		fontSize: 16,
		marginBottom: 4,
	},
})

export default Page
