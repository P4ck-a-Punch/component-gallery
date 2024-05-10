import { useState, useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Exercise } from '../types/Exercise';
import { UserWorkout } from '../types/UserWorkout';
import CalendarBar from './WorkoutComponents/Calendar';
import WorkoutList from './WorkoutComponents/WorkoutList';
import ViewWorkouts from './WorkoutComponents/ViewWorkouts';
import AddWorkout from './WorkoutComponents/AddWorkout';
import EditWorkout from './WorkoutComponents/EditWorkout';
import SearchPage from './WorkoutComponents/SearchPage';
import {
	createStackNavigator,
	StackNavigationProp
} from '@react-navigation/stack';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import RootStackParamList from '../types/RootStackParamList';

type WorkoutProps = {
	exercises: Exercise[];
	scheduledWorkouts: UserWorkout[];
	setScheduledWorkouts: (scheduledWorkouts: UserWorkout[]) => void;
	pastWorkouts: UserWorkout[];
	setPastWorkouts: (pastWorkouts: UserWorkout[]) => void;
};

type HomeScreenProps = {
	navigation: StackNavigationProp<RootStackParamList, 'Workouts'>;
	route: RouteProp<RootStackParamList, 'Workouts'>;
	exercises: Exercise[];
	pastWorkouts: UserWorkout[];
	scheduledWorkouts: UserWorkout[];
};

export default function Workout({
	exercises,
	scheduledWorkouts,
	setScheduledWorkouts,
	pastWorkouts,
	setPastWorkouts
}: WorkoutProps) {
	const Stack = createStackNavigator<RootStackParamList>();
	const testUserId = '1';

	const [ selectedExerciseId, setSelectedExerciseId ] = useState(-1);
	const [ workoutToEdit, setWorkoutToEdit ] = useState(-1);

	// TODO (in next sprint):
	// - Add more options for the current workout

	return (
		<Stack.Navigator screenOptions={{ headerShown: true }}>
			<Stack.Screen
				name="Workouts"
				children={({ navigation, route }) => (
					<HomeScreen
						navigation={navigation}
						route={route}
						exercises={exercises}
						pastWorkouts={pastWorkouts}
						scheduledWorkouts={scheduledWorkouts}
					/>
				)}
			/>
			<Stack.Screen
				name="View Workouts"
				children={({ navigation, route }) => (
					<ViewWorkouts
						navigation={navigation}
						route={route}
						scheduledWorkouts={scheduledWorkouts}
						setScheduledWorkouts={setScheduledWorkouts}
						setWorkoutToEdit={setWorkoutToEdit}
					/>
				)}
			/>
			<Stack.Screen
				name="Add Workout"
				children={({ navigation, route }) => (
					<AddWorkout
						navigation={navigation}
						route={route}
						exercises={exercises}
						scheduledWorkouts={scheduledWorkouts}
						setScheduledWorkouts={setScheduledWorkouts}
					/>
				)}
				initialParams={{ id: -1 }}
			/>
			<Stack.Screen
				name="Edit Workout"
				children={({ navigation, route }) => (
					<EditWorkout
						navigation={navigation}
						route={route}
						exercises={exercises}
						scheduledWorkouts={scheduledWorkouts}
						setScheduledWorkouts={setScheduledWorkouts}
						workoutToEdit={workoutToEdit}
					/>
				)}
				initialParams={{ id: -1 }}
			/>
			<Stack.Screen
				name="Search"
				children={({ navigation, route }) => (
					<SearchPage
						navigation={navigation}
						route={route}
						exercises={exercises}
						setId={setSelectedExerciseId}
					/>
				)}
				initialParams={{ filter: '' }}
			/>
		</Stack.Navigator>
	);
}

const HomeScreen: React.FC<HomeScreenProps> = ({
	navigation,
	route,
	exercises,
	pastWorkouts,
	scheduledWorkouts
}) => {
	const today = new Date();
	const [selectedDate, setSelectedDate] = useState<Date>(
		new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()))
	);

	return (
		<View style={styles.container}>
			<View style={styles.calendarBarStyle}>
				<CalendarBar
					selectedDate={selectedDate}
					setSelectedDate={setSelectedDate}
				></CalendarBar>
			</View>
			<WorkoutList
				selectedDate={selectedDate}
				exercises={exercises}
				pastWorkouts={pastWorkouts}
				scheduledWorkouts={scheduledWorkouts}
			></WorkoutList>
			<View style={styles.button}>
				<Button
					title="SEE ALL WORKOUTS"
					onPress={() => navigation.navigate('View Workouts')}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: '100%',
		width: '100%',
		backgroundColor: '#F8FDFF'
	},
	calendarBarStyle: {
		height: '12%',
		marginBottom: 10
	},
	workoutViewStyle: {
		height: '90%'
		// backgroundColor: 'red'
	},
	button: {
		height: '10%',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
