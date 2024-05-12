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

type EditWorkoutProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Edit Workout'>,
  	route: RouteProp<RootStackParamList, 'Edit Workout'>,
    exercises: Exercise[],
    scheduledWorkouts: UserWorkout[],
    setScheduledWorkouts: (scheduledWorkouts: UserWorkout[]) => void,
    workoutToEdit: number
};

const testUserId = '1';

const patchWorkout = async (body: Object) => {
	const response = await fetch(
		`https://yui8zhx0qj.execute-api.us-west-2.amazonaws.com/testStage/workouts`,
		{
			method: 'PATCH',
			body: JSON.stringify(body),
			headers: {
				'x-api-key': `${process.env.AWS_API_KEY}`
			}
		}
	);
	if (response.ok) return response.json();
	else throw new Error(`Editing workout failed`);
};

const EditWorkout:React.FC<EditWorkoutProps> = ({ navigation, route, exercises, scheduledWorkouts, setScheduledWorkouts, workoutToEdit }) => {
	const [workoutName, setWorkoutName] = useState<string>('');
	const [wid, setWid] = useState<string>('');
	const [scheduling, setScheduling] = useState<{ type: string; recur: string }>(
		{ type: 'weekly', recur: '' }
	);
	const [userExercises, setUserExercises] = useState<UserWorkoutDetails[]>([]);

    useEffect(() => {
        if(workoutToEdit != -1) {
            const workout = scheduledWorkouts[workoutToEdit];
            setUserExercises(workout.exercises);
            setWorkoutName(workout.name);
            setWid(workout.wid);
            setScheduling(workout.scheduling === undefined ? { type: 'weekly', recur: '' } : workout.scheduling);
        }
    }, [workoutToEdit]);

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
					{workoutToEdit == -1 ? (
						<></>
					) : (
						userExercises.map((userExercise: UserWorkoutDetails, i: number) => (
							<View style={styles.row} key={i}>
								{/* TODO: Add draggable element here */}
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
												if (
													userExercise.sets == 0 &&
													newTextVal.toString().length == 2 &&
													newTextVal.toString().charAt(0) != '0'
												)
													newTextVal = Math.floor(newTextVal / 10);
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
							</View>
						))
					)}
					<Pressable
						style={styles.row}
						onPress={() =>
							navigation.navigate('Search', {
								filter: '',
								sourceScreen: 'Edit Workout'
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
			<Pressable style={({pressed}) => [{ backgroundColor: pressed ? '#ccff8c': '#81de76'}, styles.addWorkoutButton]}
                    onPress={() => {
                        const body = {
                            "userId": testUserId,
                            "wid": wid,
                            "name": workoutName,
                            "exercises": userExercises,
                            "scheduling": scheduling
                        }
                        patchWorkout(body).then(() => {
                            const temp = [...scheduledWorkouts];
                            temp[workoutToEdit] = body;
                            setScheduledWorkouts(temp);
							navigation.navigate('View Workouts');
                        }).catch(() => {
                            Alert.alert("Editing workout failed, please try again");
                        });
                    }}>
                    <Text style={styles.exerciseText}>Done</Text>
                </Pressable>
        </View>
        )
    }    

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flex: 1,
		justifyContent: 'center',
		width: '100%'
	},
	workout: {
		height: 500
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

export default EditWorkout;
