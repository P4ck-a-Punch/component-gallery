import { TimeGraphData } from 'types/TimeGraphData'

const dummyData = [
	{ value: 50, date: new Date('2024-08-31') },
	{ value: 50, date: new Date('2024-09-01') },
	{ value: 10, date: new Date('2024-09-02') },
	{ value: 150, date: new Date('2024-09-03') },
	{ value: 10, date: new Date('2024-09-04') },
	{ value: 100, date: new Date('2024-09-05') },
	{ value: 10, date: new Date('2024-09-06') },
]

const parseDateRange = (date: string): Date => {
	const today = new Date()
	let startDate = new Date()
	switch (date) {
		case '7d':
			startDate.setDate(today.getDate() - 7)
			break
		case '30d':
			startDate.setDate(today.getDate() - 30)
			break
		case '90d':
			startDate.setDate(today.getDate() - 90)
			break
		case '1y':
			startDate.setFullYear(today.getFullYear() - 1)
			break
		default:
			startDate = new Date(0)
	}
	return startDate
}


const getDataForUserForExercise = (
	exerciseId: number,
	metricId: number,
	dateRange: string = '30d'
): TimeGraphData[] => {
	// TODO: DynamoDB query goes here. Note that it should also take the
	// user ID, which should be globally set in the app.
	console.log(`Getting data for exercise ${exerciseId} and metric ${metricId}`)
	console.log(`Date range: ${dateRange}`)
	return dummyData.filter((datum) => datum.date >= parseDateRange(dateRange))
}

export default getDataForUserForExercise
