import React from 'react'
import Page from 'Componants/Page'
import CardContainer from 'Componants/CardContainer'
import WorkoutCard from './WorkoutCard'
import { UserWorkout } from 'types/UserWorkout'
import { getExerciseLineItems, getWorkouts } from './WorkoutData'

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
			<CardContainer>
				{getWorkoutCards(getThisDateWorkouts(workouts))}
			</CardContainer>
		</Page>
	)
}

export default WorkoutSchedule