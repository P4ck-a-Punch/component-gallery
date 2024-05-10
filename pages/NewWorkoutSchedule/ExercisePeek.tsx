import { ExerciseLineItem } from 'types/ExerciseLineItem'
import { View, Text } from 'react-native'
import React from 'react'

const styles = {
	container: {
		marginTop: 10,
	},
}

// A list item summarizing an exercise in a workout card.
const ExercisePeek = ({ exercise }: { exercise: ExerciseLineItem }) => (
	<View>
		<Text>{exercise.name}</Text>
		<Text>
			{exercise.sets} x {exercise.reps}
		</Text>
	</View>
)

const ExercisePeekList = ({ exercises }: { exercises: ExerciseLineItem[] }) => (
	<View style={styles.container}>
		{exercises.map(exercise => (
			<ExercisePeek key={exercise.name} exercise={exercise} />
		))}
	</View>
)

export default ExercisePeek
