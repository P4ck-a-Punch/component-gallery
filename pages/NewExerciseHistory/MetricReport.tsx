import getDataForUserForExercise from './ExerciseData'
import TimeGraph from 'Componants/TimeGraph'
import React from 'react'
import Card from 'Componants/Card'
import Line from 'react-native-svg-charts'

const MetricReport = () => {
	const data = getDataForUserForExercise(1, 1)

	return (
		<Card heading='Reps × Sets'>
			<TimeGraph data={data} />
		</Card>
	)
}

export default MetricReport
