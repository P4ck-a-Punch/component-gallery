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
		width: '65%',
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
	selectorContainer: {
		width: '100%',
	},
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
		fontSize: 26,
		fontFamily: 'IBMPlexSansCondensed_300Light',
		textAlignVertical: 'center',
		width: '35%',
	},
})

// Scale of dates in the wheel as a function of (unsigned) distance from the center.
// See https://www.desmos.com/calculator/u0m44qh7xk for a visualization.
//
// NOTE: you have to reload the app via the Expo terminal (press r) to see effects
// of these changes.
const dateWheelScaleFunction = (x: number) => {
	const a = 1.6
	const b = 5.5
	return 1 / (1 + Math.exp(a * (x - b)))
}

interface DateSelectorProps {
	date: Date
}

const daysInMonth = (year: number, month: number) =>
	new Date(year, month, 0).getDate()

// A continuous date selecter. Holds an array that is the days-in-a-year sequence
// and keeps track of the month. Once the picker wraps around the array, notes
// the year change.
const DateSelector: React.FC<DateSelectorProps> = (
	props: DateSelectorProps,
) => {
	const dateArray = Array.from(
		{
			length: daysInMonth(props.date.getFullYear(), props.date.getMonth() + 1),
		},
		(_, i) => i + 1,
	)

	const [selectedIndex, setSelectedIndex] = useState(dateArray.length / 2)

	return (
		<View style={selectorStyles.selectorRoot}>
			<Text style={selectorStyles.dateText}>
				{props.date.toLocaleDateString('en-US', {
					month: 'long',
					year: 'numeric',
				})}
			</Text>
			<View style={selectorStyles.wheelRoot}>
				<View style={selectorStyles.rotate}>
					<WheelPicker
						selectedIndex={selectedIndex}
						options={dateArray.map(item => item.toString())}
						onChange={index => {
							setSelectedIndex(index)
						}}
						selectedIndicatorStyle={selectorStyles.selectorIndicator}
						itemTextStyle={selectorStyles.itemTextStyle}
						scaleFunction={dateWheelScaleFunction}
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

	const [date, setDate] = useState(new Date())

	return (
		<Page title={'Schedule'}>
			<DateSelector date={date} />
			<CardContainer>
				{getWorkoutCards(getThisDateWorkouts(workouts))}
			</CardContainer>
		</Page>
	)
}

export default WorkoutSchedule
