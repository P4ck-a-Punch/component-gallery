import { useEffect, useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	Alert,
	ScrollView,
	Pressable,
	Image
} from 'react-native';
import { Exercise } from '../../types/Exercise';
import { UserWorkoutDetails } from '../../types/UserWorkoutDetails';
import { UserWorkout } from '../../types/UserWorkout';
import { Icon, ArrowLeftIcon, TrashIcon } from '@gluestack-ui/themed';
import GreenPlus from '../../assets/green_plus.png';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import RootStackParamList from '../../types/RootStackParamList';

type AddWorkoutProps = {
	navigation: StackNavigationProp<RootStackParamList, 'Add Workout'>;
	route: RouteProp<RootStackParamList, 'Add Workout'>;
	scheduledWorkouts: UserWorkout[];
	setScheduledWorkouts: (workouts: UserWorkout[]) => void;
	exercises: Exercise[];
};

const testUserId = '1';
const dayStrings = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

const postWorkout = async (body: Object) => {
	const response = await fetch(
		`https://yui8zhx0qj.execute-api.us-west-2.amazonaws.com/testStage/workouts`,
		{
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'x-api-key': `${process.env.AWS_API_KEY}`
			}
		}
	);

	if (response.ok) return response.json();
	else
		throw new Error(
			`Recieved error from API: \n ${response.status} ${response.body}`
		);
};

