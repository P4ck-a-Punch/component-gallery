import React from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import ExerciseCard from './Components/Exercises'
// import { useFonts } from 'expo-font'

export default function App() {
	return (
		<View style={styles.container}>
			<Text>{'Scheduled Workouts'}</Text>
			<ScrollView contentContainerStyle={styles.scroll}>
				<ExerciseCard
					name='Arms and Chest'
					tags={['Biceps', 'Triceps', 'Pecs']}
					exerciseNames={['Pulldowns', 'Pullups', 'Dips']}
				>
					<Text>TestChild</Text>
				</ExerciseCard>
				<ExerciseCard
					name='Legs'
					tags={['Quads', 'Hamstrings', 'Glutes']}
					exerciseNames={['Squats', 'Lunges', 'Deadlifts']}
				>
					<Text>TestChild</Text>
				</ExerciseCard>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		width: '100%',
	},
	scroll: {
		flex: 1,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
})
