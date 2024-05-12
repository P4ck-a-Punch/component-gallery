import React from 'react'
import Card from 'Componants/Card'
import Tags from 'Componants/Tags'
import { ExerciseLineItem } from 'types/ExerciseLineItem'
import { UserWorkout } from 'types/UserWorkout'
import { Text } from 'react-native'
import ExercisePeekList from './ExercisePeek'

// Note that any single WorkoutCard component does not see
// a UserWorkoutDetails object. It sees complete ExerciseLineItems
// and workout metadata in the form of a UserWorkout object.
// This "join" over the two sets of data is done in the parent: the
// WorkoutSchedule page.

type WorkoutCardProps = {
	workout: UserWorkout
	exercisesPlanned: ExerciseLineItem[]
}

const styles = {
	time: {
		fontSize: 16,
		marginTop: 8,
	},
}

// Extracts the time from a date string, or returns a default message
// on failure.
const timeFromDate = (dateString: string | undefined) => {
	if (dateString === undefined) return 'Sometime today'
	return dateString
}

// Performs a union over the muscle groups targeted by the exercises,
// returning an array of unique muscle group names.
const getMuscleGroups = (exercises: ExerciseLineItem[]) => {
	const muscleGroups = exercises
		.map(exercise => exercise.muscle_groups_targeted)
		.flat()
	return Array.from(new Set(muscleGroups))
}

// Performs a union over the equipment used by the exercises,
// returning an array of unique equipment names.
const getEquipment = (exercises: ExerciseLineItem[]) => {
	const equipment = exercises.map(exercise => exercise.equipment).flat()
	return Array.from(new Set(equipment))
}

/**
 * A card that displays information about a workout and its exercises,
 * displaying muscle groups targeted and equipment used as length-limited
 * boxes of tags.
 *
 * @param {object} props The workout and its exercises.
 * @param {UserWorkout} props.workout The workout metadata.
 * @param {ExerciseLineItem[]} props.exercisesPlanned The exercises to be performed.
 */
const WorkoutCard = (props: WorkoutCardProps) => {
	return (
		<Card heading={props.workout.name}>
			<Tags tags={getMuscleGroups(props.exercisesPlanned)} />
			<Tags tags={getEquipment(props.exercisesPlanned)} />
			<ExercisePeekList exercises={props.exercisesPlanned} />
		</Card>
	)
}

export default WorkoutCard
