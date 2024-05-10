import Card from 'Componants/Card'
import Page from 'Componants/Page'
import Tags from 'Componants/Tags'
import CardContainer from 'Componants/CardContainer'
import React from 'react'
import { Text } from 'react-native'

const App = () => {
	return (
		<Page title={'Beans'}>
			<CardContainer>
				<Card heading={'Beans'}>
					<Tags tags={['Beans', 'Legumes', 'Protein']} />
					<Text></Text>
				</Card>
			</CardContainer>
		</Page>
	)
}

export default App
