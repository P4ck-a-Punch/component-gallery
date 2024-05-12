import React, { useState } from 'react'
import Page from 'Componants/Page'
import CardContainer from 'Componants/CardContainer'
import WorkoutCard from './WorkoutCard'
import { UserWorkout } from 'types/UserWorkout'
import { getExerciseLineItems, getWorkouts } from './WorkoutData'
import { View } from 'react-native'
import WheelPicker from 'react-native-wheely'

// Information about the user's scheduled workouts, across a cache
// surrounding the target date.
const workouts: UserWorkout[] = getWorkouts('1')

// Packages the exercises for a workout and the workout metadata
// into a card to display
const getWorkoutCards = (workoutData: UserWorkout[]): JSX.Element[] => {
	return workoutData.map(workout => {
		return (
			<WorkoutCard
				key={workout.wid}
				workout={workout}
				exercisesPlanned={getExerciseLineItems(workout)}
			/>
		)
	})
}

const selectorStyles = {
	selectorRoot: {
		alignItems: 'center',
		justifyContent: 'center',
		height: '10%',
		width: '100%',
	},
	rotate: {
		transform: [{ rotate: '270deg' }],
		width: 49,
	},
	selectorIndicator: {},
	itemTextStyle: {
		transform: [{ rotate: '90deg' }],
		fontSize: 20,
		fontFamily: 'IBMPlexSansCondensed_300Light',
	},
	selectorContainer: {},
}

// A continuous date selecter. Holds an array that is the days-in-a-year sequence
// and keeps track of the month. Once the picker wraps around the array, notes
// the year change.
const DateSelector = () => {
	const testArray = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]

	const [selectedIndex, setSelectedIndex] = useState(0)

	return (
		// @ts-expect-error TS claims that no overload matches the call, but
		// the style entries that cause this to happen are actually applied.
		<View style={selectorStyles.selectorRoot}>
			<View style={selectorStyles.rotate}>
				<WheelPicker
					selectedIndex={selectedIndex}
					options={testArray.map(item => item.toString())}
					onChange={index => {
						setSelectedIndex(index)
					}}
					selectedIndicatorStyle={selectorStyles.selectorIndicator}
					itemTextStyle={selectorStyles.itemTextStyle}
					scaleFunction={x => 1 / (1 + Math.exp(0.5 * (x - 6)))}
					containerStyle={selectorStyles.selectorContainer}
					decelerationRate='fast'
				/>
			</View>
		</View>
	)
}

// Filters the cache for workouts scheduled for the current date
const getThisDateWorkouts = (workoutDataCache: UserWorkout[]) => {
	// TODO: if cache miss, refetch from database
	return workoutDataCache
}

const WorkoutSchedule: React.FC = () => {
	// TODO: to silence unused warnings.
	console.log(workouts)

	return (
		<Page title={'Schedule'}>
			<DateSelector />
			<CardContainer>
				{getWorkoutCards(getThisDateWorkouts(workouts))}
			</CardContainer>
		</Page>
	)
}

export default WorkoutSchedule
