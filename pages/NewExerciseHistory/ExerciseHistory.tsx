import Page from 'Componants/Page'
import CardContainer from 'Componants/CardContainer'
import React from 'react'
import { View } from 'react-native'
import MetricReport from './MetricReport'

type ExerciseHistoryProps = {
	exerciseId: number
}

/*
 * A page displaying the history of a specific exercise, across all 
 * metrics. TODO: map over all metrics for the exercise to create 
 * multiple MetricReport components.
 *
 * @param {ExerciseHistoryProps} props the properties for the page
 * @param {number} props.exerciseId the ID of the exercise
 * @return {React.JSX.Element} the page component
 */
const ExerciseHistory = (props: ExerciseHistoryProps) => {
	return (
		<Page title='Bicep Curls'>
			<View style={{ paddingTop: 30 }}></View>
			<CardContainer>
				<MetricReport exerciseId={props.exerciseId} metricId={1} />
			</CardContainer>
		</Page>
	)
}

export default ExerciseHistory
