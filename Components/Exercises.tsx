import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import colors from './Colors'
import Card from './Card'
import { TouchableHighlight } from 'react-native-gesture-handler'

const style = StyleSheet.create({
	exercise_heading: {
		fontWeight: '600',
		fontSize: 24,
		fontFamily: 'IBMPlexSansCond-Medium',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		width: '100%',
		marginBottom: 10,
	},
	exercise_list: {
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		width: '100%',
	},
	exercise_listitem: {
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		width: '100%',
		marginBottom: 10,
	},
	exercise_listitem_text: {
		fontWeight: '300',
		fontFamily: 'IBMPlexSansCondensed-Light',
		fontSize: 18,
	},
	tag_text: {
		fontFamily: 'IBMPlexSansCondensed-Regular',
		fontSize: 12,
	},
	tag: {
		backgroundColor: colors.white,
		borderRadius: 16,
		borderColor: colors.black,
		borderWidth: 1,
		paddingLeft: 8,
		paddingRight: 8,
		paddingTop: 4,
		paddingBottom: 4,
	},
	tag_container: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		flexWrap: 'wrap',
		rowGap: 5,
		columnGap: 5,
		marginBottom: 12,
	},
	tag_highlight: {
		borderRadius: 16,
	},
})

const Tag = (props: { key: string; text: string }) => {
	return (
		<TouchableHighlight
			activeOpacity={0.6}
			underlayColor={'pink'}
			onPress={() => true}
			style={style.tag_highlight}
		>
			<View style={style.tag}>
				<Text style={style.tag_text}>{props.text}</Text>
			</View>
		</TouchableHighlight>
	)
}

const ExerciseList = (props: { exerciseNames: string[] }) => {
	return (
		<View style={style.exercise_list}>
			{props.exerciseNames.map(exerciseName => (
				<ExerciseListItem key={exerciseName} name={exerciseName} />
			))}
		</View>
	)
}

const ExerciseHeading = (props: { label: string }) => {
	return <Text style={style.exercise_heading}>{props.label}</Text>
}

const ExerciseListItem = (props: { key: string; name: string }) => {
	return (
		<View style={style.exercise_listitem}>
			<Text style={style.exercise_listitem_text}>{props.name}</Text>
		</View>
	)
}

const TagContainer = (props: { children: React.ReactNode }) => {
	return <View style={style.tag_container}>{props.children}</View>
}

const ExerciseCard = (props: {
	name: string
	tags: string[]
	children: React.ReactNode
	exerciseNames: string[]
}) => {
	//	useFonts({
	//		'IBMPlexSansCondensed-Bold': require('../assets/fonts/IBMPlexSansCondensed-Bold.ttf'),
	//		'IBMPlexSansCondensed-Regular': require('../assets/fonts/IBMPlexSansCondensed-Regular.ttf'),
	//		'IBMPlexSansCondensed-Medium': require('../assets/fonts/IBMPlexSansCondensed-Medium.ttf'),
	//		'IBMPlexSansCondensed-SemiBold': require('../assets/fonts/IBMPlexSansCondensed-SemiBold.ttf'),
	//		'IBMPlexSansCondensed-Light': require('../assets/fonts/IBMPlexSansCondensed-Light.ttf'),
	//		'IBMPlexSansCondensed-ExtraLight': require('../assets/fonts/IBMPlexSansCondensed-ExtraLight.ttf'),
	//		'IBMPlexSansCondensed-Italic': require('../assets/fonts/IBMPlexSansCondensed-Italic.ttf'),
	//		'IBMPlexSansCondensed-Thin': require('../assets/fonts/IBMPlexSansCondensed-Thin.ttf'),
	//		'IBMPlexSansCondensed-ThinItalic': require('../assets/fonts/IBMPlexSansCondensed-ThinItalic.ttf'),
	//		'IBMPlexSansCondensed-LightItalic': require('../assets/fonts/IBMPlexSansCondensed-LightItalic.ttf'),
	//		'IBMPlexSansCondensed-ExtraLightItalic': require('../assets/fonts/IBMPlexSansCondensed-ExtraLightItalic.ttf'),
	//		'IBMPlexSansCondensed-SemiBoldItalic': require('../assets/fonts/IBMPlexSansCondensed-SemiBoldItalic.ttf'),
	//		'IBMPlexSansCondensed-MediumItalic': require('../assets/fonts/IBMPlexSansCondensed-MediumItalic.ttf'),
	//		'IBMPlexSansCondensed-BoldItalic': require('../assets/fonts/IBMPlexSansCondensed-BoldItalic.ttf'),
	//	})

	return (
		<Card heading={props.name}>
			<ExerciseHeading label={props.name} />

			<TagContainer>
				{props.tags.map(tag => (
					<Tag key={tag} text={tag} />
				))}
			</TagContainer>

			{props.children}
		</Card>
	)
}

export { ExerciseCard, ExerciseList }
