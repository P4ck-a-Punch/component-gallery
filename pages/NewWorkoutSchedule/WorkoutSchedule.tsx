import React, { useState } from 'react'
import Page from 'Componants/Page'
import CardContainer from 'Componants/CardContainer'
import WorkoutCard from './WorkoutCard'
import { UserWorkout } from 'types/UserWorkout'
import { getExerciseLineItems, getWorkouts } from './WorkoutData'
import { View, Text, StyleSheet } from 'react-native'
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

const selectorStyles = StyleSheet.create({
	wheelRoot: {
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%',
		width: '70%',
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
	selectorRoot: {
		flexDirection: 'row',
		height: '7%',
		paddingHorizontal: 24,
		alignItems: 'center',
		justifyContent: 'flex-start',
		width: '100%',
		paddingBottom: 12,
	},
	dateText: {
		fontSize: 24,
		fontFamily: 'IBMPlexSansCondensed_300Light',
		textAlignVertical: 'center',
		width: 'auto',
	},
})

// A continuous date selecter. Holds an array that is the days-in-a-year sequence
// and keeps track of the month. Once the picker wraps around the array, notes
// the year change.
const DateSelector = () => {
	const testArray = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]

	const [selectedIndex, setSelectedIndex] = useState(testArray.length / 2)

	return (
		<View style={selectorStyles.selectorRoot}>
			<Text style={selectorStyles.dateText}>August 2022</Text>
			<View style={selectorStyles.wheelRoot}>
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
