import React, { useState, useEffect } from 'react';
import {
	SafeAreaView,
	ScrollView,
	View,
	Text,
	StyleSheet,
	ColorValue
} from 'react-native';
import { Exercise } from '../../types/Exercise';
import { UserWorkoutDetails } from '../../types/UserWorkoutDetails';
import { UserWorkout } from '../../types/UserWorkout';

type WorkoutViewProps = {
	selectedDate: Date;
	exercises: Exercise[];
	scheduledWorkouts: UserWorkout[];
	pastWorkouts: UserWorkout[];
};
// TODO: Add images for every workout

const WorkoutList: React.FC<WorkoutViewProps> = ({
	selectedDate,
	exercises,
	scheduledWorkouts,
	pastWorkouts
}) => {
	const [currExercises, setCurrExercises] = useState<UserWorkoutDetails[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		const cutoff = new Date();
		cutoff.setDate(cutoff.getDate() - 1);

		let exercises: UserWorkoutDetails[] = [];

		if (selectedDate < cutoff) {
			pastWorkouts.forEach((pw: UserWorkout) => {
				// TODO: This just adds all of the exercises to the state variable, there are better ways to do this.
				if (pw.date === selectedDate.toISOString().substring(0, 10))
					exercises = [...exercises, ...pw.exercises];
			});
		} else {
			const day = selectedDate.getUTCDay().toString();
			scheduledWorkouts.forEach((sw: UserWorkout) => {
				if (
					sw.scheduling?.type === 'weekly' &&
					sw.scheduling.recur.includes(day)
				) {
					exercises = [...exercises, ...sw.exercises];
				}
			});
		}
		setCurrExercises(exercises);
	}, [selectedDate, scheduledWorkouts]);

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={styles.scrollView}>
				{/**TODO: implement loading */}
				{loading ? (
					<Loading />
				) : currExercises.length == 0 ? (
					<NoWorkoutsScreen />
				) : (
					currExercises.map((userWorkout: UserWorkoutDetails, i: number) => {
						let exercise: Exercise | undefined = exercises.find(
							(obj) => obj._id == userWorkout._id
						);
						return (
							<View key={i} style={styles.exercise}>
								<View style={styles.leftColumn}>
									<Text style={styles.titleText}>{exercise?.workout_name}</Text>
									<View style={styles.tags}>
										{exercise?.muscle_groups_targeted.map(
											(muscle_group: String, i: number) => (
												<View
													style={[
														styles.tag,
														{
															backgroundColor: getBackgroundColor(
																exercise?.category
															)
														}
													]}
													key={i}
												>
													<Text style={{ fontSize: 12 }}>{muscle_group}</Text>
												</View>
											)
										)}
									</View>
								</View>
								<View style={styles.rightColumn}>
									<Text style={styles.text}>
										Sets: {userWorkout.sets.toString()}
										{'\n'}
										Reps: {userWorkout.reps.toString()}
									</Text>
								</View>
							</View>
						);
					})
				)}
			</ScrollView>
		</SafeAreaView>
	);
};

const NoWorkoutsScreen: React.FC = () => {
	return (
		<View style={{ alignItems: 'center' }}>
			<Text style={styles.titleText}>No Workouts Planned... 😭</Text>
		</View>
	);
};

const Loading: React.FC = () => {
	return (
		<View style={{ alignItems: 'center' }}>
			<Text style={styles.titleText}>Loading...</Text>
		</View>
	);
};

const getBackgroundColor: (bg: string | undefined) => ColorValue = (bg) => {
	//   "Core", "Full Body",
	switch (bg) {
		case 'Legs':
			return '#A9DEF9'; // Light Blue
		case 'Arms':
			return '#A0C4FF'; // Blue
		case 'Cardio':
			return '#FFD6A5'; // Orange
		case 'Chest':
			return '#FFADAD'; // Red
		// case "Forearms":
		// case "Traps":
		// case "Neck":
		//     return '#FDFFB6';   // Yellow
		case 'Back':
			return '#CAFFBF'; // Green
		case 'Core':
			return '#BDB2FF'; // Purple
		case 'Shoulders':
			return '#FFC6FF'; // Pink
		case 'Full Body':
			return '#FFD6A5'; // Orange
		default:
			// return '#D9D9D9';   // Grey
			return '#FDFFB6';
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	exercise: {
		borderRadius: 30,
		margin: 10,
		padding: 10,
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#D9D9D9'
	},
	scrollView: {
		width: '100%'
	},
	leftColumn: {
		flex: 1,
		justifyContent: 'center',
		marginLeft: 20,
		maxWidth: '80%'
	},
	rightColumn: {
		flex: 1,
		justifyContent: 'center',
		maxWidth: '20%',
		marginRight: 15
	},
	tags: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	tag: {
		paddingHorizontal: 10,
		paddingVertical: 4,
		borderRadius: 25,
		minHeight: 20,
		alignItems: 'center',
		alignSelf: 'flex-start',
		marginRight: 5,
		marginVertical: 2
	},
	text: {
		fontSize: 16,
		textAlign: 'right'
	},
	titleText: {
		paddingTop: 5,
		fontSize: 28,
		fontWeight: 'bold',
		textAlign: 'left'
	}
});

export default WorkoutList;
