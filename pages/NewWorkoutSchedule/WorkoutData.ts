import { UserWorkout } from 'types/UserWorkout'
import { Exercise } from 'types/Exercise'
import { ExerciseLineItem } from 'types/ExerciseLineItem'

// Queries the database for the user's scheduled workouts.

const dummyWorkouts: UserWorkout[] = [
	{
		wid: '1',
		name: 'Chest Day',
		exercises: [
			{
				_id: 1,
				sets: 3,
				reps: 10,
			},
			{
				_id: 2,
				sets: 3,
				reps: 10,
			},
			{
				_id: 3,
				sets: 3,
				reps: 10,
			},
		],
		date: '2021-10-01',
		scheduling: {
			type: 'weekly',
			recur: '1',
		},
	},
	{
		wid: '2',
		name: 'Leg Day',
		exercises: [
			{
				_id: 4,
				sets: 3,
				reps: 10,
			},
			{
				_id: 5,
				sets: 3,
				reps: 10,
			},
			{
				_id: 6,
				sets: 3,
				reps: 10,
			},
			{
				_id: 7,
				sets: 3,
				reps: 10,
			},
		],
		date: '2021-10-02',
		scheduling: {
			type: 'weekly',
			recur: '1',
		},
	},
	{
		wid: '3',
		name: 'Back Day',
		exercises: [
			{
				_id: 8,
				sets: 3,
				reps: 10,
			},
			{
				_id: 9,
				sets: 3,
				reps: 10,
			},
		],
		date: '2021-10-03',
		scheduling: {
			type: 'weekly',
			recur: '1',
		},
	},
]

const dummyExercises: Exercise[] = [
	{
		_id: 1,
		workout_name: 'Bench Press',
		description: 'Lay on a bench and press a barbell away from your chest',
		category: 'Chest',
		equipment: ['Barbell', 'Bench'],
		muscle_groups_targeted: [
			'Pectorals',
			'Triceps',
			'Deltoids',
			'Serratus',
			'Coracobrachialis',
			'Pectoralis Minor',
		],
	},
	{
		_id: 2,
		workout_name: 'Dumbbell Fly',
		description: 'Lay on a bench and press dumbbells away from your chest',
		category: 'Chest',
		equipment: ['Dumbbells', 'Bench'],
		muscle_groups_targeted: ['Pectorals'],
	},
	{
		_id: 3,
		workout_name: 'Pushups',
		description: 'Lay on the ground and push yourself up',
		category: 'Chest',
		equipment: [],
		muscle_groups_targeted: ['Pectorals', 'Triceps'],
	},
	{
		_id: 4,
		workout_name: 'Squats',
		description: 'Stand with a barbell on your back and squat down',
		category: 'Legs',
		equipment: ['Barbell'],
		muscle_groups_targeted: ['Quadriceps', 'Glutes'],
	},
	{
		_id: 5,
		workout_name: 'Leg Press',
		description:
			'Sit on a machine and press the weight away from you with your legs',
		category: 'Legs',
		equipment: ['Leg Press Machine'],
		muscle_groups_targeted: ['Quadriceps', 'Glutes'],
	},
	{
		_id: 6,
		workout_name: 'Leg Curl',
		description: 'Sit on a machine and curl the weight with your legs',
		category: 'Legs',
		equipment: ['Leg Curl Machine'],
		muscle_groups_targeted: ['Hamstrings'],
	},
	{
		_id: 7,
		workout_name: 'Calf Raise',
		description: 'Stand on a machine and raise your heels',
		category: 'Legs',
		equipment: ['Calf Raise Machine'],
		muscle_groups_targeted: ['Calves'],
	},
	{
		_id: 8,
		workout_name: 'Pullups',
		description: 'Hang from a bar and pull yourself up',
		category: 'Back',
		equipment: ['Pullup Bar'],
		muscle_groups_targeted: ['Lats', 'Biceps'],
	},
	{
		_id: 9,
		workout_name: 'Rows',
		description: 'Sit on a machine and pull the weight towards you',
		category: 'Back',
		equipment: ['Row Machine'],
		muscle_groups_targeted: ['Lats', 'Biceps'],
	},
]

const getWorkouts = (uid: string): UserWorkout[] => {
	console.log('Querying database for workouts for user ' + uid)
	return dummyWorkouts
}

const getExercises = async (): Promise<Exercise[]> => {
	console.log('Querying database for exercises')
	return dummyExercises
}

// Information about relevant exercises. TODO: might move
// this to a higher scope, so that all exercises are loaded from the
// database and stored in a single map.
const getExerciseInfo: Map<number, Exercise> = new Map()
getExercises().then(exercises => {
	exercises.forEach(exercise => {
		getExerciseInfo.set(exercise._id, exercise)
	})
})

// Joins exercise and PR data to obtain exercise line items for a single
// workout.
const getExerciseLineItems = (workout: UserWorkout): ExerciseLineItem[] => {
	const exerciseLineItems: ExerciseLineItem[] = []

	workout.exercises.forEach(exercise => {
		const exerciseInfo = getExerciseInfo.get(exercise._id)

		if (exerciseInfo) {
			const newLineItem: ExerciseLineItem = {
				name: exerciseInfo.workout_name,
				equipment: exerciseInfo.equipment,
				muscle_groups_targeted: exerciseInfo.muscle_groups_targeted,
				sets: exercise.sets,
				reps: exercise.reps,
			}

			exerciseLineItems.push(newLineItem)
		}
	})

	return exerciseLineItems
}

export { getWorkouts, getExerciseLineItems }
