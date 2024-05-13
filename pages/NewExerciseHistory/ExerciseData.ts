import { TimeGraphData } from 'types/TimeGraphData'

const dummyData = [
	{ value: 50, date: new Date('2021-08-31') },
	{ value: 50, date: new Date('2021-09-01') },
	{ value: 10, date: new Date('2021-09-02') },
	{ value: 150, date: new Date('2021-09-03') },
	{ value: 10, date: new Date('2021-09-04') },
	{ value: 100, date: new Date('2021-09-05') },
	{ value: 10, date: new Date('2021-09-06') },
]

const getDataForUserForExercise = (
	exerciseId: number,
	metricId: number,
): TimeGraphData[] => {
	// TODO: DynamoDB query goes here. Note that it should also take the
	// user ID, which should be globally set in the app.
	console.log(`Getting data for exercise ${exerciseId} and metric ${metricId}`)
	return dummyData
}

export default getDataForUserForExercise
