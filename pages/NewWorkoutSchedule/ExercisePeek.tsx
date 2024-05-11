import { ExerciseLineItem } from 'types/ExerciseLineItem'
import { View, Text } from 'react-native'
import React from 'react'

const styles = {
	peek_text: {
		fontSize: 18,
		fontFamily: 'IBMPlexSansCondensed_300Light',
		width: '100%',
	},
	peek_list: {
		flexDirection: 'column',
		width: '100%',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
	},
}

// A list item summarizing an exercise in a workout card.
const ExercisePeek = ({ exercise }: { exercise: ExerciseLineItem }) => (
	<View>
		<Text style={styles.peek_text}>{exercise.name}</Text>
	</View>
)

const ExercisePeekList = ({ exercises }: { exercises: ExerciseLineItem[] }) => (
	<View>
		{exercises.map(exercise => (
			<ExercisePeek key={exercise.name} exercise={exercise} />
		))}
	</View>
)

export default ExercisePeekList
