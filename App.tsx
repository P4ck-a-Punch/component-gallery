import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
// import WorkoutSchedule from 'pages/NewWorkoutSchedule/WorkoutSchedule'
import ExerciseHistory from 'pages/NewExerciseHistory/ExerciseHistory'

import {
	useFonts,
	IBMPlexSansCondensed_100Thin,
	IBMPlexSansCondensed_200ExtraLight,
	IBMPlexSansCondensed_300Light,
	IBMPlexSansCondensed_400Regular,
	IBMPlexSansCondensed_500Medium,
	IBMPlexSansCondensed_600SemiBold,
	IBMPlexSansCondensed_700Bold,
	IBMPlexSansCondensed_100Thin_Italic,
	IBMPlexSansCondensed_200ExtraLight_Italic,
	IBMPlexSansCondensed_300Light_Italic,
	IBMPlexSansCondensed_400Regular_Italic,
	IBMPlexSansCondensed_500Medium_Italic,
	IBMPlexSansCondensed_600SemiBold_Italic,
	IBMPlexSansCondensed_700Bold_Italic,
} from '@expo-google-fonts/ibm-plex-sans-condensed'
import AppLoading from 'expo-app-loading'

const App = () => {
	const [fontsLoaded] = useFonts({
		IBMPlexSansCondensed_100Thin,
		IBMPlexSansCondensed_200ExtraLight,
		IBMPlexSansCondensed_300Light,
		IBMPlexSansCondensed_400Regular,
		IBMPlexSansCondensed_500Medium,
		IBMPlexSansCondensed_600SemiBold,
		IBMPlexSansCondensed_700Bold,
		IBMPlexSansCondensed_100Thin_Italic,
		IBMPlexSansCondensed_200ExtraLight_Italic,
		IBMPlexSansCondensed_300Light_Italic,
		IBMPlexSansCondensed_400Regular_Italic,
		IBMPlexSansCondensed_500Medium_Italic,
		IBMPlexSansCondensed_600SemiBold_Italic,
		IBMPlexSansCondensed_700Bold_Italic,
	})

	if (!fontsLoaded) {
		return <AppLoading />
	}

	return (
		<GestureHandlerRootView>
			<ExerciseHistory />
		</GestureHandlerRootView>
	)
}

export default App
