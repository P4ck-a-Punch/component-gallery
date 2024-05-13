import { TimeGraphData } from 'types/TimeGraphData'

const dummyData = [
	{ value: 50, date: new Date('2024-05-01') },
	{ value: 54, date: new Date('2024-05-02') },
	{ value: 52, date: new Date('2024-05-03') },
	{ value: 34, date: new Date('2024-05-05') },
	{ value: 61, date: new Date('2024-05-12') },
	{ value: 62, date: new Date('2024-05-13') },
]

const findStartDate = (date: string): Date => {
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

// Gets the date that is both present in the data and is the first one chronologicaly 
// before the start date
const getPointJustBeforeStartDate = (data: TimeGraphData[], start: Date): Optional<TimeGraphData> => {
	const datesBeforeStart = data.filter((datum) => datum.date < start)
	const datesBeforeStartSorted = datesBeforeStart.sort((a, b) => b.date.getTime() - a.date.getTime())
	if (datesBeforeStartSorted.length === 0) {
		return { value: 0, date: start }
	}
	return datesBeforeStartSorted[0]
}

// Generates a fake data point for the start date, placing it so that it is 
// on the line between the last data point before the start date and the first 
// data point after the start date
const generateFakeStartPoint = (data: TimeGraphData[], start: Date): TimeGraphData => {
	const pointBeforeStart = getPointJustBeforeStartDate(data, start)
	const pointAfterStart = data.find((datum) => datum.date >= start)
	const valueBefore = pointBeforeStart.value
	if (!pointAfterStart) {
		return { value: 0, date: start }
	}
	const valueAfter = pointAfterStart.value
	const timeBefore = pointBeforeStart.date.getTime()
	const timeAfter = pointAfterStart.date.getTime()
	const timeStart = start.getTime()
	const valueStart = (valueBefore * (timeAfter - timeStart) + valueAfter * (timeStart - timeBefore)) / (timeAfter - timeBefore)
	return { value: valueStart, date: start }
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
	if (dateRange === 'all') {
		return dummyData
	}
	const startDate = findStartDate(dateRange)
	const datesAfterStart = dummyData.filter((datum) => datum.date >= startDate)
	const datesWithStart = [generateFakeStartPoint(dummyData, findStartDate(dateRange)), ...datesAfterStart]
	return datesWithStart
}

export default getDataForUserForExercise
