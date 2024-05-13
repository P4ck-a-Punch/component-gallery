import getDataForUserForExercise from './ExerciseData'
import TimeGraph from 'Componants/TimeGraph'
import React from 'react'
import Card from 'Componants/Card'
import MultiSwitch from 'react-native-multiple-switch'

const ranges = ["7d", "30d", "90d", "1y", "all"]

const MetricReport = () => {

	const [range, setRange] = React.useState(ranges[1])

	const data = getDataForUserForExercise(1, 1, range)

	return (
		<Card heading='Reps × Sets'>
			<TimeGraph data={data} dateRange={range} />
			<MultiSwitch
				items={ranges}
				value={range}
				onChange={setRange}
				containerStyle={{
					backgroundColor: '#fff'
				}}
				sliderStyle={{
					backgroundColor: 'transparent',
					borderWidth: 1,
				}}
				textStyle={{
				}} />
		</Card>
	)
}

export default MetricReport
