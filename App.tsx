import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { ExerciseCard, ExerciseList } from './Components/Exercises'
import Page from './Components/Page'
// import { useFonts } from 'expo-font'

export default function App() {
	return (
		<Page title='Schedule'>
			<ScrollView contentContainerStyle={styles.scroll}>
				<ExerciseCard
					name='Arms and Chest'
					tags={['Biceps', 'Triceps', 'Pecs']}
					exerciseNames={['Pulldowns', 'Pullups', 'Dips']}
				>
					<ExerciseList exerciseNames={['Pulldowns', 'Pullups', 'Dips']} />
				</ExerciseCard>
				<ExerciseCard
					name='Legs'
					tags={['Quads', 'Hamstrings', 'Glutes']}
					exerciseNames={['Squats', 'Lunges', 'Deadlifts']}
				>
					<ExerciseList exerciseNames={['Squats', 'Lunges', 'Deadlifts']} />
				</ExerciseCard>
			</ScrollView>
		</Page>
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
		flexDirection: 'column',
		width: '100%',
		justifyContent: 'flex-start',
		alignItems: 'center',
		rowGap: 20,
		columnGap: 20,
	},
})
