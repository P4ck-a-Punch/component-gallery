import React from 'react'
import { StyleSheet } from 'react-native'
import {
	GestureHandlerRootView,
	ScrollView,
} from 'react-native-gesture-handler'
import { ExerciseCard, ExerciseList } from './Components/Exercises'
import Page from './Components/Page'
// import { useFonts } from 'expo-font'

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		width: '100%',
	},
	scroll: {
		flexDirection: 'column',
		width: '100%',
		rowGap: 20,
		columnGap: 20,
		paddingBottom: 36,
	},
})

const Page1: React.ReactNode = (
	<GestureHandlerRootView>
		<Page title='Schedule'>
			<ScrollView contentContainerStyle={styles.scroll}>
				<ExerciseCard
					name='Arms and Chest'
					tags={[
						'Biceps',
						'Triceps',
						'Pecs',
						'Deltoids',
						'Traps',
						'Forearms',
						'Abs',
						'Mind',
						'Toes',
						'Eyebrows',
					]}
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
				<ExerciseCard
					name='Eyebrow Strength Training'
					tags={[
						'Biceps',
						'Triceps',
						'Pecs',
						'Deltoids',
						'Traps',
						'Forearms',
						'Abs',
						'Mind',
						'Toes',
						'Eyebrows',
					]}
					exerciseNames={['Pulldowns', 'Pullups', 'Dips']}
				>
					<ExerciseList exerciseNames={['Pulldowns', 'Pullups', 'Dips']} />
				</ExerciseCard>

				<ExerciseCard
					name='Some Exercise'
					tags={[
						'Biceps',
						'Triceps',
						'Pecs',
						'Deltoids',
						'Traps',
						'Forearms',
						'Abs',
						'Mind',
						'Toes',
						'Eyebrows',
					]}
					exerciseNames={['Pulldowns', 'Pullups', 'Dips']}
				>
					<ExerciseList exerciseNames={['Pulldowns', 'Pullups', 'Dips']} />
				</ExerciseCard>
			</ScrollView>
		</Page>
	</GestureHandlerRootView>
)

export default function App() {
	return Page1
}