const AddWorkout: React.FC<AddWorkoutProps> = ({
	navigation,
	route,
	scheduledWorkouts,
	setScheduledWorkouts,
	exercises
}) => {
	const [workoutName, setWorkoutName] = useState<string>('');
	const [userExercises, setUserExercises] = useState<UserWorkoutDetails[]>([]);

	const [days, setDays] = useState<boolean[]>(Array(7).fill(false));

	useEffect(() => {
		if (route.params.id != -1) {
			setUserExercises([
				...userExercises,
				{
					_id: route.params.id,
					reps: 0,
					sets: 0
				}
			]);
		}
	}, [route.params.id]);

	return (
		<View style={styles.container}>
			<TextInput
				style={[styles.titleText, { marginVertical: 20 }]}
				onChangeText={(newText) => setWorkoutName(newText)}
				value={workoutName}
				placeholder="Workout Name"
			/>
			<View style={styles.workout}>
				<ScrollView>
					{userExercises.length == 0 ? (
						<></>
					) : (
						userExercises.map((userExercise: UserWorkoutDetails, i: number) => (
							<View style={styles.row} key={i}>
								{/* Todo: Add draggable element here */}
								<Text
									style={[
										styles.exerciseText,
										{ marginLeft: 20, flexWrap: 'wrap', width: '50%' }
									]}
								>
									{exercises[userExercise._id - 1]?.workout_name}
								</Text>
								<View style={styles.numericsContainer}>
									<View
										style={{
											flexDirection: 'row',
											alignItems: 'center',
											width: 100,
											marginBottom: 2
										}}
									>
										<Text style={styles.setsAndRepsText}>Sets: </Text>
										<TextInput
											keyboardType="numeric"
											style={[
												styles.setsAndRepsTextbox,
												{ color: userExercise.sets == 0 ? '#C5C5C7' : 'black' }
											]}
											value={userExercise.sets.toString()}
											onChangeText={(text) => {
												let newTextVal: number = parseInt(
													text.replace(/[^0-9]/g, '')
												);
												if (isNaN(newTextVal)) newTextVal = 0;
												if (newTextVal > 999) newTextVal = 999;
												const updatedExercises = [...userExercises];
												userExercise.sets = newTextVal;
												updatedExercises[i] = userExercise;
												setUserExercises(updatedExercises);
											}}
										/>
									</View>
									<View
										style={{
											flexDirection: 'row',
											alignItems: 'center',
											width: 100
										}}
									>
										<Text style={styles.setsAndRepsText}>Reps: </Text>
										<TextInput
											keyboardType="numeric"
											style={[
												styles.setsAndRepsTextbox,
												{ color: userExercise.reps == 0 ? '#C5C5C7' : 'black' }
											]}
											value={userExercise.reps.toString()}
											onChangeText={(text) => {
												let newTextVal: number = parseInt(
													text.replace(/[^0-9]/g, '')
												);
												if (isNaN(newTextVal)) newTextVal = 0;
												if (newTextVal > 999) newTextVal = 999;
												const updatedExercises = [...userExercises];
												userExercise.reps = newTextVal;
												updatedExercises[i] = userExercise;
												setUserExercises(updatedExercises);
											}}
										/>
									</View>
								</View>
								<Pressable
									style={styles.deleteIconContainer}
									onPress={() =>
										setUserExercises(
											userExercises.filter(
												(_: UserWorkoutDetails, idx: number) => idx != i
											)
										)
									}
								>
									<Icon size="lg" as={TrashIcon} color="#8B0000" />
								</Pressable>
								{/* <Button title='Delete' onPress={() => setUserExercises(userExercises.filter((_: UserWorkoutDetails, idx: number) => idx != i))}></Button> */}
							</View>
						))
					)}
					<Pressable
						style={styles.row}
						onPress={() =>
							navigation.navigate('Search', {
								filter: '',
								sourceScreen: 'Add Workout'
							})
						}
					>
						<Image
							style={{ width: 30, height: 30, marginLeft: 20, marginRight: 15 }}
							source={GreenPlus}
						/>
						<Text style={[styles.exerciseText]}>Add Exercise</Text>
					</Pressable>
				</ScrollView>
			</View>

			<View style={styles.days}>
				{days.map((day: boolean, i: number) => (
					<Pressable
						key={i}
						onPress={() => {
							const newDays = [...days];
							newDays[i] = !newDays[i];
							setDays(newDays);
						}}
						style={day ? styles.selectedDay : styles.nonSelectedDay}
					>
						<Text style={styles.dayText}>{dayStrings[i]}</Text>
					</Pressable>
				))}
			</View>
			<Pressable
				style={({ pressed }) => [
					{ backgroundColor: pressed ? '#ccff8c' : '#81de76' },
					styles.addWorkoutButton
				]}
				onPress={() => {
					// Call API
					const body = {
						userId: testUserId,
						name: workoutName,
						scheduling: {
							type: 'weekly',
							recur: days
								.map((val: boolean, i: number) => (val ? i : ''))
								.join('')
						},
						exercises: userExercises
					};
					postWorkout(body)
						.then((response: unknown) => {
							const newWorkout: UserWorkout = response as UserWorkout;
							setWorkoutName('');
							setUserExercises([]);
							setDays(Array(7).fill(false));
							setScheduledWorkouts([...scheduledWorkouts, newWorkout]);
							navigation.pop();
						})
						.catch((error) => {
							console.log(error);
							Alert.alert(
								"We're sorry, An error has occured in saving your workout. Please try again."
							);
						});
				}}
			>
				<Text style={styles.exerciseText}>Add New Workout</Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flex: 1,
		justifyContent: 'center',
		width: '100%'
	},
	workout: {
		height: 400
	},
	days: {
		margin: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 10,
		alignItems: 'center'
	},
	selectedDay: {
		backgroundColor: '#7CB9E8',
		paddingHorizontal: 10,
		paddingVertical: 4,
		borderRadius: 25,
		minHeight: 20,
		minWidth: 50
	},
	nonSelectedDay: {
		backgroundColor: '#F0F8FF',
		paddingHorizontal: 10,
		paddingVertical: 4,
		borderRadius: 25,
		minHeight: 20,
		minWidth: 50
	},
	dayText: {
		textAlign: 'center'
	},
	row: {
		flex: 1,
		height: 100,
		alignItems: 'center',
		flexDirection: 'row',
		borderRadius: 30,
		margin: 10,
		backgroundColor: '#D9D9D9'
	},
	name: {
		flex: 4,
		height: 100,
		paddingTop: 15,
		paddingLeft: 20
	},
	options: {
		flex: 1,
		height: 100,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 10
	},
	noExercises: {
		alignItems: 'center',
		padding: 10,
		marginTop: 10
	},
	addWorkoutButton: {
		borderRadius: 15,
		paddingHorizontal: 20,
		paddingVertical: 10,
		marginVertical: 15,
		alignSelf: 'center',
		maxWidth: '100%',
		marginBottom: 60
	},
	addExerciseButton: {
		marginLeft: 'auto',
		borderRadius: 15,
		paddingHorizontal: 10,
		paddingVertical: 5,
		marginRight: 20,
		justifyContent: 'center'
	},
	titleText: {
		paddingTop: 5,
		fontSize: 40,
		textAlign: 'center'
	},
	exerciseText: {
		fontSize: 20,
		textAlign: 'center',
		fontWeight: 'bold'
	},
	deleteIconContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 'auto',
		marginHorizontal: 5,
		width: '10%'
	},
	numericsContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 'auto',
		width: '30%'
	},
	repsOrSetsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		width: 100,
		marginBottom: 2
	},
	setsAndRepsText: {
		fontSize: 17,
		fontWeight: '500',
		width: '50%'
	},
	setsAndRepsTextbox: {
		backgroundColor: 'white',
		width: '50%',
		textAlign: 'center',
		paddingHorizontal: 5,
		height: 40,
		fontSize: 17
	}
});

export default AddWorkout;
