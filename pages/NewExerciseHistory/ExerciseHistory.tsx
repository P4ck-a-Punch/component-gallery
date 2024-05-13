import Page from 'Componants/Page'
import CardContainer from 'Componants/CardContainer'
import React from 'react'
import { View } from 'react-native'
import MetricReport from './MetricReport'

const ExerciseHistory = () => {
	return (
		<Page title='Bicep Curls'>
			<View style={{ paddingTop: 30 }}></View>
			<CardContainer>
				<MetricReport exerciseId={1} metricId={1} />
			</CardContainer>
		</Page>
	)
}

export default ExerciseHistory
